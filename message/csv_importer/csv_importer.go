package csv_importer

import (
	"context"
	"disco-api/aws_client/s3"
	message_model "disco-api/message/model"
	"fmt"
	"github.com/gocarina/gocsv"
	log "github.com/sirupsen/logrus"
	"strings"
	"time"
)

type CsvImporter interface {
	Import(context context.Context, message message_model.Message) error
}

type CsvImporterImpl struct {
	s3BucketService s3.S3BucketService
}

func NewCsvImporterImpl(s3BucketService s3.S3BucketService) *CsvImporterImpl {
	return &CsvImporterImpl{
		s3BucketService: s3BucketService,
	}
}

func (csvImporter *CsvImporterImpl) Import(context context.Context, message message_model.Message) error {
	messageAsSlice := []message_model.Message{message}
	messageCsvBytes, err := gocsv.MarshalBytes(&messageAsSlice)
	if err != nil {
		return err
	}

	csvKey := csvKey(message)
	log.WithField("csvKey", csvKey).Info("csv key for S3")

	return csvImporter.s3BucketService.UploadFile(context, csvKey, messageCsvBytes, "text/csv")
}

func csvKey(message message_model.Message) string {
	messageDateTime, parseTimeErr := time.Parse("2006-01-02 15:04:05", message.MessageDateTime)
	if parseTimeErr != nil {
		log.WithField("messageId", message.MessageId).Warn("issue parsing messageDateTime")
	}
	date := messageDateTime.Format("2006-01-02")

	dateFragment := fmt.Sprintf("date=%s", date)
	messageIdFragment := fmt.Sprintf("%s.csv", message.MessageId)

	keyFragments := []string{dateFragment, messageIdFragment}
	return strings.Join(keyFragments, "/")
}
