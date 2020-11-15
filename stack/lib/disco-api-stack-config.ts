import { DevelopmentStackConfig } from '../conf/development'

export interface DiscoApiStackStaticConfig {
    sqsImportMessagesQueueName: string
    receivedMessageSnsTopicArnCFOutput: string
}

export interface DiscoApiStackConfig {
    stage: string
    environment: string
    s3DiscoApiMessagesBucketName: string
}

export const NewConfig = (stage: string): DiscoApiStackConfig => {
    switch (stage) {
        case 'development':
            return DevelopmentStackConfig
        default:
            return DevelopmentStackConfig
    }
}
