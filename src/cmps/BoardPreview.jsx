import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

export const BoardPreview = ({ board }) => {
	const [star, setStar] = useState('')
	const navigate = useNavigate()
	const onSetStar = (e) => {
		e.stopPropagation()
		if (!star.length) {
			setStar('starred fa-solid')
			console.log('IN')
		} else {
			setStar('')
			console.log('OUT')
		}
	}

	const onGetBoard = () => {
		navigate(`${board._id}`)
	}

	return (
		//! THE STOP PROPAGATION IS NOT WORKING !!!
		<article className="board-preview" style={{ backgroundColor: 'green' }} onClick={onGetBoard}>
			<div className="link" >
				<h1>{board.title}</h1>
				<label className="star" onClick={(event) => onSetStar(event)}>
					<i className={`fa-regular fa-star ${star}`}></i>
				</label>
			</div>
		</article>
	)
}
