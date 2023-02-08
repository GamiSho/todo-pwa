import { ActionButton } from '../ActionButton'
import { render } from '@testing-library/react'

describe.concurrent('ActionButton', () => {
  it('should render ActionButton #1', () => {
    render(
      <ActionButton
        todos={[{ value: '#1', checked: false, id: 0, removed: true }]}
        filter="removed"
        alertOpen={true}
        dialogOpen={false}
        onToggleAlert={() => vi.fn()}
        onToggleDialog={() => vi.fn()}
      />
    )
  })
  it('should render ActionButton #2', () => {
    render(
      <ActionButton
        todos={[{ value: '#2', checked: false, id: 0, removed: true }]}
        filter="all"
        alertOpen={true}
        dialogOpen={false}
        onToggleAlert={() => vi.fn()}
        onToggleDialog={() => vi.fn()}
      />
    )
  })
})
