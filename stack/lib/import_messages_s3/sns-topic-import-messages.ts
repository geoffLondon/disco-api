import * as sns from '@aws-cdk/aws-sns'
import {DiscoApiStackProps} from "../disco-api-stack-props"
import {Construct} from "@aws-cdk/core"
import {Name} from "../../utils/resource-name"

export const SnsTopicImportMessages = (stack: Construct, props: DiscoApiStackProps): sns.ITopic => {
    const topicName = Name(props, `${props.staticConfig.snsImportMessages}`)

    return new sns.Topic(stack, topicName, {
        topicName: topicName,
    })

}