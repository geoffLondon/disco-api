import * as cdk from '@aws-cdk/core'
import { DiscoApiStackConfig, DiscoApiStackStaticConfig } from './disco-api-stack-config'

export interface DiscoApiStackProps extends cdk.StackProps {
    config: DiscoApiStackConfig
    staticConfig: DiscoApiStackStaticConfig
}
