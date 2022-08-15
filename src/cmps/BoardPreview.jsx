import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onSaveBoard, setCurrBoard, setStaredBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service.js'

export const BoardPreview = ({ board }) => {
	const [star, setStar] = useState('')
	const background = board.style.backgroundImage ? `url${board.style.backgroundImage}` : board.style.backgroundColor
	const backgroundIndactor = board.style.backgroundImage ? 'img' : 'color'
	const [backgroundState, setBackgroudState] = useState()
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

	const onSetStar = async (e) => {
		try{
				e.stopPropagation()
		if (!star) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
		// const updatedBoard = await boardService.setStarred(board)
		// // setStar(updatedBoard.isStared ? 'starred fa-solid' : '')
		// saveStarredBoard(updatedBoard)
		// dispatch(setStaredBoard(board))
		}catch(err){

		}
	
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
						<label className="star" onClick={onSetStar}>
							<i className={`fa-regular fa-star ${star}`}></i>
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
						<label className="star" onClick={onSetStar}>
							<i className={`fa-regular fa-star ${star}`}></i>
						</label>
					</div>
				</article>
			}
		</>
	)
}
