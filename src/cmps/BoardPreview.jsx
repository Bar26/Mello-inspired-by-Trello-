import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'

export const BoardPreview = ({ board }) => {
	const [star, setStar] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
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
		navigate(`/boards/${board._id}`)
	}

	return (
		//! THE STOP PROPAGATION IS NOT WORKING !!!
		<article
			className="board-preview"
			style={{ backgroundColor: 'green' }}
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

// export const BoardPreview = ({ board }) => {
//     const dispatch = useDispatch()
//     ///<BoardHeader/>
//     // console.log('in boardlist',board)
//     ///<BoardHeader/>
//     return (
//         <article className="board-preview" style={{ backgroundColor: 'green' }}>
//             <Link onClick={() => dispatch(setCurrBoard(board))} to={`/boards/${board._id}`}>
//                 <h1>{board.title}</h1>
//                 <label className="star">
//                     <button></button>
//                     <i className="fa-regular fa-star"></i>
//                     {/* <i className="fa-solid fa-copy"></i> */}
//                 </label>
//             </Link>
//         </article>
//     )
//}
