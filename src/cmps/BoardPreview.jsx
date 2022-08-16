import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service.js'
import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'
import { updateUser } from '../store/actions/user.actions'

export const BoardPreview = ({ board, loadUserStarredBoards, isStared }) => {
	const [star, setStar] = useState(isStared)
	const background = board.style.backgroundImage ? `url${board.style.backgroundImage}` : board.style.backgroundColor
	const backgroundIndactor = board.style.backgroundImage ? 'img' : 'color'
	const [backgroundState, setBackgroudState] = useState()
	const { currUser } = useSelector((state) => state.userModule)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		setBackgroudState(background)
	}, [board])


	useEffect(() => {

	}, [isStared])

	useEffect(() => {
		console.log('user changed in BP',currUser);
		setStar(isStared)

	}, [currUser])

	useEffect(() => {
		console.log(star);
	}, [])


	const onSetStar = async (ev, template) => {
		ev.stopPropagation()
		let newUser = await userService.setStarUser(currUser, template._id)

		await dispatch(updateUser(newUser))
		setStar(!isStared)
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
			: `URL${board.style.backgroundImage} center center / cover`
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
							{star ? <i className="fa-solid fa-star"
								style={{ color: 'rgb(255,184,5)', }}></i> :
								<i className="fa-regular fa-star" ></i>}
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
