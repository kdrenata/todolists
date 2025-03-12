import {SxProps} from "@mui/material";


export const containerSx: SxProps = {
    display: "flex",
    justifyContent: "space-between",
}

export const getListItemSx = (isDone: boolean): SxProps => ({ // не явный возврат объекта
    opacity: isDone ? 0.5 : 1,
    fontWeight: isDone ? 400 : 700,
})

// export const getListItemSx = (isDone: boolean): SxProps => {
//     return (
//         {
//             opacity: isDone ? 0.5 : 1,
//             fontWeight: isDone ? 400 : 700
//         }
//     )
// }