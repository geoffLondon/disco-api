package main

import (
	"context"
	"disco-api/aws_client/sqs"
	message_converter "disco-api/message/converter"
	"disco-api/message/csv_importer"
	message_model "disco-api/message/model"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
	"os"
)

type ImportMessagesHandlerLambda struct {
	csvImporter csv_importer.CsvImporter
}

func NewImportMessagesHandlerLambda(csvImporter csv_importer.CsvImporter) *ImportMessagesHandlerLambda {
	return &ImportMessagesHandlerLambda{
		csvImporter: csvImporter,
	}
}

func init() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetReportCaller(true)
}

func main() {
	handlerLambda, err := InitializeImportMessagesLambda()
	if err != nil {
		panic(fmt.Errorf("failed to create lambda: %v", err))
	}
	lambda.Start(handlerLambda.Handle)
}

func (handler *ImportMessagesHandlerLambda) Handle(ctx context.Context, sqsEvent events.SQSEvent) error {
	if len(sqsEvent.Records) == 0 {
		log.Info("no SQS message passed to function")
		return nil
	}

	for _, event := range sqsEvent.Records {
		log.WithFields(log.Fields{"event.MessageId": event.MessageId, "event.Body": event.Body}).Info("SQS message")

		sqsMessage := sqs.SqsMessage{}
		if unmarshalSqsErr := json.Unmarshal([]byte(event.Body), &sqsMessage); unmarshalSqsErr != nil {
			return fmt.Errorf("error Parsing SQS Record Body (%s) due to: %s", event.Body, unmarshalSqsErr)
		}
		log.WithFields(log.Fields{"sqsMessage": sqsMessage}).Info("unmarshalled SQS message")

		state := message_model.State{}
		if unmarshalStateErr := json.Unmarshal([]byte(sqsMessage.Message), &state); unmarshalStateErr != nil {
			return fmt.Errorf("error Parsing SQS Message Content (%s) due to: %s", event.Body, unmarshalStateErr)
		}
		log.WithFields(log.Fields{"state": state}).Info("unmarshalled state")

		message, err := message_converter.ConvertStateToMessage(state)
		if err != nil {
			return err
		}
		log.WithFields(log.Fields{"receivedMessage": message}).Info("converted State to Received Message")

		if err := handler.csvImporter.Import(ctx, message); err != nil {
			return err
		}
	}

	log.WithFields(log.Fields{"records.count": len(sqsEvent.Records)}).Info("finished handled SQS event records")

	return nil
}
