import { ToolBar, translator } from '../ToolBar'
import { render } from '@testing-library/react'

describe('ToolBar', () => {
  it('should render ToolBar component', () => {
    expect(translator('foo' as Filter)).toBe('TODO')
    render(<ToolBar filter="all" onToggleDrawer={() => vi.fn()} />)
  })
})
