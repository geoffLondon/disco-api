package message_model

const DbDateTimeFormat = "2006-01-02 15:04:05"

type Message struct {
	MessageId       string `gorm:"primary_key;column:call_id;type:VARCHAR(36);not null" json:"messageId" csv:"callId"`
	MessageBody     string `gorm:"column:message_body;type:VARCHAR(36);not null" json:"messageBody" csv:"messageBody"`
	MessageDateTime string `gorm:"column:message_date_time;type:DATETIME;not null" json:"MessageDateTime" csv:"MessageDateTime"`
}
