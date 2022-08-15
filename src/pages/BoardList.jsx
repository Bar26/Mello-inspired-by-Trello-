import { createRef, useEffect, useState } from 'react'
import { BoardPreview } from '../cmps/BoardPreview'
import { userService } from '../services/user.service.js'
// import { CreateModal } from '../cmps/CreateModal'
import { TemplatePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'
import { MainHeader } from '../cmps/MainHeader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setCurrUser } from '../store/actions/user.actions'
import { setCurrBoard, setCurrBoards } from '../store/actions/board.actions'
import trelloFullIcon from '../assets/img/trello-black-full.svg'
import { useLocation, useRoutes } from 'react-router-dom'
import { CreateBoardHeader } from '../cmps/createModalHeader/CreateBoardHeader'

export const BoardList = () => {
	const [boards, setBoards] = useState([])
	const [staredBoards, setStaredBoards] = useState([])
	const [templates, setTemplates] = useState([])
	const [createMode, setCreateMode] = useState('')
	const { currUser } = useSelector((state) => state.userModule)
	const { currBoard } = useSelector((state) => state.boardModule)
	const dispatch = useDispatch()

	const refCreate = createRef()
	const { users } = useSelector((state) => state.userModule)




	const calledFrom = null


	useEffect(() => {
		dispatch(getUser())
	}, [])


	useEffect(() => {
		loadTemplates()
		loadUserBoards()
		loadUserStarredBoards()
	}, [currUser])

	// useEffect(() => {
	// 	console.log('infintey');
	// 	loadUserStarredBoards()
	// }, [staredBoards])


	// const getUser = async () => {
	// 	let user = await userService.getLoggedinUser()
	// 	console.log('OnEffect', user)
	// 	dispatch(setCurrUser(user))

	// }

	// const loadGuestBoards = async () => {
	// 	Promise.all(
	// 		currUser.boards
	// 			?.map(async (userBoardId) => {
	// 				const board = await boardService.getById(userBoardId)
	// 				return board
	// 			})
	// 	)
	// 		.then((userBoards) => { setBoards(userBoards || []) })
	// }



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
						// console.log(('includes'));
							board = await boardService.getById(boardId)
							// boardService.getTemplateById(boardId)
						else board = await boardService.getTemplateById(boardId)
						console.log(board)
					return board
				})
			).then((userBoards) => {
				if (!isEqual(userBoards, staredBoards)) setStaredBoards(userBoards || [])
				// dispatch({ type: 'SET_STARRED_BOARDS', starredBoards: userBoards || [] })
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

	const onSetCreateMode = () => {
		if (!createMode.length) {
			setCreateMode('create-mode')
		} else {
			setCreateMode('')
		}
	}

	const getStarredBoards = (board) => {
		const updatedBoards = boards.map((currBoard) =>
			currBoard._id === board._id ? board : currBoard
		)
		setBoards([...updatedBoards])
	}

	const setUserBoards = async () => {
		const user = await userService.getLoggedinUser()
		await dispatch(setCurrUser(user))
		loadUserBoards()
	}

	const toggleModal = (refType) => {
		refType.current.classList.toggle('hide')
		boardService.queryTemplates().then((templates) => setTemplates(templates))
	}


	const getStarredBoardFromUser = async (boardId) => {
		// try {
		// 	const board = await boardService.getById(boardId)
		// 		.then((board) => {
		// 			return board
		// 		})
		// 	return board
		// } catch (err) {
		// 	console.log('Cannot load Boards !', err)
		// }

		console.log(staredBoards);
	}


	useEffect(() => {
		console.log('user changed in board list');
	}, [currUser])



	function isEqual(a, b) {
		console.log(a);
		console.log(b);
		return a.join() === b.join();
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
									getStarredBoards={getStarredBoards}
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
							if(currUser.boards.includes(board._id))
							return <BoardPreview board={board} />
							else
							return <TemplatePreview template={board} />

						})}
						{/* {currUser.starred.map(boardId => {
							let returnedBoard = getStarredBoardFromUser(boardId)
							console.log(returnedBoard);
							// return <BoardPreview board={currUserBoard} key={boardId}></BoardPreview>


							// .then(
							// 	console.log('starred board boardlist', currUserBoard)
							// )
							// return <BoardPreview currUserBoard={currUserBoard} key={boardId} />
							// getStarredBoards={getStarredBoards}

							// getStarredBoardFromUser(boardId)
						})} */}

					</section>}

					{/* {!!starredBoards().length && (
						<section className="board-list">
							<h3 className="stared">
								<i className="fa-regular fa-star"></i>
								Starred Boards
							</h3>
							{starredBoards().map((board, idx) => {
								return (
									<BoardPreview
										board={board}
										key={board._id + idx}
										getStarredBoards={getStarredBoards}
									/>
								)
							})}
							{starredTemplates().map((template, idx) => {
								return (
									<TemplatePreview
										template={template}
										key={template._id + idx}
									// getStarredTemplates={getStarredTemplates}
									/>
								)
							})}
						</section>
					)} */}


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

					{/* <h1>Recently Viewed Boards</h1> */}

				</div>
			</section>
		</section>
	)
}