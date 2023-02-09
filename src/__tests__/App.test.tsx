import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import 'vitest-canvas-mock'
import App from '../App'

describe('App', () => {
  it('should render App', async () => {
    render(<App />)

    const menuButton = screen.getByLabelText('menu-button')
    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-checked'))
    expect(screen.getByLabelText('fab-add-button')).toHaveStyle(
      'color: rgba(0, 0, 0, 0.26);'
    )

    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-removed'))
    expect(screen.getByLabelText('fab-delete-button')).toBeDisabled()

    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-all'))

    await userEvent.click(screen.getByLabelText('fab-add-button'))
    await userEvent.type(screen.getByTestId('form-todo'), 'TEST#0')
    await userEvent.click(screen.getByLabelText('form-add'))

    await userEvent.click(screen.getByLabelText('fab-add-button'))
    await userEvent.type(screen.getByTestId('form-todo'), 'TEST#1')
    await userEvent.click(screen.getByLabelText('form-add'))

    await userEvent.click(screen.getByLabelText('fab-add-button'))
    await userEvent.type(screen.getByTestId('form-todo'), 'TEST#2')
    fireEvent.submit(screen.getByLabelText('form-add'))

    await userEvent.click(screen.getByLabelText('todo-check-TEST#0'))
    await userEvent.click(screen.getByLabelText('todo-trash-TEST#1'))

    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-unchecked'))

    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-checked'))

    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-removed'))
    await userEvent.click(screen.getByLabelText('fab-delete-button'))
    await userEvent.click(screen.getByLabelText('alert-ok'))

    await userEvent.click(menuButton)
    await userEvent.click(screen.getByLabelText('list-all'))
    await userEvent.click(screen.getByLabelText('fab-add-button'))
    fireEvent.submit(screen.getByLabelText('form-add'))

    await userEvent.type(screen.getByTestId('todo-textarea-TEST#2'), 'EDIT')
  })
})
