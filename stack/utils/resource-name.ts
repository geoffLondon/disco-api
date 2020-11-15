import { DiscoApiStackProps } from '../lib/disco-api-stack-props'

export const Name = (props: DiscoApiStackProps, name: string): string => {
    return `${props.stackName}-${name}`
}
