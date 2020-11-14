import { Props } from '../lib/props'

export const Name = (props: Props, name: string): string => {
    return `${props.stackName}-${name}`
}
