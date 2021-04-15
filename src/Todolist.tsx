import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>("")

    const tasks = props.tasks.map((t) => {
            return (
                <li>
                    <input type={"checkbox"} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {props.removeTask(t.id)}}>x</button>
                </li>
            )
        }
    )

    const addTaskHandler = () => {
        props.addTasks(title)
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
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
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                { tasks }
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist