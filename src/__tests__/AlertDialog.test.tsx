import { AlertDialog } from '../AlertDialog'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe('AlertDialog', () => {
  it('should render AlertDialog', async () => {
    const mockFn = vi.fn()
    render(
      <AlertDialog alertOpen={true} onEmpty={mockFn} onToggleAlert={mockFn} />
    )

    await userEvent.click(screen.getByLabelText('alert-ok'))
  })
})
