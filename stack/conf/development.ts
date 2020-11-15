import { DiscoApiStackConfig } from '../lib/disco-api-stack-config'

export const DevelopmentStackConfig: DiscoApiStackConfig = {
    stage: 'development',
    environment: 'dev',
    s3DiscoApiMessagesBucketName: 'disco-api-messages-development',
}
