import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    changeTodoListTitle: (todolistID: string, newTitle: string) => void
}

function Todolist(props: TodolistPropsType) {
    const tasks = props.tasks.map((t) => {
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
            const changeTaskTitleHandler = (title: string) =>
                props.changeTaskTitle(t.id, title, props.todolistID)
            return (
                <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <input
                        onChange={onChangeTaskStatus}
                        type={"checkbox"}
                        checked={t.isDone}
                    />
                    <EditableSpan
                        title={t.title}
                        changeTaskTitleHandler={changeTaskTitleHandler}
                    />
                    <button onClick={() => {
                        props.removeTask(t.id, props.todolistID)
                    }}>x
                    </button>
                </li>
            )
        }
    )
    const onClickAllHandler = () => props.changeFilter("all", props.todolistID)
    const onClickActiveHandler = () => props.changeFilter("active", props.todolistID)
    const onClickCompletedHandler = () => props.changeFilter("completed", props.todolistID)
    const onClickRemoveTodolist = () => props.removeTodolist(props.todolistID)
    //add task:
    const addTask = (title: string) => {
        props.addTasks(title, props.todolistID)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todolistID, newTitle)
    }
    return (
        <div>
            <EditableSpan title={props.title} changeTaskTitleHandler={changeTodoListTitle}/>
            <button onClick={onClickRemoveTodolist}>x</button>
            <AddItemForm addItem={addTask}/>
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

