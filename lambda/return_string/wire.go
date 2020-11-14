//+build wireinject

package main

import (
	"github.com/google/wire"
)

var Set = wire.NewSet(
	NewReturnStringHandlerLambda,
)

func InitializeReturnStringLambda() (*ReturnStringHandlerLambda, error) {
	wire.Build(Set)
	return &ReturnStringHandlerLambda{}, nil
}
