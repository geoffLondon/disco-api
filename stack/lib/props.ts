import * as cdk from '@aws-cdk/core'
import { Config, StaticConfig } from './config'

export interface Props extends cdk.StackProps {
    config: Config
    staticConfig: StaticConfig
}
