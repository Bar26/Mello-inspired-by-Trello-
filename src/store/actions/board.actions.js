import { boardService } from "../../services/board.service"
// import { userService } from "../services/user.service.js";
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function setCurrBoard(board){
    // console.log("HEY FROM DISPATCH")
    return (dispatch)=> dispatch({
                type: 'SET_CURRBOARD',
                board
            })
}




