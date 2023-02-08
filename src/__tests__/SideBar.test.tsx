import { SideBar } from '../SideBar'

import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe('SideBar', () => {
  it('should render SideBar component', async () => {
    const mockFn = vi.fn()

    render(
      <SideBar
        drawerOpen={true}
        onSort={mockFn}
        onToggleDrawer={mockFn}
        onToggleQR={mockFn}
      />
    )

    await userEvent.click(screen.getByLabelText('list-all'))
    await userEvent.click(screen.getByLabelText('list-unchecked'))
    await userEvent.click(screen.getByLabelText('list-checked'))
    await userEvent.click(screen.getByLabelText('list-removed'))
    await userEvent.click(screen.getByLabelText('list-share'))
  })
})
