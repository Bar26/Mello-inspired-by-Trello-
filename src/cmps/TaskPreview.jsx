// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { setCurrBoard,onCopyTask,onRemoveTask,onSaveBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service'
import { useNavigate, useParams } from 'react-router-dom'
import { AddMemberModal } from './MembersModal.jsx'


export function TaskPreview({ task, group}) {
	const navigate = useNavigate()
	const [date, setDate] = useState(new Date())
	const [style, setStyle] = useState({ height: '32px', width: '100%' })
	const { currBoard } = useSelector((state) => state.boardModule)
	const refs = useRef([])
	const params = useParams()
	const dispatch = useDispatch()
	const penRef = useRef()
	const [isLabel, setIsLabel] = useState(false)
	const editModalRef = useRef()
	const addMemberModalRef = useRef()

	useEffect(() => {
		if (!Object.keys(currBoard).length) {
			boardService
				.getById('board', params.boardId)
				.then((board) => dispatch(setCurrBoard(board)))
		}
	})

	useEffect(() => {
		if (!Object.keys(currBoard).length) {
			boardService
				.getById('board', params.boardId)
				.then((board) => dispatch(setCurrBoard(board)))

			if (!task.labelIds) penRef.current.classList.add('noLabel')
		}
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
		editModalRef.current.classList.toggle('hide')
	}

	const onToggleMemberToTask = async (memberId) => {
        console.log('in togglemember')
        try {
            const updatedBoard = await boardService.toggleMemberToTask(currBoard, group, task.id, memberId)
            await dispatch(onSaveBoard(updatedBoard))
        } catch (err) {
            console.log('connot add member to task', err)
        }

    }

	return (
		<section
			className="task"
			onClick={() => navigate(`/boards/${currBoard._id}/${task.id}`)}
		>
			<div ref={penRef} className="pen-container" onClick={onToggleEditModal}>
				<img className="pen-img" src={pen} />
			</div>
			<div ref={editModalRef} className="edit-card-modal hide">
				<div>
					<span>+</span>
					<span>Open Modal</span>
				</div>
				<div>
					<span>+</span>
					<span>Edit labels</span>
				</div>
				<div onClick={(ev)=>{
					ev.stopPropagation()
					onToggleMemberModal()
					// addMemberModalRef.current.style.right="100%"
					// addMemberModalRef.current.style.bottom="100px"
					}} >
					<span>+</span>
					<span>Change Members</span>
					<div
                                ref={addMemberModalRef}
                                className="add-member-modal hide"
                                onClick={(ev) => ev.stopPropagation()}
                            >
                                <AddMemberModal onToggleMemberModal={onToggleMemberModal}
                                    currBoard={currBoard}
                                    onToggleMemberToTask={onToggleMemberToTask}
                                    task={task} />
                            </div>
				</div>
				<div>
					<span>+</span>
					<span>Change cover</span>
				</div>
				<div>
					<span>+</span>
					<span>Move</span>
				</div>
				<div onClick={(ev) =>{
					ev.stopPropagation()
					dispatch(onCopyTask(ev,task,group, currBoard))}}>
					<span>+</span>
					<span>Copy</span>
				</div>
				<div>
					<span>+</span>
					<span>Edit Dates</span>
				</div>
				<div onClick={(ev) =>{ 
					ev.stopPropagation()
					dispatch(onRemoveTask(ev,task.id,group, currBoard))
				}}>
					<span>+</span>
					<span>Archive</span>
				</div>
				<div onClick={onToggleEditModal}>
					<span></span>
					<span>X</span>
				</div>
			</div>

			{task.style && task.style.backgroundColor && (
				<>
					{/* {()=>onChangePad()} */}
					<div className="task-bg" style={{ ...style, background:`${task.style.backgroundColor}`}}></div>
				</>
			)}
			{task.style && task.style.isCover && (
				<>
					{/* {()=>onChangePad()} */}{console.log(task.attachment.imgUrl)}
					<div className="task-attachment-cover" style={{background:`url(${task.attachment.imgUrl})`,backgroundRepeat:'no-repeat',
					backgroundSize:'cover', backgroundPosition:'center',height:'160px',width:'100%', borderRadius:'3px' }}></div>
				</>
			)}
			<section className="task-details">
				{task.labelIds && currBoard.labels && (
					<div className="labels-container">
						{task.labelIds.map((labelId, idx) => {
							const label = getLabel(labelId)

							const backgroundColor = label.backgroundColor
							const title = label.title
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
					<div className="members-container">
						{task.memberIds.map((memberId, idx) => {
							const member = getMember(memberId)
							const src = member.imgUrl

							return (
								<div
								key={memberId+idx}
								className="member-container"
								// onClick={onOpenMember}
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
									{/* <span
										ref={(element) => {
											refs.current[idx] = element
										}}
										className="label-title hide"
									>
										{label.title}
									</span> */}
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

					{task.dueDate && (
						<section className="due-date">
							<span>{utilService.getMonthName(date)} </span>
							<span>{date?.getDate().toString()}</span>
						</section>
					)}
				</div>
			</section>
		</section>
	)
}
