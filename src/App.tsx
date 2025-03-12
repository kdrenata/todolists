import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './todolistItem/TodolistItem.tsx'
import {CreateItemForm} from "./todolistItem/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, CssBaseline, Grid2, Paper, Switch} from "@mui/material";
import {containerSx} from "./todolistItem/TodolistItem.styles.ts";
import {NavButton} from "./todolistItem/NavButton.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = { // тип описания структуры данных для хранения тасок
    [todolistId: string]: TaskType[]
}


export const App = () => {

// BBL
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<Todolist>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({ //новый State с тасками
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Cola', isDone: true},
            {id: v1(), title: 'Ice-cream', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ],

    })
    // tasks
    //C
    const createTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false} // типизируем новую таску

        setTasks({
            ...tasks, // делаем копию, потому что призошли изменения
            [todolistId]: [newTask, ...tasks[todolistId]]  // в массиве, который лежит по ключу [todolistId] появилась новая таска. Сначала кладем новую таску, потом все таски, которые были в массиве раньше
        })
    }
    //U1
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)
        })
    }
    //U2
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task)
        })
    }

    //D
    const deleteTask = (taskId: string, todolistId: string) => {
        // const filteredTasks = tasks.filter(task => {
        //   return task.id !== taskId
        // })
        setTasks({
            ...tasks, // объект с копией всех тасок
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        })  //по ключу todolistId(в каком-то конкретном массиве), мы взяли все старые таски tasks[todolistId] и отфильтровали в соответствии с условием(берем каждую таску и возвращаем условие(true или false для каждой таски) и конкретный todolist перезапишется
    }


    // todolists
    //C
    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {id: todolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }
    //U1
    const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    //U2
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    //D
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId)) // возьмем исходный массив тудулистов и отфильтруем // для каждого тудулиста мы будем оставлять только те элементы (tl), у которых id не совпадает с todolistId и setTodolists(...) — обновляет состояние todolists, передавая новый массив без удалённого элемента.
        delete tasks[todolistId] // удаляем свойство (ключ) todolistId из объекта tasks.
    }




    // UI

    const todolistsComponents = todolists.map(tl => {

        let filteredTasks = tasks[tl.id]
        if (tl.filter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
        }
        if (tl.filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
        }


        return (
            <Grid2
                key={tl.id}>
            <Paper
                sx={{p: '15px'}}
                elevation={8}>
            <TodolistItem
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}

                deleteTask={deleteTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}

                changeTodolistFilter={changeTodolistFilter}
                deleteTodolist={deleteTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle ={changeTodolistTitle}/>
            </Paper>
            </Grid2>
        )
    })

    const [isLightMode, setIsLightMode] = useState(true)
    const changeThemeHandler = () => setIsLightMode(!isLightMode)
    const theme = createTheme({
        palette: {
            primary: {
                main: '#b28704',
            },
            secondary: {
                main: '#890b44',
            },
            mode: isLightMode ? 'light' : 'dark',
        },

    })



    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Box>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
                            <Switch onChange={changeThemeHandler}/>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>

                <Grid2 container sx={{p: '15px 0'}}>
                <CreateItemForm createItem={createTodolist}/>
                </Grid2>

                <Grid2 container spacing={4}>
                {todolistsComponents}
                </Grid2>

            </Container>
            </ThemeProvider>
        </div>
    )
}
