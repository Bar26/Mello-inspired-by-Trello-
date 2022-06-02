import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service.js'
import { setCurrBoard } from '../store/actions/board.actions.js'

export const TemplatePreview = ({ template, getStarredBoards }) => {
	const navigate = useNavigate()

	const onCreateBoard = async () => {
		try {
			const currBoard = await boardService.getEmptyBoard(template)
			setCurrBoard(currBoard._id)
			navigate(`/boards/${currBoard._id}`)
		} catch {
			console.log('ERORR')
		}
	}
	return (
		<article
			className="board-preview"
			style={{
				background: `URL(${template.img}) center center / cover`,
			}}
		>
			<div className="link" onClick={onCreateBoard}>
				<h1>{template.title}</h1>
			</div>
		</article>
	)
}
