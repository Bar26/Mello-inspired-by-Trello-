import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { setCurrBoard, onCopyTask, onRemoveTask, onSaveBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service'
import { useNavigate, useParams } from 'react-router-dom'
import { AddMemberModal } from './MembersModal.jsx'
import { CoverTaskModal } from './CoverTaskModal'
import { DateModal } from './DateModal'


export function TaskPreview({ task, group }) {
	const coverModalRef = useRef()
	const navigate = useNavigate()
	const [style, setStyle] = useState({ height: '32px', width: '100%' })
	const { currBoard } = useSelector((state) => state.boardModule)
	const refs = useRef([])
	const params = useParams()
	const dispatch = useDispatch()
	const penRef = useRef()
	const editModalRef = useRef()
	const addMemberModalRef = useRef()
	const dateModalRef = useRef()
	const dateStyle = useRef(task.dates?.completed ? { backgroundColor: "rgb(97, 189, 79)", color: 'white', borderRadius: '3px', width: '122px' } : { backgroundColor: "" })
	const [taskPad, setTaskPad] = useState({ paddingBottom: "0" })

	useEffect(() => {
		if (task.memberIds) setTaskPad({ paddingBottom: "10px" })
	}, [])


	const onToggleMemberModal = () => {
		addMemberModalRef.current.classList.toggle('hide')
	}

	const getLabel = (labelId) => {
		if (!currBoard.labels) return
		return currBoard.labels.find((label) => label.id === labelId)
	}

	const getMember = (memberId) => {
		if (!currBoard.members) return
		return currBoard.members.find(member => member._id === memberId)
	}

	const onOpenLabel = (ev) => {
		ev.stopPropagation()
		refs.current.map((ref) => ref.classList.toggle('hide'))
	}

	const onToggleEditModal = (ev) => {
		ev.stopPropagation()
		editModalRef.current.classList.toggle('none')
	}

	const onToggleMemberToTask = async (memberId) => {
		try {
			const updatedBoard = await boardService.toggleMemberToTask(currBoard, group, task.id, memberId)
			dispatch(onSaveBoard(updatedBoard))
		} catch (err) {
			console.log('connot add member to task', err)
		}

	}

	const onToggleCoverModal = async () => {
		coverModalRef.current.classList.toggle('hide')
	}


	const toggleElement = async (inputRef) => {
		inputRef.current.classList.toggle('hide')
	}

	const onCheckBoxDueDate = async (ev) => {
		const newBoard = await boardService.checkBoxDueDate(currBoard, group, task, ev.target.checked)
		dateStyle.current = task.dates.completed ? { borderRadius: '3px', width: '122px', backgroundColor: '#61bd4f', color: 'white', } : { backgroundColor: '' }
		dispatch(onSaveBoard(newBoard))
	}


	return (
		<section
			className="task" style={taskPad}
			onClick={() => navigate(`/boards/${currBoard._id}/${task.id}`)}
		>
			<div ref={penRef} className="pen-container" onClick={onToggleEditModal}>
				<img className="pen-img" src={pen} />
			</div>
			<div ref={editModalRef} className="edit-task-modal none" onClick={ev => ev.stopPropagation()} >
				<div onClick={() => navigate(`/boards/${currBoard._id}/${task.id}`)}>
					<span className="icon task-icon"><i className="fa-solid fa-window-maximize fa-lg"></i></span>
					<span>Open Card</span>
				</div>

				<div onClick={(ev) => {
					onToggleMemberModal()

				}}
					className='edit-change-members'
				>
					<span className="icon members-icon">
						<i className="fa-regular fa-user"></i>
					</span>
					<span>Change Members</span>
					<div
						ref={addMemberModalRef}
						className="add-member-modal hide"
						onClick={(ev) => ev.stopPropagation()}
					>
						<AddMemberModal onToggleMemberModal={onToggleMemberModal}
							currBoard={currBoard}
							onToggleMemberToTask={onToggleMemberToTask}
							task={task}
							group={group}

						/>
					</div>
				</div>
				<div onClick={onToggleCoverModal} className="change-cover">
					<span className="icon cover-icon">
						<i className="fa-regular fa-window-maximize"></i>
					</span>
					<span>Change cover</span>
					<div ref={coverModalRef} className="cover-modal-container hide"
						onClick={(ev) => ev.stopPropagation()}>
						<CoverTaskModal task={task} onToggleCoverModal={onToggleCoverModal}
							currBoard={currBoard} group={group} taskId={task.id}
						/>


					</div>
				</div>

				<div onClick={(ev) => {
					dispatch(onCopyTask(ev, task, group, currBoard))
				}}>
					<span className="icon copy-icon">
						<i className="fa-regular fa-copy"></i>
					</span>
					<span>Copy</span>
				</div>
				<div onClick={() => toggleElement(dateModalRef)}>
					<span>+</span>
					<span>Edit Dates</span>
					<div ref={dateModalRef} className='date-container hide'>
						<DateModal toggleDateModal={toggleElement} board={currBoard} group={group} task={task} />
					</div>
				</div>
				<div onClick={(ev) => {
					dispatch(onRemoveTask(ev, task, group, currBoard))
				}}>
					<span className="icon trash-icon">
						<i className="fa-solid fa-box-archive"></i>
					</span>
					<span>Archive</span>
				</div>
				<div onClick={onToggleEditModal}>
					<span></span>
					<span>X</span>
				</div>
			</div>

			{task.style && task.style.backgroundColor && !task.style.isCover && (
				<>
					<div className="task-bg" style={{ ...style, background: `${task.style.backgroundColor}` }}></div>
				</>
			)}
			{task.style && task.style.isCover && (
				<>
					<div className="task-attachment-cover" style={{
						background: `url(${task.attachment.imgUrl})`, backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover', backgroundPosition: 'center', height: '160px', width: '100%', borderRadius: '3px'
					}}></div>
				</>
			)}
			<section className="task-details-content">
				{task.labelIds && currBoard.labels && (
					<div className="labels-container">
						{task.labelIds.map((labelId, idx) => {
							const label = getLabel(labelId)

							const backgroundColor = label.backgroundColor
							return (
								<div
									key={labelId + idx}
									className="label-container"
									onClick={onOpenLabel}
									style={{
										backgroundColor: backgroundColor,
										minHeight: '8px',
										minWidth: '40px',
									}}
								>
									<span
										ref={(element) => {
											refs.current[idx] = element
										}}
										className="label-title hide"
									>
										{label.title}
									</span>
								</div>
							)
						})}
					</div>
				)}

				{task.memberIds && currBoard.members && (
					<div className="members-icon-container">
						{task.memberIds.map((memberId, idx) => {
							const member = getMember(memberId)
							const src = member.imgUrl

							return (
								<div
									key={memberId + idx}
									className="member-container"
									style={{
										background: `url(${src})`,
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										height: '28px',
										width: '28px',
										borderRadius: '50%'
									}}
								>

								</div>
							)
						})}
					</div>
				)}





				<div>{task.title}</div>
				<div className='icon-preview flex'>
					{task.description && <div className="description-prev">
						<span className='fontawsome'><i className="fa-solid fa-align-left"></i></span></div>
					}

					{task.attachment && <div className="attachment-prev">
						<span className='fontawsome'><i className="fa-solid fa-paperclip"></i></span></div>
					}


					{task.checklist && <div className="checklists-prev flex">
						<span className='fontawsome'><i className="fa-regular fa-square-check"></i></span>
						<div >
							<span>
								{task.checklist.todos.filter((todo) => todo.isDone).length}
							</span>
							<span>/{task.checklist.todos.length}</span>
						</div>
					</div>
					}

					{task.dates?.dueDate &&
						<section className="due-date" style={dateStyle.current}>
							<input type='checkbox' style={{ accentColor: 'green' }} checked={task.dates?.completed} onChange={(ev) => { ev.stopPropagation(); onCheckBoxDueDate(ev) }} />
							<span>{utilService.monthName(task.dates.dueDate.slice(3, 5))} </span>
							<span>{Number(task.dates.dueDate.slice(0, 2))} </span>
							{task.dates.completed && <span>Completed</span>}
						</section>
					}
				</div>
			</section>
		</section>
	)
}
