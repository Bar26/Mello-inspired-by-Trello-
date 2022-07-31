import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { userService } from "../../services/user.service"
import { onSaveBoard, setCurrBoard } from "../../store/actions/board.actions"


export const CreateBoardHeader = ({ setCreateModalTitle, setCreateState }) => {
    const { currBoard } = useSelector((state) => state.boardModule)
    const { currUser } = useSelector((state) => state.userModule)
    let background = currBoard.style.backgroundColor ? currBoard.style.backgroundColor : `url${currBoard.style.backgroundImage}`
    let boardBgc = currBoard.style.backgroundColor ? 'color' : 'img'
    const [stateBackground, setBackgroud] = useState(background)
    const [imageOrColor, setImageOrColor] = useState(boardBgc)
    const dispatch = useDispatch()
        
    const palette = [
        '#0079BF',
        '#D29034',
        '#519839',
        '#B04632',
        '#89609E'
    ]

    const imgArr = [
        'https://res.cloudinary.com/noambar/image/upload/v1658617548/Trello/orange_hvkbmo.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658617531/Trello/forest_gyajgk.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658617502/Trello/hello_dab1k9.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658443199/Trello/LetsUp_xcmgzq.webp'
    ]




    const createNewBoard = async (ev) => {
        ev.preventDefault()
        // console.log(ev.target['create-title'].value);

        const newBoard = imageOrColor === 'img' ? { title: ev.target['create-title'].value, img: stateBackground } : { title: ev.target['create-title'].value, color: stateBackground }
        const boardToSave = await boardService.getEmptyBoard(newBoard, true)
        // console.log(boardToSave);
        // dispatch(onSaveBoard(boardToSave))
        const updateUser = await userService.addBoardUser(boardToSave._id,currUser)
        await userService.update(updateUser)
        dispatch(setCurrBoard(boardToSave._id))
    }



    const changeBgcPrev = (selectedEntity) => {
        setBackgroud(selectedEntity)
    }
    return (
        <div className="create-board-header-modal-container">
            {imageOrColor === 'color' &&
                <div className="img-preview" style={{ backgroundColor: stateBackground, width: '200px', height: '120px' }}>
                    <img src="https://res.cloudinary.com/dgjmjxkct/image/upload/v1653575898/Trello/board-preview.25c287ae7ad9fc2da090aeeddd284374_qjegso.svg" />
                </div>
            }
            {imageOrColor === 'img' &&
                // console.log(background)
                <div className="img-preview" style={{ backgroundImage: `${stateBackground}`, backgroundSize: 'cover', width: '200px', height: '120px' }}>
                    <img src="https://res.cloudinary.com/dgjmjxkct/image/upload/v1653575898/Trello/board-preview.25c287ae7ad9fc2da090aeeddd284374_qjegso.svg" />
                </div>
            }

            <div className="background-select">
                <h3>Background</h3>
                <div className="background-imgs">
                    {imgArr.map(img =>
                        // console.log(img)
                        <img src={img} className="background-container" onClick={() => { changeBgcPrev(`url(${img})`); setImageOrColor('img') }} key={`${img}`} style={{ height: '40px', width: '64px' }} />
                    )}
                </div>
                <div className="background-colors">
                    {palette.map(color =>
                        <div className="color-container" onClick={() => { changeBgcPrev(color); setImageOrColor('color') }} key={color} style={{ height: '32px', width: '40px', backgroundColor: color }} ></div>
                    )}
                    <div>+</div>
                </div>
                <div className="board-title-select">
                    <h3>Board title<span>*</span></h3>
                    <form onSubmit={ev => createNewBoard(ev)}>
                        <input name='create-title' type='text' />
                        <button className="button-create-board" >Create</button>
                    </form>
                    <span>👋 Board title is requird</span>
                </div>
                <span>
                    By using images from us, you agree to our <span className="end-modal-span">license</span> and <span className="end-modal-span">Terms of Service</span>
                </span>
            </div>
        </div >
    )

}