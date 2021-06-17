import React, {useCallback} from 'react'
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


export type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodoListTitle: (todolistID: string, newTitle: string) => void
}

const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("TododList is called")

    function getTaskForTodoList() {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    let newTasks = getTaskForTodoList()

    const tasks = newTasks.map((t) =>
        <Task
            t={t}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            todolistID={props.todolistID}
            changeTaskTitle={props.changeTaskTitle}
            key={t.id}
        />)

    const onClickAllHandler = useCallback(() => props.changeFilter("all", props.todolistID), [props.todolistID, props.changeFilter])
    const onClickActiveHandler = useCallback(() => props.changeFilter("active", props.todolistID), [props.todolistID, props.changeFilter])
    const onClickCompletedHandler = useCallback(() => props.changeFilter("completed", props.todolistID), [props.todolistID, props.changeFilter])
    const onClickRemoveTodolist = useCallback(() => props.removeTodolist(props.todolistID), [props.todolistID, props.removeTodolist])

    //add task:
    const addTask = useCallback((title: string) => {
        props.addTasks(title, props.todolistID)
    }, [props.todolistID, props.addTasks])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolistID, newTitle)
    }, [props.todolistID, props.changeTodoListTitle])


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
})

export default Todolist