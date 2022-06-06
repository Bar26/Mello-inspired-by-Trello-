import { useEffect, useState } from 'react'
import { BoardPreview } from '../cmps/BoardPreview'
import { userService } from '../services/user.service.js'
import { CreateModal } from '../cmps/createModal'
import { TemplatePreview } from '../cmps/TempletePreview'
import { boardService } from '../services/board.service.js'
import { SecondaryHeader } from '../cmps/MainHeader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrUser } from '../store/actions/user.actions'
import { setCurrBoard } from '../store/actions/board.actions'

export const BoardList = () => {
	const [boards, setBoards] = useState([])
	// const [staredBoards, setStaredBoards] = useState([])
	const [templates, setTemplates] = useState([])
	const [createMode, setCreateMode] = useState('')
	const { currUser } = useSelector((state) => state.userModule)
	const { currBoard } = useSelector((state) => state.boardModule)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!Object.keys(currUser).length) {
			setUserBoards()
		}
	}, [])
	useEffect(() => {
		console.log('currUser:', currUser)
		loadTemplates()
		if (currUser.name !== 'Guest') loadUserBoards()
		else loadGuestBoards()
	}, [currUser])

	const loadGuestBoards = async () => {
		Promise.all(
			currUser.boards
				?.map(async (userBoardId) => {
					console.log('userBoardId', userBoardId)
					const board = await boardService.getById(userBoardId)
					return board
				})
				)
				.then((userBoards) => {setBoards(userBoards || [])})
	}

	useEffect(() => {
		console.log('currBoard in store:', currBoard)
	}, [currBoard])

	const loadUserBoards = async () => {
		if (!Object.keys(currUser).length || !currUser.boards) return
		try {
			Promise.all(
				currUser.boards?.map(async (userBoardId) => {
					console.log('userBoardId', userBoardId)
					const board = await boardService.getById(userBoardId)
					return board
				})
			).then((userBoards) => {
				setBoards(userBoards || [])
			})
		} catch (err) {
			console.log('Cannot load Boards !', err)
		}
	}
	const loadTemplates = async () => {
		try {
			const templatesT = await boardService.queryTemplates()
			console.log("LIOISSSO", templatesT);
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
		console.log('logged in user boardList 81:', user)
		await dispatch(setCurrUser(user))
		loadUserBoards()
	}
	const starredBoards = () => {
		return boards.filter((board) => board.isStared)
	}
	if (!Object.keys(currUser).length) return <h1>loading...</h1>
	return (
		<section className="workspace">
			<SecondaryHeader />
			<div className='workspace-board-list'>
				<h2>All Boards</h2>
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
				<h2>
					<i className="fa-regular fa-star"></i>
					Starred Boards
				</h2>
				{!!starredBoards().length && (
					<section className="board-list">
						{starredBoards().map((board, idx) => {
							return (
								<BoardPreview
									board={board}
									key={board._id + idx}
									getStarredBoards={getStarredBoards}
								/>
							)
						})}
					</section>
				)}
				<h2>Most popular templates</h2>
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

				{/* <h1>Recently Viewed Boards</h1> */}

				<CreateModal createMode={createMode} onSetCreateMode={onSetCreateMode} />
			</div>
		</section>
	)
}
