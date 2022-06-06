import React, { useCallback, useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { boardService } from '../services/board.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setCurrBoard, onSaveBoard } from '../store/actions/board.actions'
import { useEffectUpdate } from './useEffectUpdate.js'

export const BoardHeader = ({ menuShow, toggleBoardMenu }) => {
	const { currBoard } = useSelector((state) => state.boardModule)
	const [board, setBoard] = useState(currBoard)
	const [star, setStar] = useState('')
	const { currUser } = useSelector((state) => state.userModule)
	const params = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!Object.keys(currBoard).length) {
			boardService
				.getById(params.boardId)
				.then((board) => dispatch(setCurrBoard(board)))
		}
	}, [])

	useEffectUpdate(() => {
		setBoardTitle()
	}, [board])

	useEffect(() => {
		if (currBoard.isStared) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
	}, [currBoard])

	const onSetStar = (e) => {
		e.stopPropagation()
		if (!star.length) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
		boardService.setStarred(currBoard)
	}

	const getAvatarBackground = (member) => {
		return { background: `url(${member.imgUrl}) center center / cover` }
	}

	const onToggleBoardMenu = () => {
		toggleBoardMenu()
	}

	const handleChange = (ev) => {
		try {
			const value = ev.target.value
			setBoard({ ...board, title: value })
		} catch {
			console.log('STATE ERROR')
		}
	}

	const setBoardTitle = async () => {
		try {
			const updatedBoard = await boardService.setTitle(board)
			await dispatch(setCurrBoard(updatedBoard._id))
		} catch {
			console.log('CMP ERROR')
		}
	}

	return (
		<header className={`board-header ${menuShow}`}>
			<div className="board-info">
				<DebounceInput
					className="board-title"
					value={board.title}
					name="title"
					type="text"
					debounceTimeout={2000}
					onChange={handleChange}
				/>
				<label className="star" onClick={(event) => onSetStar(event)}>
					<i className={`fa-regular fa-star ${star}`}></i>
				</label>
				<div
					className="member-img"
					style={{
						background: `url(${currUser.imgUrl}) center center / cover`,
					}}
				></div>
			</div>
			<div className="board-menu">
				<button className="board-menu-btn" onClick={onToggleBoardMenu}>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 512 512"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="256" cy="256" r="48"></circle>
						<circle cx="416" cy="256" r="48"></circle>
						<circle cx="96" cy="256" r="48"></circle>
					</svg>
					<p>Show menu</p>
				</button>
			</div>
		</header>
	)
}
