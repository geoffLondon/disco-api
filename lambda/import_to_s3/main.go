package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
	"os"
)

type ImportMessagesHandlerLambda struct{}

func NewImportMessagesHandlerLambda() *ImportMessagesHandlerLambda {
	return &ImportMessagesHandlerLambda{}
}

func main() {
	handlerLambda, err := InitializeImportMessagesLambda()
	if err != nil {
		panic(fmt.Errorf("failed to create lambda: %v", err))
	}
	lambda.Start(handlerLambda.Handle)
}

func init() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetReportCaller(true)
}

func (handler *ImportMessagesHandlerLambda) Handle(ctx context.Context) (int, error) {
	message, err := fmt.Println("This is a message!")
	if err != nil {
		log.WithField("err", err).Fatal("error importing message to S3")
	}
	return message, nil
}
