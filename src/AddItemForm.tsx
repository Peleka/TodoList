import React, {useState, KeyboardEvent, ChangeEvent} from 'react'

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType){
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

    return(
        <div>
            <input className={error ? 'error' : 'input'}
                   value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}
            />
            <button onClick={onClickAddItem}>+</button>
            <div className={error ? 'error' : ''}>{error}</div>
        </div>
    )
}

export default AddItemForm;