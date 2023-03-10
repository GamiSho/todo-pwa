import { useState, useEffect } from 'react'
import localforage from 'localforage'
import { isTodos } from './lib/isTodos'

import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, pink } from '@mui/material/colors'

import { ToolBar } from './ToolBar'
import { SideBar } from './SideBar'
import { TodoItem } from './TodoItem'
import { FormDialog } from './FormDialog'
import { ActionButton } from './ActionButton'
import { QR } from './QR'
import { AlertDialog } from './AlertDialog'


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
  const [qrOpen, setQrOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    localforage
      .getItem('todo-20200101')
      .then((values) => isTodos(values) && setTodos(values))
  }, [])

  useEffect(() => {
    localforage.setItem('todo-20200101', todos)
  }, [todos])

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
    if (!text) {
      setDialogOpen(false)
      return
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    setTodos([newTodo, ...todos])
    setText('')
    setDialogOpen(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleToggleQR = () => setQrOpen(!qrOpen)

  const handleToggleDialog = () => {
    setDialogOpen(!dialogOpen)
    setText('')
  }

  const handleToggleAlert = () => setAlertOpen(!alertOpen)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: {margin: 0, padding: 0}}} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleQR={handleToggleQR}
        onToggleDrawer={handleToggleDrawer}
        onSort={handleSort}
      />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onToggleAlert={handleToggleAlert}
        onEmpty={handleEmpty}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  )
}

export default App
