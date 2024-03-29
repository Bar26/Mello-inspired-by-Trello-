import { TaskPreview } from './TaskPreview'
import React from 'react'
import { boardService } from '../services/board.service'
import { useRef } from 'react'
import { onSaveBoard, addTask } from '../store/actions/board.actions'
import { useDispatch } from 'react-redux'
import {  Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

export const GroupPreview = ({ dragFunc, group, board, onRemoveGroup }) => {
    const dispatch = useDispatch()
    const formRef = React.createRef()
    const inputRef = useRef()
    const addTaskBtnRef = useRef()
    const { currBoard } = useSelector((state) => state.boardModule)
    const groupMenuRef = useRef()
	const { currUser } = useSelector((state) => state.userModule)

    const onAddTask = async (value) => {
        const taskTitle = value
        await dispatch(addTask(taskTitle, group, currBoard))
    }

    const onCopyGroup = async () => {
        try {
            const updatedBoard = await boardService.copyGroup(group, currBoard, currUser)
            await dispatch(onSaveBoard(updatedBoard))
        } catch (err) {
            console.log('Cant copy group', err)
        }
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        onAddTask(value)
        toggleForm()
        ev.target[0].value = ''

    }

    const toggleForm = () => {
        formRef.current.classList.toggle('close')
        inputRef.current.value = ''
        inputRef.current.focus()
        addTaskBtnRef.current.classList.toggle('close')

    }

    const onOpenGroupMenu = () => {
        groupMenuRef.current.classList.toggle('hide')
    }

    const onChangeGroupTitle = async (ev) => {
        const { value } = ev.target
        const updatedBoard = await boardService.changeGroupTitle(currBoard, group, value)
        await dispatch(onSaveBoard(updatedBoard))
    }

    return <article className='group'>
        <input className="group-title" defaultValue={group.title} type="text" onChange={onChangeGroupTitle} onBlur={onChangeGroupTitle} />
        <Droppable droppableId={group.id} direction='vertical'>
            {(provided) => {

                return <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {group.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => {
                                return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <TaskPreview key={task.id + 1000} index={index} group={group} task={task} />
                                </div>
                            }}
                        </Draggable>
                    )
                    )}
                    {provided.placeholder}
                </div>
            }}
        </Droppable>

        <div className="add-task-btn flex" onClick={toggleForm} ref={addTaskBtnRef} ><span className="plus"><i className="fa-solid fa-plus"></i></span><button > Add a card
        </button></div>
        <form className="add-task-form close" onSubmit={onSubmit} ref={formRef}>
            <input ref={inputRef} className="task-title" type="text" placeholder="Enter a title for this task" />
            <div className='add-task-btn'>
                <button className="save-task">Add card</button>
                <button type="button" className="close-form" onClick={toggleForm}><i className="fa-solid fa-xmark"></i></button>
            </div>
        </form>


        <div className='group-menu' onClick={onOpenGroupMenu} >
            <i className="fa-solid fa-ellipsis"></i>
            <div ref={groupMenuRef} className='menu-modal hide'>
                <header className="menu-modal-header">
                    <span className="menu-modal-title">List actions</span>
                    <button className="close-menu-modal" ><i className="fa-solid fa-xmark"></i></button>
                </header>
                <hr />
                <div className='menu-btn'>
                    <button className='copy-list-from-menu' onClick={onCopyGroup}>Copy list...</button>
                    <button className='archive-list-from-menu' onClick={(ev) => onRemoveGroup(ev, group)}>Archive list...</button>
                </div>
            </div>


        </div>

    </article >
} 
