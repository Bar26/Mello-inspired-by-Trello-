import winter from '../assets/img/winter.png'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const style = {
	backgroundImage: winter,
}

export const TempletePreview = ({ templete }) => {
	// console.log(templete[0])
	///<BoardHeader/>
	return (
		<article className="board-preview" style={{ backgroundColor: 'green' }}>
			<Link to={`boards/`}>
				<h1>{templete.title}</h1>
				<button className="star">%</button>
				<img src={templete.img} />
			</Link>
		</article>
	)
}
