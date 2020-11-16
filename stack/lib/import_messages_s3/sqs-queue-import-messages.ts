import * as sqs from '@aws-cdk/aws-sqs'
import {IQueue} from '@aws-cdk/aws-sqs'
import {DiscoApiStackProps} from "../disco-api-stack-props"
import {Construct, Duration} from "@aws-cdk/core"
import {Name} from "../../utils/resource-name"

export const SqsQueueImportMessages = (stack: Construct, props: DiscoApiStackProps): IQueue => {
    const queueName = Name(props, `${props.staticConfig.sqsImportMessagesQueueName}-queue`)

    return new sqs.Queue(stack, queueName, {
        queueName: queueName,
        retentionPeriod: Duration.seconds(1209600),
        receiveMessageWaitTime: Duration.seconds(0),
        visibilityTimeout: Duration.seconds(35),
    })

}