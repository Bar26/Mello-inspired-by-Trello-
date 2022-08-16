import { createRef, useEffect, useState } from 'react'
import { BoardPreview } from '../cmps/BoardPreview'
import { TemplatePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'
import { MainHeader } from '../cmps/MainHeader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/actions/user.actions'
import trelloFullIcon from '../assets/img/trello-black-full.svg'
import { CreateBoardHeader } from '../cmps/createModalHeader/CreateBoardHeader'

export const BoardList = () => {
	const [boards, setBoards] = useState([])
	const [staredBoards, setStaredBoards] = useState([])
	const [templates, setTemplates] = useState([])
	const { currUser } = useSelector((state) => state.userModule)
	const dispatch = useDispatch()
	const refCreate = createRef()

	useEffect(() => {
		dispatch(getUser())
	}, [])


	useEffect(() => {
		console.log(currUser);
		loadTemplates()
		loadUserBoards()
		loadUserStarredBoards()
	}, [currUser])


	const loadUserBoards = async () => {
		if (!Object.keys(currUser).length || !currUser.boards) return
		try {
			Promise.all(
				currUser.boards?.map(async (userBoardId) => {
					const board = await boardService.getById(userBoardId)
					return board
				})
			).then((userBoards) => {
				setBoards(userBoards || [])
				dispatch({ type: 'SET_BOARDS', boards: userBoards || [] })
			})
		} catch (err) {
			console.log('Cannot load Boards !', err)
		}
	}

	const loadUserStarredBoards = async () => {
		if (!currUser.starred?.length) return
		try {
			Promise.all(
				currUser.starred?.map(async (boardId) => {
					let board
					if (currUser.boards.includes(boardId))
							board = await boardService.getById(boardId)
						else board = await boardService.getTemplateById(boardId)
					return board
				})
			).then((userBoards) => {
				setStaredBoards(userBoards || [])
			})
		} catch (err) {
			console.log('Cannot load Boards !', err)
		}
	}





	const loadTemplates = async () => {
		try {
			const templatesT = await boardService.queryTemplates()
			setTemplates(templatesT)
		} catch (err) {
			console.error('error query templetes', err)
		}
	}

	const getStarredBoards = (board) => {
		const updatedBoards = boards.map((currBoard) =>
			currBoard._id === board._id ? board : currBoard
		)
		setBoards([...updatedBoards])
	}

	const toggleModal = (refType) => {
		refType.current.classList.toggle('hide')
		boardService.queryTemplates().then((templates) => setTemplates(templates))
	}



	if (!Object.keys(currUser).length) return <div className="loader"></div>
	return (
		<section className="board-list-container">
			<MainHeader staredBoards={staredBoards} />
			<section className="container">
				<div className="workspace-board-list">
					<section className="board-list">
						<h3 className="workspace">
							Your workpace
						</h3>
						{boards.map((board, idx) => {
							return (
								<BoardPreview
									board={board}
									key={board._id + idx}
								/>
							)
						})}
					</section>


					{!!currUser.starred?.length && <section className="board-list">
						<h3 className="stared">
							<i className="fa-regular fa-star"></i>
							Starred Boards
						</h3>
						{staredBoards.map(board => {
							if (currUser.boards.includes(board._id))
								return <BoardPreview board={board} setStaredBoards={setStaredBoards}
									loadUserStarredBoards={loadUserStarredBoards}  />
							else
								return <TemplatePreview template={board} />
						})}

					</section>}


					<section className="board-list">
						<h3 className="templates">
							<img className="full-icon" src={trelloFullIcon} />
							Most popular templates</h3>
						<article className="create-preview" onClick={() => toggleModal(refCreate)}>
							<h1>Create New Board</h1>
							<section onClick={(ev) => { ev.stopPropagation() }} ref={refCreate} className='create-container hide'>
								<button className="closebtn" onClick={() => toggleModal(refCreate)}>
									<svg
										stroke="currentColor"
										fill="currentColor"
										strokeWidth="0"
										viewBox="0 0 24 24"
										className="btn-content"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill="none"
											stroke="#000"
											strokeWidth="2"
											d="M3,3 L21,21 M3,21 L21,3"
										></path>
									</svg>
								</button>

								<h1>Create New Board</h1>
								<hr />
								<CreateBoardHeader></CreateBoardHeader>

							</section>
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

				</div>
			</section>
		</section>
	)
}