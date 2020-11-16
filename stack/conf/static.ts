import { DiscoApiStackStaticConfig } from '../lib/disco-api-stack-config'

export const StaticConfig: DiscoApiStackStaticConfig = {
    sqsImportMessagesQueueName: 'import-messages',
    receivedMessageSnsTopic: 'received-messages',
}
