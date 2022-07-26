import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { onSaveBoard, setCurrBoard, onChangeColorStyle } from '../../store/actions/board.actions'
import { useHistory, useNavigate } from "react-router-dom";


export const ChangeBgcColorsModal = ({ menuShow, onToggleBoardMenu, setSelectedType, setTitle }) => {
    const { currBoard } = useSelector((state) => state.boardModule)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const palette = [
        '#61bd4f',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
        '#519839'
    ]




    // const onSelect = (newStyle) => {
    //     console.log(newStyle);
    //     onChangeColorStyle(newStyle)
    //     setSelectedType('main-board')
    //     setTitle('Menu')

    // }

    useEffect(() => {
        console.log('currBoard in store:', currBoard)
    }, [currBoard])

    return (
        <section className="colors-modal">
            {palette.map(color =>

                <div className="color-container" style={{ backgroundColor: color }} onClick={() => dispatch(onChangeColorStyle(currBoard,color))}></div>
            )}


        </section>
    )
}