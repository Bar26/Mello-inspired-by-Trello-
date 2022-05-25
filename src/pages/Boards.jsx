import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardPreview } from '../cmps/BoardPreview'
import { TempletePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'

export const Boards = () => {
	const [boards, setBoards] = useState([])
	const [templetes, setTempletes] = useState([])

	useEffect(() => {
		loadBoards()
		loadTempletes()
	}, [])

	const loadBoards = () => {
		boardService.query().then(setBoards)
	}
	const loadTempletes = () => {
		boardService.queryTempletes().then((templetes) => setTempletes(templetes))
	}
	//<BoardHeader/>
	// console.log(boards)
	console.log(templetes)
	return (
		<section>
			<h1>Starred Boards</h1>
			{boards.map((board) => {
				return <BoardPreview board={board}  key={board._id}/>
			})}
			{templetes[0].map((templete) => {
				return <TempletePreview templete={templete} key={templete.id} />
			})}

			<h1>Recently Viewed Boards</h1>

			<h1>All Boards</h1>
		</section>
	)
}
