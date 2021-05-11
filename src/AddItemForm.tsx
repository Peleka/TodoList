import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle === '') {
            setError('title is requared')
        } else {
            props.addItem(trimmedTitle)
            setTitle("")
            setError('')
        }
    }

    return (
        <div>
            <TextField
                variant="outlined"
                error={!!error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                helperText={error}
            />
            <IconButton
                // variant={"contained"}
                color={"primary"}
                onClick={onClickAddItem}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;