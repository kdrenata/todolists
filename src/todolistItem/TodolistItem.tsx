import {type ChangeEvent} from 'react'
import type {FilterValues, TaskType} from '../App.tsx'
// import {Button} from './Button.tsx'
import style from './TodolistItem.module.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, IconButton, List, ListItem, ListItemIcon, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

type Props = {
    //данные
    todolistId: string
    title: string
    filter: FilterValues
    tasks: TaskType[]
    //функции для тасок
    deleteTask: (taskId: string, todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    //функции для тудулиста
    changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolistId,
        title,
        filter,
        tasks,

        deleteTask,
        createTask,
        changeTaskStatus,
        changeTaskTitle,

        changeTodolistFilter,
        deleteTodolist,
        changeTodolistTitle
    } = props

    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    // функция занимается добавлением таски
    const createTaskHandler = (title: string) => {
        createTask(title, todolistId)
    }

    // функция занимается обновлением локального state(a) мы ее перенесли
    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //   setTaskTitle(event.currentTarget.value)
    //   setError(null)
    // }

    // функция занимается обработкой нажатия на enter мы ее перенесли
    // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //   if (event.key === 'Enter') {
    //     createTaskHandler()
    //   }
    // }
    // const changeFilterHandler = (filter: FilterValues) => {
    //   changeFilter(filter, todolistId)
    // }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)

    }

    return (
        <div className={style.todolist}>
            <Typography variant='h6' textAlign='center' sx={{fontWeight: 700}}>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                {/*<Button title='x' onClick={deleteTodolistHandler}/>*/}
                <IconButton
                    color='primary'
                    onClick={deleteTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </Typography>
            <CreateItemForm createItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id, todolistId)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }
                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(task.id, newTitle, todolistId)
                        }

                        return (
                            <ListItem disablePadding
                                      divider
                                      key={task.id}
                                      // className={task.isDone ? 'is-done' : ''}
                                      secondaryAction={
                                          <IconButton
                                              color='primary'
                                              onClick={deleteTaskHandler}>
                                              <DeleteForeverIcon/>
                                          </IconButton>
                                      }
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        size='small'
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}/>
                                </ListItemIcon>

                                <Box sx={getListItemSx(task.isDone)}>
                                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                                </Box>

                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>
                <Button
                    variant="contained"
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeTodolistFilter('all', todolistId)}>
                    All
                </Button>
                <Button
                    variant="contained"
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeTodolistFilter('active', todolistId)}>
                    Active
                </Button>
                <Button
                    variant="contained"
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeTodolistFilter('completed', todolistId)}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
