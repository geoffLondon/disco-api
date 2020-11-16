import { DevelopmentConfig } from '../conf/development'

export interface DiscoApiStackStaticConfig {
    sqsImportMessagesQueueName: string
    snsImportMessages: string
}

export interface DiscoApiStackConfig {
    stage: string
    environment: string
    s3DiscoApiMessagesBucketName: string
}

export const NewConfig = (stage: string): DiscoApiStackConfig => {
    switch (stage) {
        case 'development':
            return DevelopmentConfig
        default:
            return DevelopmentConfig
    }
}
