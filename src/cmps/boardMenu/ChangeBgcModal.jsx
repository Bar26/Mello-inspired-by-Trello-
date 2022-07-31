import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import colorsSrc from '../../assets/img/colors.jpg'
import collabSrc from '../../assets/img/imgcollobration.jpg'
import plusSrc from '../../assets/img/plus.png'
import { boardService } from "../../services/board.service"
import { uploadService } from "../../services/upload.service"
import { onSaveBoard, setCurrBoard } from "../../store/actions/board.actions"


export const ChangeBgcModal = ({ setLastType, setLastTitle, onChangeBGImgStyle, onUploadImg, menuShow, onToggleBoardMenu, setSelectedType, setTitle }) => {

    const { currBoard } = useSelector((state) => state.boardModule)
    let uplodedBackgrounds = currBoard.uploadImgs ? currBoard.uploadImgs : []
    const [imgState, setImgState] = useState(uplodedBackgrounds)
    const dispatch = useDispatch()

    useEffect(() => {
        setUpFunc( )
    }, [])


    const setUpFunc = () => {
        setLastType('main-board')
        setLastTitle('Menu')
    }

    const onSelect = async (ev) => {
        let newImg = await uploadService.uploadImg(ev)
        const boardUploaded = imgState
        const imgArr = [...boardUploaded, newImg.url]
        await onUploadImg(imgArr)
        // console.log(currBoard);
        setImgState(imgArr)
    }

    const setUploadedBGImg = async (img) => {
        onChangeBGImgStyle(img)
    }
    ////need to check for uploded img
    return (
        <section className="change-bgc-modal-container">
            <section className="implented">
                <div className="implented-img-colors" onClick={() => { setSelectedType('pics-modal'); setTitle('Photos by NoamBar') }}><img src={collabSrc} /><p>Photos</p></div>
                <div className="implented-img-colors" onClick={() => { setSelectedType('colors-modal'); setTitle('Colors') }}><img src={colorsSrc} /><p>Colors</p></div>
            </section>
            <hr />
            <section className="custom">
                <h2>Custom</h2>
                <div className="select-container">
                    <div className="form-div">
                        <form method="post" onChange={(ev) => onSelect(ev)}>
                            <label>
                                <img src={plusSrc} />
                                <input type='file' style={{ opacity: 0, visibility: 'hidden' }}></input>

                            </label>
                        </form>
                    </div>
                    {currBoard.uploadImgs && currBoard.uploadImgs.map(img => {
                        return (<div>
                            <img src={img} onClick={() => setUploadedBGImg(img)} />
                        </div>)
                    })}
                </div>
            </section>
        </section >
    )
}