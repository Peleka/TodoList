import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('') // ожно оставить props.title

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateVieMode = () => {
        setEditMode(false)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    return editMode
        ? <input
            value={title}
            onChange={onChangeTitleHandler}
            autoFocus
            onBlur={activateVieMode}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}----</span>
}