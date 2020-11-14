import * as cdk from '@aws-cdk/core'
import { Props } from './props'
import { LambdaReturnString } from './api/lambda-return-string'

export class DiscoApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: Props) {
        super(scope, id, props)

        const lambdaReturnString = LambdaReturnString(this, props)
    }
}
