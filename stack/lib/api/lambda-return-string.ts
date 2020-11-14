/*import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import * as sqs from '@aws-cdk/aws-sqs'*/
import { Construct, Duration } from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import {Props} from "../props";
import {Name} from '../../utils/resource-name'

export const LambdaReturnString = (scope: Construct, props: Props): lambda.IFunction => {
    const lambdaId = Name(props, 'return-string')

    const environment = {}

    const fn = new lambda.Function(scope, lambdaId, {
        functionName: lambdaId,
        description: 'Simple function that returns a string',
        runtime: lambda.Runtime.GO_1_X,
        timeout: Duration.seconds(60),
        memorySize: 512,
        code: lambda.Code.fromAsset('../bin/lambda', { exclude: ['**', '!return_string'] }),
        handler: 'return_string',
        environment: environment,
    })

    /*    const queue = new sqs.Queue(this, 'CdkTestAppQueue', {
            visibilityTimeout: cdk.Duration.seconds(300)
        });

        const topic = new sns.Topic(this, 'CdkTestAppTopic');

        topic.addSubscription(new subs.SqsSubscription(queue));*/

    return fn
}