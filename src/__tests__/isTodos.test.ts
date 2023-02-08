import { isTodo, isTodos } from '../lib/isTodos'

const mockTodos = [
  { id: 0, value: 'hello', checked: false, removed: false },
  { id: 1, value: 'bye', checked: true, removed: true },
]

describe.concurrent('isTodos', () => {
  it('should return true when received object of type Todo', async () => {
    expect(isTodo(mockTodos[0])).toBeTruthy()
  })
  it('should return true when received array of type Todo[]', async () => {
    expect(isTodos(mockTodos)).toBeTruthy()
  })
})
