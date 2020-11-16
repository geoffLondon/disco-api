import { DiscoApiStackStaticConfig } from '../lib/disco-api-stack-config'

export const StaticConfig: DiscoApiStackStaticConfig = {
    sqsImportMessagesQueueName: 'sqs-import-messages',
    snsImportMessages: 'sns-import-messages',
}
