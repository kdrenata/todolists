import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './todolistItem/TodolistItem.tsx'


export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}
export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = { // тип описания структуры данных для хранения тасок
    [todolistId: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
// BBL
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const todolistId_3 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
        {id: todolistId_3, title: 'What to cook', filter: 'all'}
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
        [todolistId_3]: [
            {id: v1(), title: 'Pie', isDone: true},
            {id: v1(), title: 'Salad', isDone: true},
            {id: v1(), title: 'French Baked Meat', isDone: false},
        ],
    })

    const deleteTask = (taskId: string, todolistId: string) => {
        // const filteredTasks = tasks.filter(task => {
        //   return task.id !== taskId
        // })
        setTasks({
            ...tasks, // объект с копией всех тасок
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        })  //по ключу todolistId(в каком-то конкретном массиве), мы взяли все старые таски tasks[todolistId] и отфильтровали в соответствии с условием(берем каждую таску и возвращаем условие(true или false для каждой таски) и конкретный todolist перезапишется
    }

    const createTask = (title: string, todolistId: string) => {
        const newTask: Task = {id: v1(), title, isDone: false} // типизируем новую таску

        setTasks({
            ...tasks, // делаем копию, потому что призошли изменения
            [todolistId]: [newTask, ...tasks[todolistId]]  // в массиве, который лежит по ключу [todolistId] появилась новая таска. Сначала кладем новую таску, потом все таски, которые были в массиве раньше
        })
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)
        })
    }

    const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

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
            <TodolistItem
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}

                deleteTask={deleteTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}

                changeTodolistFilter={changeTodolistFilter}
                deleteTodolist={deleteTodolist}/>
        )
    })

    return (
        <div className="app">
            {todolistsComponents}
        </div>
    )
}
