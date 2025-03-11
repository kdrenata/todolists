
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    createItem: (itemTitle: string) => void,
}


export const CreateItemForm = ({createItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }
    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }
    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField
                size='small'
                variant="outlined"
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
                error={!!error} //берем '' или null и превращвем в булево значение
                helperText={error}
                placeholder="add task..."/>
            <Button
                variant="contained"
                onClick={createItemHandler}
                endIcon={<AddCircleIcon/>}
            >
                Add
            </Button>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
}