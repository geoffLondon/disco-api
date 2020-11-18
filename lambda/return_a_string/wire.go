//+build wireinject

package main

import (
	"github.com/google/wire"
)

var Set = wire.NewSet(
	NewReturnAStringHandlerLambda,
)

func InitializeReturnAStringLambda() (*ReturnAStringHandlerLambda, error) {
	wire.Build(Set)
	return &ReturnAStringHandlerLambda{}, nil
}
