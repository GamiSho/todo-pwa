import { ToolBar, translator } from '../ToolBar'
import { render } from '@testing-library/react'

describe('ToolBar', () => {
  it('should render ToolBar component', () => {
    expect(translator('foo' as Filter)).toBe('TODO')
    expect(translator('unchecked' as Filter)).toBe('現在のタスク')
    expect(translator('checked' as Filter)).toBe('完了したタスク')
    expect(translator('removed' as Filter)).toBe('ごみ箱')
    render(<ToolBar filter="all" onToggleDrawer={() => vi.fn()} />)
  })
})
