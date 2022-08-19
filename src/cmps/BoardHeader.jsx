import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { boardService } from '../services/board.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { onSaveBoard, setCurrBoard } from '../store/actions/board.actions'
import { useEffectUpdate } from './useEffectUpdate.js'
import { userService } from '../services/user.service'
import { loadUsers } from '../store/actions/user.actions.js'
import { AddMemberModal } from './MembersModal.jsx'
import { updateUser } from '../store/actions/user.actions'
import { useRef } from 'react'

export const BoardHeader = ({ menuShow, toggleBoardMenu }) => {
	const { currBoard } = useSelector((state) => state.boardModule)
	const [board, setBoard] = useState(currBoard)
	// const [star, setStar] = useState('')
	const { currUser } = useSelector((state) => state.userModule)
	const bg = currUser.imgUrl ? `url(${currUser.imgUrl}) center center / cover` : '#de350b'
	const addMemberModalRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadUsers())
	}, [])


	useEffectUpdate(() => {
		setBoardTitle()
	}, [board])
	

	const onSetStar = async (ev) => {
		ev.stopPropagation()
		console.log(currBoard);
		let newUser = await userService.setStarUser(currUser, currBoard._id)
		let userToSave = { ...newUser }

		await dispatch(updateUser(userToSave))
		dispatch({ type: 'SET_USER', user: userToSave })
	}

	const onToggleBoardMenu = () => {
		toggleBoardMenu()
	}

	const onToggleMemberModal = () => {
		addMemberModalRef.current.classList.toggle('hide')
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
			dispatch(onSaveBoard(updatedBoard))
		} catch {
			console.log('CMP ERROR')
		}
	}

	const whichStar = (boardId) => {

		if (currUser.starred?.includes(boardId)) return <i
			className="fa-solid fa-star"
			style={{
				color: 'rgb(255,184,5)',
			}}
		></i>
		else return <i
			className="fa-regular fa-star"
		></i>
	}

	return (
		<header className={`board-header ${menuShow}`}>
			<div className="board-info">
				<DebounceInput
					className="board-title"
					value={currBoard.title}
					name="title"
					type="text"
					debounceTimeout={2000}
					onChange={handleChange}
				/>
				<div className="star" onClick={(event) => onSetStar(event)}>
					{ whichStar(currBoard._id)}


				</div>
				<div className="member-img" style={{ background: bg, }}>{!currUser.imgUrl && <span>{boardService.getInitials(currUser.fullname)}</span>}</div>




				<button className="members-btn-header" onClick={onToggleMemberModal}>
					<div
						ref={addMemberModalRef}
						className="member-modal-in-header hide "
						onClick={(ev) => ev.stopPropagation()}
					>
						<AddMemberModal onToggleMemberModal={onToggleMemberModal}
							currBoard={currBoard}

						/>
					</div>
					<span className="icon members-icon">
						<i className="fa-regular fa-user"></i>
					</span>
					<span className="members-txt">Members</span>
				</button>


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
					<p className="show-menu">Show menu</p>
				</button>
			</div>
		</header>
	)
}
