import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service.js'

export const TemplatePreview = ({ template }) => {
	const [star, setStar] = useState('')
	const navigate = useNavigate()

	const onSetStar = (e) => {
		e.stopPropagation()
		if (!star.length) {
			setStar('starred fa-solid')
		} else {
			setStar('')
		}
		boardService.setStarred(template)
	}
	const onGetBoard = () => {
		navigate(`/1`)
	}
	// console.log(template);
	return (
		<article
			className="board-preview"
			style={{
				background: `URL(${template.img})`,
				backgroundSize: 'cover',
			}}
		>
			<div className="link" onClick={onGetBoard}>
				<h1>{template.title}</h1>
				<label className="star">
					<i
						className={`fa-regular fa-star ${star}`}
						onClick={(event) => onSetStar(event)}
					></i>
				</label>
			</div>
		</article>
	)
}
