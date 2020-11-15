import { Construct } from '@aws-cdk/core'
import { DiscoApiStackProps } from '../disco-api-stack-props'
import * as s3 from '@aws-cdk/aws-s3'

export const S3ImportMessages = (scope: Construct, props: DiscoApiStackProps): s3.IBucket => {
    return s3.Bucket.fromBucketName(scope, 'import-messages-bucket', props.config.s3DiscoApiMessagesBucketName)
}
