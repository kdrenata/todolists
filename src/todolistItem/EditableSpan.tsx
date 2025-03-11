import {type ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string  //старый title
    changeTitle: (newTitle: string) => void // функция для возврата нового title
}
export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(itemTitle)
    }
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        isEditMode        //если включен режим редактирования true, то показываем input...
            ? <TextField
                variant='standard'
                value={itemTitle}
                autoFocus
                onChange={changeItemTitleHandler}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}