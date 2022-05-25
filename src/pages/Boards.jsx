import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardPreview } from '../cmps/BoardPreview'
import { boardService } from '../services/board.service.js'

export const Boards = () => {
	const [boards, setBoards] = useState([])

	useEffect(() => {
		loadBoards()
	}, [])

	const loadBoards = () => {
		boardService.query().then(setBoards)
	}
	//<BoardHeader/>
	console.log(boards)
	return (
		<section>
			<h1>Starred Boards</h1>
			{boards.map((board) => {
				return <BoardPreview board={board} />
			})}

			<h1>Recently Viewed Boards</h1>

			<h1>All Boards</h1>
		</section>
	)
}
