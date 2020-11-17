import * as cdk from '@aws-cdk/core'
import { DiscoApiStackProps } from './disco-api-stack-props'
import { LambdaReturnString } from './api/lambda-return-string'
import { LambdaImportMessages } from './import_messages_s3/lambda-import-messages'
import { S3ImportMessages } from './import_messages_s3/s3-import-messages'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import { SqsQueueImportMessages } from './import_messages_s3/sqs-queue-import-messages'
import { SnsTopicImportMessages } from './import_messages_s3/sns-topic-import-messages'

export class DiscoApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: DiscoApiStackProps) {
        super(scope, id, props)

        returnString(this, props)
        importMessagesS3(this, props)
    }
}

const returnString = (stack: DiscoApiStack, props: DiscoApiStackProps) => {
    LambdaReturnString(stack, props)
}

const importMessagesS3 = (stack: DiscoApiStack, props: DiscoApiStackProps) => {
    const s3Bucket = S3ImportMessages(stack)
    const queue = SqsQueueImportMessages(stack, props)
    const topic = SnsTopicImportMessages(stack, props)

    topic.addSubscription(new subs.SqsSubscription(queue))

    LambdaImportMessages(stack, props, {
        queue: queue,
        bucketArn: s3Bucket.bucketArn,
    })
}
