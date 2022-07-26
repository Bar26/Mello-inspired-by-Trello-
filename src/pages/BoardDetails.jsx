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
import { socketService } from '../services/socket.service'
import  {SOCKET_ON_CHANGE_BOARD}  from '../services/socket.service'

export const BoardDeatails = () => {
	const [menuShow, setMenuShow] = useState('')
	const [coverMode, setCoverMode] = useState('')
	const { boardId } = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector((state) => state.boardModule)

	useEffect(() => {
	
		dispatch(setCurrBoard(boardId))
		socketService.on(SOCKET_ON_CHANGE_BOARD, board=>{
			console.log(board)
			// dispatch(setCurrBoard(board._id))
			dispatch({type:"SAVE_BOARD",board})

		})

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
					  }: { backgroundColor: currBoard.style.backgroundColor }
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
				<BoardMenu menuShow={menuShow} toggleBoardMenu={toggleBoardMenu}   />
				<BoardCoverModal
					onSetCoverMode={onSetCoverMode}
					coverMode={coverMode}
				/>
				<GroupList boardId={boardId}  />
				<Outlet />
				<Screen />
			</section>
			{/* <BoardGroup/> */}
		</section>
	)
}
