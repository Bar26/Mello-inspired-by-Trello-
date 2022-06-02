import { TaskPreview } from './TaskPreview'
import React from 'react'
import { boardService } from '../services/board.service'
import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { setCurrBoard } from '../store/actions/board.actions'
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { utilService } from '../services/util.service'
import { useEffectUpdate } from './useEffectUpdate'
import { useSelector } from 'react-redux'

export const GroupPreview = ({ dragFunc, group, board }) => {
	// console.log(group)
	const dispatch = useDispatch()
	const formRef = React.createRef()
	let onMount = useRef(true)
	const [newCardTitle, setNewCardTitle] = useState('')
	const inputRef = useRef()
	const addCardBtnRef = useRef()
	const { currBoard } = useSelector((state) => state.boardModule)

	// useEffectUpdate(() => {
	//     onAddCard()
	// }, [newCardTitle])

	const onSubmit = (ev) => {
		ev.preventDefault()
		const { value } = ev.target[0]
		onAddCard(value)
		// setNewCardTitle(value)
		ev.target[0].value = ''
	}

	const onRemoveCard = (taskId) => {
		const groupIdx = board.groups.findIndex((_group) => _group.id === group.id)
		const taskIdx = board.groups[groupIdx].tasks.findIndex(
			(_task) => _task.id === taskId
		)
		const updatedBoard = { ...board }
		boardService
			.removeTask(updatedBoard, groupIdx, taskIdx)
			.then(boardService.update)
			.then((board) => dispatch(setCurrBoard(board)))
	}

	const onAddCard = (value) => {
		// if (!newCardTitle) return  ///////plaster???????????
		const groupIdx = currBoard.groups.findIndex(
			(_group) => _group.id === group.id
		)
		// console.log(groupIdx)
		const updatedBoard = { ...currBoard }
		boardService
			.createTask(value)
			.then((task) => {
				updatedBoard.groups[groupIdx].tasks.push(task)
				return updatedBoard
			})
			.then(boardService.update)
			.then((board) => dispatch(setCurrBoard(board)))
	}
	const onCopyCard = (task) => {
		const updatedBoard = { ...currBoard }
		boardService
			.copyTask(task)
			.then((task) => {
				console.log(task)
				const groupIdx = currBoard.groups.findIndex(
					(_group) => _group.id === group.id
				)
				updatedBoard.groups[groupIdx].tasks.push(task)
				return updatedBoard
			})
			.then(boardService.update)
			.then((board) => dispatch(setCurrBoard(board)))
	}

	//TODO: ADD STYLE
	return (
		<article className="group">
			<header className="group-title">{group.title}</header>

			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId={group.id}>
					{(provided) => {
						return (
							<div
								className="task-list"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{group.tasks.map((task, index) => (
									<Draggable key={task.id} draggableId={task.id} index={index}>
										{(provided) => {
											return (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<TaskPreview
														onCopyCard={onCopyCard}
														onRemoveCard={onRemoveCard}
														index={index}
														group={group}
														task={task}
														key={task.id}
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
		</article>
	)
}
