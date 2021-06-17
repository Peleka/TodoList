import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTaskTitleHandler: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan is called")
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('') // можно оставить props.title

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title) //текущее значение в инпуте
    }
    const activateVieMode = () => {
        setEditMode(false)
        props.changeTaskTitleHandler(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return editMode
        ? <TextField
            variant={"outlined"}
            value={title}
            onChange={onChangeTitleHandler}
            autoFocus
            onBlur={activateVieMode}

        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})