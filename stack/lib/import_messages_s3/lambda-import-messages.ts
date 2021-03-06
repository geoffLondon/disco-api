import {Construct, Duration} from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as sqs from '@aws-cdk/aws-sqs'
import * as iam from '@aws-cdk/aws-iam'
import {DiscoApiStackProps} from "../disco-api-stack-props"
import {Name} from '../../utils/resource-name'
import {SqsEventSource} from '@aws-cdk/aws-lambda-event-sources'
import * as apiGateway from "@aws-cdk/aws-apigateway";

interface LambdaImportMessagesArgs {
    queue: sqs.IQueue
    bucketArn: string
}

export const LambdaImportMessages = (scope: Construct, props: DiscoApiStackProps, args: LambdaImportMessagesArgs): lambda.IFunction => {
    const lambdaId = Name(props, 'import-messages')

    const environment = {
        S3_MESSAGES_BUCKET_NAME: props.config.s3DiscoApiMessagesBucketName
    }

    const fn = new lambda.Function(scope, lambdaId, {
        functionName: lambdaId,
        description: 'Import messages to S3',
        runtime: lambda.Runtime.GO_1_X,
        timeout: Duration.seconds(30),
        memorySize: 1024,
        code: lambda.Code.fromAsset('../bin/lambda', {exclude: ['**', '!import_to_s3']}),
        handler: 'import_to_s3',
        environment: environment,
    })

    // new apiGateway.LambdaRestApi(scope, 'Endpoint', {
    //     handler: fn
    // })

    fn.addEventSource(new SqsEventSource(args.queue, {batchSize: 1}))

    fn.addToRolePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:*'],
        resources: [`${args.bucketArn}/*`]
    }))

    fn.addToRolePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['sns:Publish'],
        resources: ['arn:aws:sns:eu-west-2:087958517077:disco-api-sns-import-messages']
    }))

    return fn
}