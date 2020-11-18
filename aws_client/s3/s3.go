package s3

import (
	"bytes"
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	awsS3 "github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	log "github.com/sirupsen/logrus"
)

type S3BucketService interface {
	UploadFile(ctx context.Context, fileKey string, file []byte, fileContentType string) error
}

type S3BucketServiceImpl struct {
	BucketRegion string
	BucketName   string
}

func (bucket S3BucketServiceImpl) UploadFile(ctx context.Context, fileKey string, file []byte, fileContentType string) error {
	log.WithFields(log.Fields{"fileKey": fileKey, "fileContentType": fileContentType}).Info("Uploading file")
	s3Svc := bucket.s3Service()

	uploader := s3manager.NewUploaderWithClient(s3Svc)

	fileReader := bytes.NewReader(file)
	upParams := &s3manager.UploadInput{
		Bucket:      aws.String(bucket.BucketName),
		Key:         aws.String(fileKey),
		Body:        fileReader,
		ContentType: &fileContentType,
	}
	uploadResult, uploadErr := uploader.UploadWithContext(ctx, upParams)
	if uploadErr != nil {
		return uploadErr
	}
	log.WithFields(log.Fields{"uploadResult": uploadResult}).Info("File uploaded")
	return nil
}

func (bucket S3BucketServiceImpl) s3Service() *awsS3.S3 {
	awsConf := &aws.Config{Region: aws.String(bucket.BucketRegion)}
	sess, createSessErr := session.NewSession(awsConf)
	if createSessErr != nil {
		log.Fatal(createSessErr)
	}

	return awsS3.New(sess)
}
