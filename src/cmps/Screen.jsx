import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setIsTaskDetailsScreenOpen } from "../store/actions/board.actions"

export const Screen = ()=> {
    const dispatch = useDispatch()
    const {isTaskDetailScreenOpen} = useSelector(state=>state.boardModule)

    const onCloseModal = () => {
        dispatch(setIsTaskDetailsScreenOpen(false))
    }
    if (isTaskDetailScreenOpen) return <div onClick={onCloseModal} className="screen"></div>
    else return <></>
}