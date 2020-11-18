package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
	"os"
)

type ReturnAStringHandlerLambda struct{}

func NewReturnAStringHandlerLambda() *ReturnAStringHandlerLambda {
	return &ReturnAStringHandlerLambda{}
}

func main() {
	handlerLambda, err := InitializeReturnAStringLambda()
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

func (handler *ReturnAStringHandlerLambda) Handle(ctx context.Context) (int, error) {
	message, _ := fmt.Println("I can't wait for the Christmas break and a Happy 2021!")
	return message, nil
}
