import { TodoItem } from '../TodoItem'
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen } from '@testing-library/react'

const mockFn = vi.fn()

describe('TodoItem', () => {
  it('should render TodoItem with filter all', async () => {
    render(
      <TodoItem
        todos={[{ value: 'TEST', id: 100, removed: false, checked: false }]}
        filter="all"
        onTodo={mockFn}
      />
    )

    await userEvent.click(screen.getByLabelText('todo-delete-TEST'))
    await userEvent.click(screen.getByLabelText('todo-uncheck-TEST'))

    const textbox = screen.getByTestId('todo-textarea-TEST')
    fireEvent.input(textbox, { target: { value: 'test' } })
  })

  it('should render TodoItem with filter unchecked', () => {
    render(
      <TodoItem
        todos={[{ value: '', id: 200, removed: false, checked: false }]}
        filter="unchecked"
        onTodo={mockFn}
      />
    )
  })

  it('should render TodoItem with filter checked', () => {
    render(
      <TodoItem
        todos={[{ value: '', id: 200, removed: false, checked: true }]}
        filter="checked"
        onTodo={mockFn}
      />
    )
  })

  it('should render TodoItem with filter removed #1', () => {
    render(
      <TodoItem
        todos={[{ value: '', id: 200, removed: true, checked: true }]}
        filter="removed"
        onTodo={mockFn}
      />
    )
  })

  it('should render TodoItem with filter removed #2', () => {
    render(
      <TodoItem
        todos={[{ value: '', id: 200, removed: true, checked: false }]}
        filter="removed"
        onTodo={mockFn}
      />
    )
  })

  it('should render TodoItem with invalid props', () => {
    render(
      <TodoItem
        todos={[{ value: '', id: 200, removed: true, checked: true }]}
        filter={'' as Filter}
        onTodo={mockFn}
      />
    )
  })
})
