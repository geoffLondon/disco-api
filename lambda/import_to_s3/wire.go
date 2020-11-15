//+build wireinject

package main

import (
	"github.com/google/wire"
)

var Set = wire.NewSet(
	NewImportMessagesHandlerLambda,
)

func InitializeImportMessagesLambda() (*ImportMessagesHandlerLambda, error) {
	wire.Build(Set)
	return &ImportMessagesHandlerLambda{}, nil
}
