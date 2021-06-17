import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskPropsType = {
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    todolistID: string
    t: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.t.id, e.currentTarget.checked, props.todolistID), [props.t.id, props.changeTaskStatus, props.todolistID])
    const changeTaskTitleHandler = useCallback((title: string) =>
        props.changeTaskTitle(props.t.id, title, props.todolistID), [props.t.id, props.changeTaskTitle, props.todolistID])

    return (
        <li key={props.t.id} className={props.t.isDone ? 'isDone' : ''}>
            {/*<input onChange={onChangeTaskStatus} type={"checkbox"} checked={t.isDone} />*/}
            <Checkbox
                checked={props.t.isDone}
                color={"primary"}
                onChange={onChangeTaskStatus}
            />
            <EditableSpan
                title={props.t.title}
                changeTaskTitleHandler={changeTaskTitleHandler}
            />
            <IconButton onClick={() => props.removeTask(props.t.id, props.todolistID)}>
                <Delete/>
            </IconButton>
        </li>
    )
})