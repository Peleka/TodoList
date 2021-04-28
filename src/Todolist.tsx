import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    removeTodolist:(todolistID: string) => void
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map((t) => {
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            return (
                <li className={t.isDone ? 'isDone' : ''}>
                    <input
                        onChange={onChangeTaskStatus}
                        type={"checkbox"}
                        checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id, props.id)
                    }}>x
                    </button>
                </li>
            )
        }
    )


    const addTaskHandler = () => {
        if (title.trim() === '') {
            setError('title is requared')
        } else {
            props.addTasks(title.trim(), props.id)
            setTitle("")
            setError('')
        }

    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onClickAllHandler = () => props.changeFilter("all", props.id)
    const onClickActiveHandler = () => props.changeFilter("active", props.id)
    const onClickCompletedHandler = () => props.changeFilter("completed", props.id)
    const onClickRemoveTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onClickRemoveTodolist}>x</button>
            <div>
                <input className={error ? 'error' : 'input'}
                       value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTaskHandler}>+</button>
                <div className={error ? 'error' : ''}>{error}</div>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active' : ''}
                    onClick={onClickAllHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active' : ''}
                    onClick={onClickActiveHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active' : ''}
                    onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist