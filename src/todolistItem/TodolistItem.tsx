import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task} from '../App.tsx'
import {Button} from '../Button.tsx'
import style from './TodolistItem.module.css'

type Props = {
  //данные
  todolistId: string
  title: string
  filter: FilterValues
  tasks: Task[]
  //функции для тасок
  deleteTask: (taskId: string, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  //функции для тудулиста
  changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
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

    changeTodolistFilter,
    deleteTodolist
  } = props

  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      createTask(trimmedTitle, todolistId)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }


  const deleteTodolistHandler = () => deleteTodolist(todolistId)


  return (
      <div className={style.todolist} >
        <h3>
          {title}
          <Button title='x' onClick={deleteTodolistHandler}/>
        </h3>
        <div>
          <input className={error ? 'error' : ''}
                 value={taskTitle}
                 onChange={changeTaskTitleHandler}
                 onKeyDown={createTaskOnEnterHandler}/>
          <Button title={'+'} onClick={createTaskHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }

                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <input type="checkbox" checked={task.isDone}
                             onChange={changeTaskStatusHandler}/>
                      <span>{task.title}</span>
                      <Button title={'x'} onClick={deleteTaskHandler}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button className={filter === 'all' ? 'active-filter' : ''}
                  title={'All'}
                  onClick={() => changeTodolistFilter('all', todolistId)}/>
          <Button className={filter === 'active' ? 'active-filter' : ''}
                  title={'Active'}
                  onClick={() => changeTodolistFilter('active', todolistId)}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''}
                  title={'Completed'}
                  onClick={() => changeTodolistFilter('completed', todolistId)}/>
        </div>
      </div>
  )
}
