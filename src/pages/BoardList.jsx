import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardPreview } from '../cmps/BoardPreview'
import { CreateModal } from '../cmps/createModal'
import { TemplatePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'

export const BoardList = () => {
	const [boards, setBoards] = useState([])
	const [templates, setTemplates] = useState([])
	const [createMode, setCreateMode] = useState('')

	useEffect(() => {
		loadBoards()
		loadTemplates()
	}, [])

	const loadBoards = () => {
		boardService.query().then(setBoards)
		// .then(console.log(boards))
	}
	const loadTemplates = () => {
		boardService.queryTemplates().then(setTemplates)
	}

	const onSetCreateMode = () => {
		if (!createMode.length) {
			setCreateMode('create-mode')
		} else {
			setCreateMode('')
		}
	}
	if (!boards.length) return <h1>loading...</h1>
	return (
		<section className="workspace">
			<h1>Templates</h1>
			<section className="board-list">
				<article className="create-preview" onClick={onSetCreateMode}>
					<h1>Create New Board</h1>
				</article>
				{templates.map((template) => {
					return <TemplatePreview template={template} key={template.id} />
				})}
			</section>
			<h1>
				<i className="fa-regular fa-star"></i>
				Starred Boards
			</h1>
			<section className="board-list">
				{boards.map((board) => {
					return <BoardPreview board={board} key={board._id} />
				})}
			</section>

			<h1>Recently Viewed Boards</h1>

			<h1>All Boards</h1>
			<CreateModal createMode={createMode} onSetCreateMode={onSetCreateMode} />
		</section>
	)
}
