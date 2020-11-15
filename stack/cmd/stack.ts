#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { DiscoApiStack } from '../lib/disco-api-stack'
import { DiscoApiStackProps } from '../lib/disco-api-stack-props'
import { NewConfig } from '../lib/disco-api-stack-config'
import { StaticConfig } from '../conf/static'

const app = new cdk.App()

const stage = process.env.STAGE || 'development'
const team = 'archimedes'
const stackName = 'disco-api'
const description = 'A backend application using AWS-CDK'

const config = NewConfig(stage)
const staticConfig = StaticConfig

const props: DiscoApiStackProps = {
    tags: {
        environment: config.environment,
        stage: config.stage,
        stack: stackName,
        team,
    },
    description,
    stackName,
    config,
    staticConfig,
}

new DiscoApiStack(app, stackName, props)
