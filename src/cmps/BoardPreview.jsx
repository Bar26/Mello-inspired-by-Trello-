import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onSaveBoard, setCurrBoard, setStaredBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service.js'
import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'
import { updateUser } from '../store/actions/user.actions'

export const BoardPreview = ({ board }) => {
	const [star, setStar] = useState('')
	const [staredBoards, setStaredBoards] = useState([])
	const background = board.style.backgroundImage ? `url${board.style.backgroundImage}` : board.style.backgroundColor
	const backgroundIndactor = board.style.backgroundImage ? 'img' : 'color'
	const [backgroundState, setBackgroudState] = useState()
	const { currUser } = useSelector((state) => state.userModule)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		setBackgroudState(background)
		if (board.isStared) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
	}, [board])

	const loadUserStarredBoards = async () => {
		if (!currUser.starred?.length) return
		try {
			Promise.all(
				currUser.starred?.map(async (boardId) => {
					let board
					if (currUser.boards.includes(boardId))
						// console.log(('includes'));
							board = await boardService.getById(boardId)
							// boardService.getTemplateById(boardId)
						else board = await boardService.getTemplateById(boardId)
						console.log(board)
					return board
				})
			).then((userBoards) => {
				setStaredBoards(userBoards || [])
				// dispatch({ type: 'SET_STARRED_BOARDS', starredBoards: userBoards || [] })
			})
		} catch (err) {
			console.log('Cannot load Boards !', err)
		}
	}


	useEffect(() => {
		console.log('user changed in main header');
		loadUserStarredBoards()

	}, [currUser])
	// const onSetStar = async (e) => {
	// 	try{
	// 			e.stopPropagation()
	// 	if (!star) {
	// 		setStar('starred fa-solid')
	// 	} else {
	// 		setStar('')
	// 	}
	// 	// const updatedBoard = await boardService.setStarred(board)
	// 	// // setStar(updatedBoard.isStared ? 'starred fa-solid' : '')
	// 	// saveStarredBoard(updatedBoard)
	// 	// dispatch(setStaredBoard(board))
	// 	}catch(err){

	// 	}

	// }

	const onSetStar = async (ev, template) => {
		ev.stopPropagation()
		// boardService.setStarred(template)
		let newUser = await userService.setStarUser(currUser, template._id)

		await dispatch(updateUser(newUser))
		console.log(currUser, newUser);
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

	const onGetBoard = async () => {
		const currBoard = await boardService.getById(board._id)
		setCurrBoard(currBoard.id)
		navigate(`/boards/${board._id}`)
	}

	const getBoardStyle = () => {
		return board.style?.backgroundColor
			? board.style.backgroundColor
			: `URL(${board.style.backgroundImage}) center center / cover`
	}

	return (
		<>
			{backgroundIndactor === 'img' &&
				<article
					className="board-preview"
					style={{ backgroundImage: backgroundState, backgroundSize: 'cover' }}
					onClick={onGetBoard}
				>
					<div onClick={() => dispatch(setCurrBoard(board))} className="link">
						<h1>{board.title}</h1>
						<label className="star" onClick={(event) => onSetStar(event, board)}>
							{whichStar(board._id)}
						</label>
					</div>
				</article>
			}
			{backgroundIndactor === 'color' &&
				<article
					className="board-preview"
					style={{ background: backgroundState }}
					onClick={onGetBoard}
				>
					<div onClick={() => dispatch(setCurrBoard(board))} className="link">
						<h1>{board.title}</h1>
						<label className="star" onClick={(event) => onSetStar(event, board)}>
							{whichStar(board._id)}
						</label>
					</div>
				</article>
			}
		</>
	)
}
