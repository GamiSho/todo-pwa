import { useState } from 'react'

import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, pink } from '@mui/material/colors'

import { ToolBar } from './ToolBar'
import { SideBar } from './SideBar'
import { TodoItem } from './TodoItem'
import { FormDialog } from './FormDialog'
import { ActionButton } from './ActionButton'

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003d',
    },
  },
})

const App = () => {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleTodo = <
    T extends Todo,
    U extends keyof Todo,
    V extends T[U]
  >(
    obj: T,
    key: U,
    value: V
  ) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))
    const newTodos = deepCopy.map((todo) => {
      if (todo.id == obj.id) {
        todo[key] = value
      }
      return todo
    })
    
    setTodos(newTodos)
  }

  const handleSubmit = () => {
    if (!text) return

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    setTodos([newTodo, ...todos])
    setText('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed)
    setTodos(newTodos)
  }

  const handleSort = (filter: Filter) => {
    setFilter(filter)
  }

  const handleToggleDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: {margin: 0, padding: 0}}} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleToggleDrawer}
        onSort={handleSort}
      />
      <FormDialog
        text={text}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </ThemeProvider>
  )
}

export default App
