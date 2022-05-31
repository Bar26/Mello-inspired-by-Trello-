import { SecondaryHeader } from '../cmps/MainHeader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/groupList'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { BoardMenu } from '../cmps/BoardMenu.jsx'
import { useEffect, useState } from 'react'
import { boardService } from '../services/board.service.js'

export const BoardDeatails = () => {
	// console.log('in boardDetails')
	const [menuShow, setMenuShow] = useState('')
	const {boardId} = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector((state) => state.boardModule)
	// console.log(currBoard)



	useEffect(() => {
		if (!Object.keys(currBoard).length) {
			boardService
				.getById('board', boardId)
				.then((board) => dispatch(setCurrBoard(board)))
		}
	}, [])

	const toggleBoardMenu = () => {
		if (!menuShow.length) {
			setMenuShow('show')
		} else {
			setMenuShow('')
		}
	}
	if (!Object.keys(currBoard).length) return <h1>Loading...</h1>
	return (
		<section
			className="board-details"
			style={{ background: currBoard.style.backgroundColor }}
		>
			<SecondaryHeader />
			<BoardHeader menuShow={menuShow} toggleBoardMenu={toggleBoardMenu} />
			<BoardMenu menuShow={menuShow} toggleBoardMenu={toggleBoardMenu} />
			<GroupList boardId={boardId} />
			{/* <BoardGroup/> */}
		</section>
	)
}
