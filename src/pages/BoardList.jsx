import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardPreview } from '../cmps/BoardPreview'
import { TemplatePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'

export const BoardList = () => {
	const [boards, setBoards] = useState([])
	const [templates, setTemplates] = useState([])

	useEffect(() => {
		loadBoards()
		loadTemplates()
	}, [])

	const loadBoards = () => {
		boardService.query().then((board) => setBoards(board))
		// .then(console.log(boards))
	}
	const loadTemplates = () => {
		boardService.queryTemplates().then((template) => setTemplates(template))
		// .then((templates) => setTemplatestes(templates))
	}
	//<setTemplatesdHeader/>
	console.log('in boardlist',boards)
	console.log(templates)
	if(!boards||!templates) return 'loading...'
	return (
		< section >
			<h1>Templates</h1>
			{templates.map((template) => {
				return <TemplatePreview template={template} key={template.id} />
			})}
			<h1>Starred Boards</h1>
			{boards.map(board => <BoardPreview board={board} key={board._id} />)}

			<h1>Recently Viewed Boards</h1>

			<h1>All Boards</h1>
			{boards.map(board => <BoardPreview board={board} key={board._id} />)}
		</section >
	)
}
