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

export const BoardDeatails = () => {
	const [menuShow, setMenuShow] = useState('')
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
	if (!Object.keys(currBoard || {}).length) return <h1>Loading...</h1>
	return (
		<section
			className="board-details"
			style={{ background: currBoard.style.backgroundColor }}
		>
			<SecondaryHeader />
			<section className="board-content">
				<BoardHeader menuShow={menuShow} toggleBoardMenu={toggleBoardMenu} />
				<BoardMenu menuShow={menuShow} toggleBoardMenu={toggleBoardMenu} />
				<GroupList boardId={boardId} />
				<Outlet />
				<Screen />
			</section>
			{/* <BoardGroup/> */}
		</section>
	)
}
