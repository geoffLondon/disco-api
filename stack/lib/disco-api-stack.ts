import * as cdk from '@aws-cdk/core'
import * as sns from '@aws-cdk/aws-sns'
import { DiscoApiStackProps } from './disco-api-stack-props'
import { LambdaReturnString } from './api/lambda-return-string'
import { LambdaImportMessages } from './import_messages_s3/lambda-import-messages'
import { SqsQueueImportMessages } from './import_messages_s3/sqs-queue-import-messages'
import { S3ImportMessages } from './import_messages_s3/s3-import-messages'

export class DiscoApiStack extends cdk.Stack {
    receivedMessagesTopic: sns.ITopic

    constructor(scope: cdk.Construct, id: string, props: DiscoApiStackProps) {
        super(scope, id, props)
        const receivedMessageTopicName = cdk.Fn.importValue(props.staticConfig.receivedMessageSnsTopic)
        this.receivedMessagesTopic = sns.Topic.fromTopicArn(
            this,
            'disco-api-received-messages',
            receivedMessageTopicName
        )

        returnString(this, props)
        importMessagesS3(this, props)
    }
}

const returnString = (stack: DiscoApiStack, props: DiscoApiStackProps) => {
    LambdaReturnString(stack, props)
}

const importMessagesS3 = (stack: DiscoApiStack, props: DiscoApiStackProps) => {
    const queue = SqsQueueImportMessages(stack, props, {
        receivedMessagesTopic: stack.receivedMessagesTopic,
    })

    const s3Bucket = S3ImportMessages(stack, props)

    LambdaImportMessages(stack, props, {
        queue: queue,
        bucketArn: s3Bucket.bucketArn,
    })
}
