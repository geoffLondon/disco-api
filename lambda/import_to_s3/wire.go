//+build wireinject

package main

import (
	aws_config "disco-api/aws"
	"disco-api/aws_client/s3"
	"disco-api/config"
	"disco-api/message/csv_importer"
	"github.com/google/wire"
)

var Set = wire.NewSet(
	NewImportMessagesHandlerLambda,

	aws_config.NewAwsConfig,

	config.NewConfig,

	newDiscoMessagesS3BucketService,
	wire.Bind(new(s3.S3BucketService), new(*s3.S3BucketServiceImpl)),

	csv_importer.NewCsvImporterImpl,
	wire.Bind(new(csv_importer.CsvImporter), new(*csv_importer.CsvImporterImpl)),
)

func InitializeImportMessagesLambda() (*ImportMessagesHandlerLambda, error) {
	wire.Build(Set)
	return &ImportMessagesHandlerLambda{}, nil
}

func newDiscoMessagesS3BucketService(configuration config.Configuration) *s3.S3BucketServiceImpl {
	return &s3.S3BucketServiceImpl{
		BucketRegion: configuration.AwsRegion,
		BucketName:   configuration.DiscoMessagesS3BucketName,
	}
}
