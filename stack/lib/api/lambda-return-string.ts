import { Construct, Duration } from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import {DiscoApiStackProps} from "../disco-api-stack-props";
import {Name} from '../../utils/resource-name'

export const LambdaReturnString = (scope: Construct, props: DiscoApiStackProps): lambda.IFunction => {
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

    return fn
}