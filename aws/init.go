package aws_config

import "github.com/aws/aws-sdk-go/aws"

func NewAwsConfig() *aws.Config {
	return aws.NewConfig().WithMaxRetries(2).WithRegion("eu-west-2")
}
