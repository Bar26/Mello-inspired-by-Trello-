import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { boardService } from '../../services/board.service'
import { onSaveBoard } from '../../store/actions/board.actions'
import { setCurrBoard } from '../../store/actions/board.actions'


export const ChangeBgcPic = ({ setSelectedType, setTitle, setLastType, setLastTitle }) => {


    const { currBoard } = useSelector((state) => state.boardModule)
    const { currUser } = useSelector((state) => state.userModule)
    const dispatch = useDispatch()

    const pics = [
        'https://res.cloudinary.com/noambar/image/upload/v1658930875/Trello/pexels-sam-kolder-2387873_slu6mu.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930870/Trello/pexels-maxime-francis-2246476_glogkz.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930867/Trello/pexels-stefan-stefancik-919606_hy0bpa.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930863/Trello/pexels-fauxels-3183198_w3iead.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930859/Trello/pexels-philippe-donn-1114690_joyof8.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930857/Trello/pexels-emma-pollard-1534925_fchw5g.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930855/Trello/pexels-errin-casano-2356045_dndqam.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930853/Trello/pexels-cesar-perez-733745_csgmjr.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930852/Trello/pexels-carlos-oliva-3586966_bn5ug8.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930851/Trello/pexels-c%C3%A1tia-matos-1072179_dfmohb.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930850/Trello/pexels-sean-patrick-1057663_aqywha.jpg',
    ]


    const onChangeBGImgStyle = async (newStyle) => {
        try {
            setLastTitle('Change background')
            setLastType('change-bgc')
            const styleToSend ={ backgroundImage: `(${newStyle})` }
            const newBoard = boardService.changeBoardBGStyle(styleToSend,currBoard,currUser)
            await dispatch(onSaveBoard(newBoard))
            await dispatch(setCurrBoard(newBoard._id))
            // await dispatch(setCurrBoard(newBoard))
        } catch {
            console.err();
        }
    }

    // const selectedPic = (img) => {
    //     onChangeBGImgStyle(img)
    // }

    return (
        <section className="select-pic-container">
            <div className="pics-container">
                {pics.map(img =>
                    <div className="pic-select">
                        <img src={img} key={`${img}`} onClick={() => onChangeBGImgStyle(img)} style={{ height: '96px', width: '148px', borderRadius: '6px' }} />
                    </div>
                )}
            </div>
        </section>
    )
}