package message_converter

import (
	message_model "disco-api/message/model"
	"errors"
	"github.com/aws/aws-sdk-go/aws"
)

func ConvertStateToMessage(state message_model.State) (message_model.Message, error) {
	if state.Message.MessageId == nil {
		return message_model.Message{}, errors.New("missing message id")
	}
	if state.Message.MessageBody == nil {
		return message_model.Message{}, errors.New("missing message body")
	}
	if state.Message.MessageDateTime == nil {
		return message_model.Message{}, errors.New("missing message date time")
	}

	return message_model.Message{
		MessageId:       aws.StringValue(state.Message.MessageId),
		MessageBody:     aws.StringValue(state.Message.MessageBody),
		MessageDateTime: state.Message.MessageDateTimeString(message_model.DbDateTimeFormat),
	}, nil
}
