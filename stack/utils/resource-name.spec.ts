import { Name } from './resource-name'
import { Props } from '../lib/props'
import { DevelopmentStackConfig } from '../conf/development'
import { StackStaticConfig } from '../conf/static'

describe('Name', () => {
    it('returns a name base on the stack and stage', () => {
        const props: Props = {
            config: DevelopmentStackConfig,
            staticConfig: StackStaticConfig,
            stackName: 'hello',
        }

        const name = Name(props, 'Molly')

        expect(name).toEqual('hello-Molly')
    })
})
