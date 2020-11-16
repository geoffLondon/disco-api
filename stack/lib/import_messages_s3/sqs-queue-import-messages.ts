import * as sqs from '@aws-cdk/aws-sqs'
import {IQueue} from '@aws-cdk/aws-sqs'
import * as sns from '@aws-cdk/aws-sns'
import {ITopic} from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import {DiscoApiStackProps} from "../disco-api-stack-props"
import {Construct, Duration} from "@aws-cdk/core"
import {Name} from "../../utils/resource-name"

export const SqsQueueImportMessages = (stack: Construct, props: DiscoApiStackProps, p: { snsTopicImportMessages: ITopic }): IQueue => {
    const queueName = Name(props, `${props.staticConfig.sqsImportMessagesQueueName}-queue`)
    const queue = new sqs.Queue(stack, queueName, {
        queueName: queueName,
        retentionPeriod: Duration.seconds(1209600),
        receiveMessageWaitTime: Duration.seconds(0),
        visibilityTimeout: Duration.seconds(35),
    })

    const topic = new sns.Topic(stack, props.staticConfig.snsTopicImportMessages)

    const subscription = new subs.SqsSubscription(queue)
    topic.addSubscription(subscription)

    return queue

}