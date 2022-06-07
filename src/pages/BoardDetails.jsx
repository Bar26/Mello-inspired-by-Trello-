import { SecondaryHeader } from '../cmps/MainHeader'
import { Outlet, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/groupList'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { BoardMenu } from '../cmps/BoardMenu.jsx'
import { useEffect, useState } from 'react'
import { TaskDetails } from '../cmps/TaskDetails'
import { Screen } from '../cmps/Screen.jsx'
import { BoardCoverModal } from '../cmps/BoardCoverModal'

export const BoardDeatails = () => {
	const [menuShow, setMenuShow] = useState('')
	const [coverMode, setCoverMode] = useState('')
	const { boardId } = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector((state) => state.boardModule)
	// console.log('currBoard form details', currBoard)

	useEffect(() => {
		if (!Object.keys(currBoard).length) {
			getCurrBoard()
		}
	}, [])

	const getCurrBoard = async () => {
		await dispatch(setCurrBoard(boardId))
	}

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
	// console.log(currBoard.style.backgroundImage);
	if (!Object.keys(currBoard || {}).length) return <h1>Loading...</h1>
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
					  }
					: { background: currBoard.style.backgroundColor }
			}
		>
			{/* {console.log((currBoard.style.backgroundImage) ? { background: currBoard.style.backgroundImage } : { background: currBoard.style.backgroundColor })} */}
			<SecondaryHeader />
			<section className="board-content">
				<BoardHeader
					menuShow={menuShow}
					toggleBoardMenu={toggleBoardMenu}
					onSetCoverMode={onSetCoverMode}
				/>
				<BoardMenu menuShow={menuShow} toggleBoardMenu={toggleBoardMenu} />
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
