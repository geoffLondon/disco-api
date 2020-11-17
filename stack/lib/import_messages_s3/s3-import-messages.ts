import {Construct, RemovalPolicy} from '@aws-cdk/core'
import {Bucket, IBucket} from "@aws-cdk/aws-s3";

export const S3ImportMessages = (stack: Construct): IBucket => {
    return new Bucket(stack, 'import-messages', {
        versioned: false,
        bucketName: 'disco-api-import-messages-bucket',
        publicReadAccess: false,
        removalPolicy: RemovalPolicy.DESTROY
    })
}
