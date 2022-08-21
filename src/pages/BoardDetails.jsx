import { MainHeader } from '../cmps/MainHeader'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/GroupList'
import { useDispatch, useSelector } from 'react-redux'
import { onSaveBoard, setCurrBoard } from '../store/actions/board.actions'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { BoardMenu } from '../cmps/BoardMenu.jsx'
import { useEffect, useState } from 'react'
import { Screen } from '../cmps/Screen.jsx'
import { BoardCoverModal } from '../cmps/BoardCoverModal'
import { boardService } from '../services/board.service'
import { getUser, setCurrUser } from '../store/actions/user.actions'
import { socketService, SOCKET_EMIT_UPDATE_BOARD } from '../services/socket.service'
import { useEffectUpdate } from '../cmps/useEffectUpdate'
import { type } from '@testing-library/user-event/dist/type'

export const BoardDeatails = () => {
	const [menuShow, setMenuShow] = useState('')
	const [coverMode, setCoverMode] = useState('')
	const { boardId } = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector((state) => state.boardModule)
	const { currUser } = useSelector((state) => state.userModule)
	const navigate = useNavigate()

	useEffect(() => {
		socketService.on(SOCKET_EMIT_UPDATE_BOARD, (board) => {
			dispatch({type:"SAVE_BOARD",board})
			
		})
		if(!currBoard||!Object.keys(currBoard).length) dispatch(setCurrBoard(boardId))

		console.log('currboard in boarddetails', currBoard);

	}, [])

	useEffectUpdate(() => {
		if(currBoard._id!==boardId) dispatch(setCurrBoard(boardId))

	}, [boardId])
	

	useEffect(() => {
	

		console.log('currboard in boarddetails- after change in currBard', currBoard);

	}, [currBoard])

	useEffect(() => {

		if (!currUser) {
			dispatch(setCurrUser(currUser))
		}
	}, [currUser])


	useEffect(() => {
		dispatch(getUser())
	}, [])

	const toggleBoardMenu = () => {
		if (!menuShow.length) {
			setMenuShow('show')
		} else {
			setMenuShow('')
		}
	}
	const onSetCoverMode = () => {
		if (!coverMode.length) {
			setCoverMode('show')
		} else {
			setCoverMode('')
		}
	}

	const onUploadImg = async (imgArr) => {
		let newBoard = await boardService.uploadImgToBoard(currBoard, imgArr)
		await dispatch(onSaveBoard(newBoard))
	}
	const onChangeBGImgStyle = async (newStyle) => {
		try {
			const newBoard = { ...currBoard, style: { backgroundImage: `(${newStyle})` } }
			await dispatch(onSaveBoard(newBoard))
		} catch {
			console.err();
		}
	}


	if (!Object.keys(currBoard || {}).length) return <div className="loader"></div>

	return (
		<section
			className="board-details"
			style={
				currBoard.style.backgroundImage
					? {
						backgroundImage: `URL${currBoard?.style?.backgroundImage || '()'} `,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						// backgroundPosition: 'center center',
						position:'fixed',
						// backgroundAttachment:'fixed'
					} : { backgroundColor: currBoard.style.backgroundColor }
			}
		>
			<div className="main-header-container">
				<MainHeader />
			</div>
			<section className="board-content">
				<BoardHeader
					menuShow={menuShow}
					toggleBoardMenu={toggleBoardMenu}
					onSetCoverMode={onSetCoverMode}
				/>
				<BoardMenu onChangeBGImgStyle={onChangeBGImgStyle} onUploadImg={onUploadImg} onSetCoverMode={onSetCoverMode} menuShow={menuShow} toggleBoardMenu={toggleBoardMenu} />
				<BoardCoverModal
					onSetCoverMode={onSetCoverMode}
					coverMode={coverMode}
				/>
				<GroupList boardId={boardId} />
				<Outlet />
				<Screen />
			</section>
		</section>
	)
}
