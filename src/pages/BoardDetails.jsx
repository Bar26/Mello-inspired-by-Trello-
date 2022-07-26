import { MainHeader } from '../cmps/MainHeader'
import { Outlet, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/GroupList'
import { useDispatch, useSelector } from 'react-redux'
import { onSaveBoard, setCurrBoard } from '../store/actions/board.actions'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { BoardMenu } from '../cmps/BoardMenu.jsx'
import { useEffect, useState } from 'react'
// import { TaskDetails } from '../cmps/TaskDetails'
import { Screen } from '../cmps/Screen.jsx'
import { BoardCoverModal } from '../cmps/BoardCoverModal'
import { boardService } from '../services/board.service'
import { socketService,SOCKET_EMIT_UPDATE_BOARD } from '../services/socket.service'

export const BoardDeatails = () => {
	const [menuShow, setMenuShow] = useState('')
	const [coverMode, setCoverMode] = useState('')
	const { boardId } = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector((state) => state.boardModule)
	// console.log('currBoard form details', currBoard)

	useEffect(() => {
		// if (!Object.keys(currBoard).length) {
		// 	getCurrBoard()
		// }

		socketService.on(SOCKET_EMIT_UPDATE_BOARD,(board)=>{
			console.log(board, 'board from back socket')
			// dispatch({ type: 'SAVE_BOARD', board })
		dispatch(setCurrBoard(boardId))

		})
		dispatch(setCurrBoard(boardId))
	}, [])

	// const getCurrBoard = async () => {
	// 	await dispatch(setCurrBoard(boardId))
	// }

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

	// const onChangeColorStyle = async (newStyle) => {
	// 	try {
	// 		const newBoard = { ...currBoard, style: { backgroundColor: newStyle } }
	// 		await dispatch(onSaveBoard(newBoard))
	// 		await dispatch(setCurrBoard(newBoard._id))
	// 		return newBoard
	// 		// await dispatch(setCurrBoard(newBoard))
	// 	} catch {
	// 		console.err();
	// 	}
	// }

	const onChangeBGImgStyle = async (newStyle) => {
		try {
			const newBoard = { ...currBoard,  style:{ backgroundImage: `(${newStyle})`}}
			await dispatch(onSaveBoard(newBoard))
			await dispatch(setCurrBoard(newBoard._id))
			return newBoard
			// await dispatch(setCurrBoard(newBoard))
		} catch {
			console.err();
		}
	}

	const onUploadImg = async (imgArr) =>{
		let newBoard = await boardService.uploadImgToBoard(currBoard, imgArr)
        await dispatch(onSaveBoard(newBoard))
        await dispatch(setCurrBoard(newBoard._id))
	}


	// console.log(currBoard.style.backgroundImage);
	if (!Object.keys(currBoard || {}).length) return <div className="loader"></div>
	return (
		<section
			className="board-details"
			style={
				currBoard.style.backgroundImage
					? {
							backgroundImage: `URL${currBoard?.style?.backgroundImage || '()'}` ,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
					  }: { background: currBoard.style.backgroundColor }
			}
		>
			{/* {console.log((currBoard.style.backgroundImage) ? { background: currBoard.style.backgroundImage } : { background: currBoard.style.backgroundColor })} */}
			<MainHeader />
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
			{/* <BoardGroup/> */}
		</section>
	)
}
