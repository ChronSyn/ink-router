import { h, renderToString } from 'ink'
import CommandLineRouter from './cliRouter'
import Switch from './switch'
import Route from './route'

describe('<CommandLineRouter />', () => {
  describe('given an empty args array', () => {
    it('should render the component', () => {
      expect(
        renderToString(
          <CommandLineRouter args={[]}>
            <Route component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
          </CommandLineRouter>
        )
      ).toBe('A')
    })
  })

  describe('given a shallow path array', () => {
    it('should render the component', () => {
      expect(
        renderToString(
          <CommandLineRouter args={['B']}>
            <Route exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
          </CommandLineRouter>
        )
      ).toBe('B')
    })
  })

  describe('given an deeper path array', () => {
    it('should render the component', () => {
      expect(
        renderToString(
          <CommandLineRouter args={['B', 'C', 'D']}>
            <Route path="/B/C" exact component={() => 'A'} />
            <Route path="/B/C/D" component={() => 'B'} />
          </CommandLineRouter>
        )
      ).toBe('B')
    })
  })

  describe('given parameters', () => {
    it('should parse the parameters', () => {
      expect(
        renderToString(
          <CommandLineRouter args={['--foo=bar']}>
            <Route
              path="/"
              exact
              component={({ match }) => match.params.foo}
            />
          </CommandLineRouter>
        )
      ).toBe('bar')
    })
  })
})
