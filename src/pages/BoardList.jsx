import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardPreview } from '../cmps/BoardPreview'
import { userService } from '../services/user.service.js'
import { CreateModal } from '../cmps/createModal'
import { TemplatePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'
import { SecondaryHeader } from '../cmps/MainHeader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrUser } from '../store/actions/user.actions'

export const BoardList = () => {
	const [boards, setBoards] = useState([])
	const [staredBoards, setStaredBoards] = useState([])
	const [templates, setTemplates] = useState([])
	const [createMode, setCreateMode] = useState('')
	const { currUser } = useSelector((state) => state.userModule)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('11')
		
		if (!Object.keys(currUser).length) {
			userService
				.getLoggedinUser()
				.then((user) => dispatch(setCurrUser(user)))
				.then(loadUserBoards('1'))
		}
	}, [])
	useEffect(() => {
		console.log('22')
		// loadBoards()
		loadTemplates()
		if (Object.keys(currUser).length) {
			loadUserBoards('2')
		}
	}, [staredBoards])
	// useEffect(() => {
	// 	getStarredBoards()
	// }, [boards])

	const loadBoards = () => {
		boardService.query().then(setBoards)
	}
	console.log('user:', currUser)
	const loadUserBoards = async (num) => {
		try {
			const userBoards = await currUser.boards.map(async (userBoardId) => {
				await boardService
					.getById('board', userBoardId)
					.then((board) => setBoards((prevBoards) => [...prevBoards, board]))
			})
			// .then(console.log)setBoards((prevBoards)=>[...prevBoards, board])
		} catch {
			console.error('Cannot load Boards !')
		}
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

	const getStarredBoards = () => {
		setStaredBoards(boards?.map((board) => board.isStared))
	}

	if (!Object.keys(currUser).length) return <h1>loading...</h1>
	return (
		<section className="workspace">
			<SecondaryHeader />
			<h1>All Boards</h1>
			<section className="board-list">
				{boards.map((board, idx) => {
					return (
						<BoardPreview
							board={board}
							key={board._id + idx}
							getStarredBoards={getStarredBoards}
						/>
					)
				})}
			</section>
			<h1>
				<i className="fa-regular fa-star"></i>
				Starred Boards
			</h1>
			<section className="board-list">
				{staredBoards.map((board, idx) => {
					return (
						<BoardPreview
							board={board}
							key={board._id + idx}
							getStarredBoards={getStarredBoards}
						/>
					)
				})}
			</section>
			<h1>Templates</h1>
			<section className="board-list">
				<article className="create-preview" onClick={onSetCreateMode}>
					<h1>Create New Board</h1>
				</article>
				{templates.map((template, idx) => {
					return (
						<TemplatePreview
							template={template}
							key={template._id + idx}
							getStarredBoards={getStarredBoards}
						/>
					)
				})}
			</section>

			<h1>Recently Viewed Boards</h1>

			<CreateModal createMode={createMode} onSetCreateMode={onSetCreateMode} />
		</section>
	)
}
