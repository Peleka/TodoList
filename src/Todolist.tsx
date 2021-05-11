import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
                    {/*<input onChange={onChangeTaskStatus} type={"checkbox"} checked={t.isDone} />*/}
                    <Checkbox
                        checked={t.isDone}
                        color={"primary"}
                        onChange={onChangeTaskStatus}
                    />
                    <EditableSpan
                        title={t.title}
                        changeTaskTitleHandler={changeTaskTitleHandler}
                    />
                    <IconButton onClick={() => props.removeTask(t.id, props.todolistID)}>
                        <Delete/>
                    </IconButton>
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
            {/*<button onClick={onClickRemoveTodolist}>x</button>*/}
            <IconButton onClick={onClickRemoveTodolist}>
                <Delete/>
            </IconButton>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    size={"small"}
                    color={'primary'}
                    onClick={onClickAllHandler}
                >
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onClickActiveHandler}
                >
                    Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onClickCompletedHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist

