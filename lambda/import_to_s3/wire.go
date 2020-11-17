//+build wireinject

package main

import (
	aws_config "disco-api/aws"
	"github.com/google/wire"
)

var Set = wire.NewSet(
	aws_config.NewAwsConfig,
	NewImportMessagesHandlerLambda,
)

func InitializeImportMessagesLambda() (*ImportMessagesHandlerLambda, error) {
	wire.Build(Set)
	return &ImportMessagesHandlerLambda{}, nil
}
