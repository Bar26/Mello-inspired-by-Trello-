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
        'https://res.cloudinary.com/noambar/image/upload/v1659656628/Trello/wallpaperflare.com_wallpaper_1_tblvd1.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1659656634/Trello/wallpaperflare.com_wallpaper_5_zjp1if.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1659656637/Trello/wallpaperflare.com_wallpaper_3_vmrn75.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1659656640/Trello/wallpaperflare.com_wallpaper6_b0aciq.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1659656640/Trello/wallpaperflare.com_wallpaper_a19rlb.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1659656641/Trello/wallpaperflare.com_wallpaper_4_z789dg.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1659656643/Trello/wallpaperflare.com_wallpaper_2_l0khr0.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930857/Trello/pexels-emma-pollard-1534925_fchw5g.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930859/Trello/pexels-philippe-donn-1114690_joyof8.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930853/Trello/pexels-cesar-perez-733745_csgmjr.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930852/Trello/pexels-carlos-oliva-3586966_bn5ug8.jpg',
        'https://res.cloudinary.com/noambar/image/upload/v1658930851/Trello/pexels-c%C3%A1tia-matos-1072179_dfmohb.jpg',
    ]


    const onChangeBGImgStyle = async (newStyle) => {
        try {
            setLastTitle('Change background')
            setLastType('change-bgc')
            const styleToSend ={ backgroundImage: `(${newStyle})` }
            const newBoard = boardService.changeBoardBGStyle(styleToSend,currBoard,currUser)
            await dispatch(onSaveBoard(newBoard))
            await dispatch(setCurrBoard(newBoard._id))
        } catch {
            console.err();
        }
    }


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