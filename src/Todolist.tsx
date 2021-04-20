import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map((t) => {
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            return (
                <li className={t.isDone ? 'isDone' : ''}>
                    <input
                        onChange={onChangeTaskStatus}
                        type={"checkbox"}
                        checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
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
            props.addTasks(title.trim())
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

    const onClickAllHandler = () => props.changeFilter("all")
    const onClickActiveHandler = () => props.changeFilter("active")
    const onClickCompletedHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
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