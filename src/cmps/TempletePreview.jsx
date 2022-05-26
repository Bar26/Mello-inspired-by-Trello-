import winter from '../assets/img/winter.png'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import templateImg from `${template.img}`

// const style = {
// backgroundImage: winter,
// } 

export const TemplatePreview = ({ template }) => {
	// console.log(template[0])
	///<BoardHeader/>
	const img = template.img
	// console.log(template.img)
	return (
		<article className="template-preview" style={{backgroundImage: "'url('+`${img}`+')'"}}>
			 <Link to={`/boards/${template._id}`}>
				<h1>{template.title}</h1>
				<button className="star">%</button>
				{/* <img src={template.img} /> */}
				{/* <img src={img} /> */}
			</Link>
		</article>
	)
}
