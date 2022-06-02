import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service.js'

export const BoardPreview = ({ board, getStarredBoards }) => {
	const [star, setStar] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (board.isStared) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
	}, [board])

	const onSetStar = (e) => {
		e.stopPropagation()
		if (!star.length) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
		boardService.setStarred(board)
		getStarredBoards()
	}

	const onGetBoard = () => {
		navigate(`/boards/${board._id}`)
	}

	const getBoardStyle = () => {
		return board.style.backgroundColor
			? board.style.backgroundColor
			: `URL(${board.style.backgroundImage}) center center / cover`
	}

	return (
		<article
			className="board-preview"
			style={{ background: getBoardStyle() }}
			onClick={onGetBoard}
		>
			<div onClick={() => dispatch(setCurrBoard(board))} className="link">
				<h1>{board.title}</h1>
				<label className="star" onClick={(event) => onSetStar(event)}>
					<i className={`fa-regular fa-star ${star}`}></i>
				</label>
			</div>
		</article>
	)
}
