import { TaskPreview } from './TaskPreview'
import React from 'react'
import { boardService } from '../services/board.service'
import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { setCurrBoard, onSaveBoard, onRemoveTask } from '../store/actions/board.actions'
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { utilService } from '../services/util.service'
import { useEffectUpdate } from './useEffectUpdate'
import { useSelector } from 'react-redux'

export const GroupPreview = ({ dragFunc, group, board, onRemoveGroup }) => {
    // console.log(group)
    const dispatch = useDispatch()
    const formRef = React.createRef()
    let onMount = useRef(true)
    const [newCardTitle, setNewCardTitle] = useState('')
    const inputRef = useRef()
    const addCardBtnRef = useRef()
    const { currBoard } = useSelector((state) => state.boardModule)
    const groupMenuRef = useRef()

    const onAddCard = async (value) => {
        // if (!newCardTitle) return  ///////plaster???????????
        const groupIdx = currBoard.groups.findIndex(
            (_group) => _group.id === group.id
        )
        const updatedBoard = { ...currBoard }
        const taskReturnd = await boardService.createTask(value)
        updatedBoard.groups[groupIdx].tasks.push(taskReturnd)
        console.log("BOARDDDDd", updatedBoard)
        await dispatch(onSaveBoard(updatedBoard))
        await dispatch(setCurrBoard(updatedBoard._id))
    }


    const onSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        onAddCard(value)
        toggleForm()
        ev.target[0].value = ''

    }


    const toggleForm = () => {
        formRef.current.classList.toggle('close')
        inputRef.current.value = ''
        inputRef.current.focus()
        addCardBtnRef.current.classList.toggle('close')

    }

    const onOpenGroupMenu = () => {
        groupMenuRef.current.classList.toggle('hide')
    }

    // const onMyDrop = (res, groupIdDest, groupIdSource) => {
    //     const groupDest = board.groups.find(_group => _group.id === groupIdDest)
    //     const groupSource = board.groups.find(_group => _group.id === groupIdSource)
    //     const taskToMove = groupSource.tasks.splice(res.source.index, 1)
    //     const groupIdxDest = board.groups.findIndex(_group => _group.id === groupIdDest)
    //     const groupIdxSour = board.groups.findIndex(_group => _group.id === groupIdSource)
    //     groupDest.tasks.splice(res.destination.index, 0, taskToMove[0])
    //     let newBoard = { ...board }
    //     newBoard.groups.splice(groupIdxDest, 1, groupDest)
    //     newBoard.groups.splice(groupIdxSour, 1, groupSource)
    //     boardService.update(newBoard)
    // }


    const handleOnDragEnd = (res) => {
        console.log(res)
        if (!res.destination) return;
        console.log("HRY");
        dragFunc(res)

    }

    const onChangeGroupTitle = async (ev) => {
        const { value } = ev.target
        const updatedBoard = await boardService.changeGroupTitle(currBoard, group, value)
        await dispatch(onSaveBoard(updatedBoard))
    }

    /////
    //TODO: ADD STYLE
    return <article className='group'>
        <input className="group-title" defaultValue={group.title} type="text" onChange={onChangeGroupTitle} onBlur={onChangeGroupTitle} />
        <Droppable droppableId={group.id} direction='vertical'>
            {(provided) => {

                return <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {group.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => {
                                return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <TaskPreview key={task.id} index={index} group={group} task={task} />
                                </div>
                            }}
                        </Draggable>
                    )
                    )}
                    {provided.placeholder}
                </div>
            }}
        </Droppable>

        <div className="add-card-btn flex" onClick={toggleForm} ref={addCardBtnRef} ><span className="plus"><i className="fa-solid fa-plus"></i></span><button > Add a card </button></div>
        <form className="add-card-form close" onSubmit={onSubmit} ref={formRef}>
            <input ref={inputRef} className="card-title" type="text" placeholder="Enter a title for this card" />
            <div className='add-card-btn'>
                <button className="save-card">Add card</button>
                <button type="button" className="close-form" onClick={toggleForm}><i className="fa-solid fa-xmark"></i></button>
            </div>
        </form>


        <div className='group-menu' onClick={onOpenGroupMenu} >
            <i   className="fa-solid fa-ellipsis"></i>
            <div ref={groupMenuRef} className='menu-modal hide'>
                <header className="menu-modal-header">
                    <span className="menu-modal-title">List actions</span>
                    <button className="close-menu-modal" ><i className="fa-solid fa-xmark"></i></button>
                </header>
                <hr />
                <div className='menu-btn'>
                    <button className='add-card-from-menu' >Add card...</button>
                    <button className='copy-list-from-menu'>Copy list...</button>
                    <button className='archive-list-from-menu' onClick={(ev) => onRemoveGroup(ev, group.id)}>Archive list...</button>
                </div>
            </div>


        </div>


    </article >
} 
