import { FormDialog } from '../FormDialog'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'

describe('FormDialog', () => {
  it('should render FormDialog component', async () => {
    const mockFn = vi.fn()

    render(
      <FormDialog
        dialogOpen={true}
        onChange={mockFn}
        onSubmit={mockFn}
        onToggleDialog={mockFn}
        text=""
      />
    )

    await userEvent.type(screen.getByLabelText('todo-input'), 'TEST#0')
    fireEvent.submit(screen.getByLabelText('form-add'))
  })
})
