package message_model

import "time"

type State struct {
	Message StateMessage `json:"message"`
}

type StateMessage struct {
	MessageId       *string    `json:"callId"`
	MessageDateTime *time.Time `json:"date"`
	MessageBody     *string    `json:"ucid,omitempty"`
}

func (m StateMessage) MessageDateTimeString(format string) string {
	return m.MessageDateTime.Format(format)
}
