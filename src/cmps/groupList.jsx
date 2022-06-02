import { GroupPreview } from './groupPreview'
import React, { useEffect, useState, useRef } from 'react'
import { useEffectUpdate } from './useEffectUpdate'
import { boardService } from '../services/board.service'
import { Droppable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import { setCurrBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export function GroupList() {
	const [type, setType] = useState('board')
	const dispatch = useDispatch()
	const { currBoard } = useSelector((state) => state.boardModule)
	const params = useParams()
	const [board, setBoard] = useState({})
	const listFormRef = React.createRef()
	let onMount = useRef(true)
	const [newListTitle, setNewListTitle] = useState('')
	const inputListRef = useRef()
	const addListRef = useRef()

	useEffect(() => {
		if (!Object.keys(currBoard).length) {
			boardService
				.getById( params.boardId)
				.then((board) => dispatch(setCurrBoard(board)))
		}
	}, [])

	useEffect(() => {
		boardService.getById(currBoard._id).then(setBoard)
	}, [])

	useEffectUpdate(() => {
		onAddList()
	}, [newListTitle])

	const onAddList = () => {
		const updatedBoard = { ...board }
		boardService
			.createList(newListTitle)
			.then((list) => {
				updatedBoard.groups.push(list)
				return updatedBoard
			})
			.then(boardService.update)
			.then((board) => dispatch(setCurrBoard(board)))
	}

	const toggleListForm = () => {
		listFormRef.current.classList.toggle('close')
		inputListRef.current.value = ''
		addListRef.current.classList.toggle('close')
	}

	const onListSubmit = (ev) => {
		ev.preventDefault()
		const { value } = ev.target[0]
		setNewListTitle(value)
		ev.target[0].value = ''
	}

	const onDrop = (res) => {
		let newBoard = { ...currBoard }
		const gtm = newBoard.groups.splice(res.source.index, 1)
		newBoard.groups.splice(res.destination.index, 0, gtm[0])
		boardService.update(newBoard)
	}

	const handleOnDragEnd = (res) => {
		if (!res.destination) return
		onDrop(res)
	}

	const onRemoveGroup = (ev, groupId) => {
		boardService
			.removeGroup(currBoard, groupId)
			.then(boardService.update)
			.then((board) => dispatch(setCurrBoard(board)))
	}

	if (!Object.keys(currBoard).length) return <h1>loading...</h1>
	return (
		<section className="groups-container">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId={currBoard._id}>
					{(provided) => {
						return (
							<div
								className="dnd-board-main"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{currBoard.groups.map((group, index) => (
									<Draggable
										key={group.id}
										draggableId={group.id}
										index={index}
									>
										{(provided) => {
											return (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<GroupPreview
														onRemoveGroup={onRemoveGroup}
														index={index}
														key={group.id}
														group={group}
														board={currBoard}
													/>
												</div>
											)
										}}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)
					}}
				</Droppable>
			</DragDropContext>
			<div
				className="add-list-btn flex"
				onClick={toggleListForm}
				ref={addListRef}
			>
				<span className="plus">+</span>
				<button> Add another list </button>
			</div>
			<form
				className="add-list-form close"
				onSubmit={onListSubmit}
				ref={listFormRef}
			>
				<input
					ref={inputListRef}
					name="list-title"
					type="text"
					placeholder="Enter list title..."
				/>
				<button
					type="button"
					className="close-list-form"
					onClick={toggleListForm}
				>
					X
				</button>
				<button className="save-list">Add list</button>
			</form>
		</section>
	)
}
