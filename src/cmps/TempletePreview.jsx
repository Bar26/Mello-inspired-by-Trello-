import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service.js'
import { userService } from '../services/user.service.js'
import { setCurrBoard } from '../store/actions/board.actions.js'

export const TemplatePreview = ({ template, getStarredBoards }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { currUser } = useSelector((state) => state.userModule)

	
	const onCreateBoard = async () => {
		try {
			const newBoard = await boardService.getEmptyBoard(template)
			const updateUser = await userService.addBoardUser(newBoard._id, currUser)
			await userService.update(updateUser)
			dispatch(setCurrBoard(newBoard._id))
			navigate(`/boards/${newBoard._id}`)
		} catch {
			console.log('ERORR')
		}
	}
	return (
		<article
			className="board-preview"
			style={{
				background: `URL${template.img} center center / cover`,
			}}
		>
			<div className="link" onClick={onCreateBoard}>
				<h1>{template.title}</h1>
			</div>
		</article>
	)
}
