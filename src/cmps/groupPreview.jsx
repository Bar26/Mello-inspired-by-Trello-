import { TaskPreview } from "./TaskPreview"
import React from "react"
import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { setCurrBoard } from "../store/actions/board.actions"
import { useDispatch } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { utilService } from "../services/util.service"
import { useEffectUpdate } from './useEffectUpdate'
import { useSelector } from "react-redux"


export const GroupPreview = ({ dragFunc, group, board, onRemoveGroup }) => {
    // console.log(group)
    const dispatch = useDispatch()
    const formRef = React.createRef()
    let onMount = useRef(true)
    const [newCardTitle, setNewCardTitle] = useState('')
    const inputRef = useRef()
    const addCardBtnRef = useRef()
    const { currBoard } = useSelector(state => state.boardModule)



    const onSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        onAddCard(value)
        // setNewCardTitle(value)
        ev.target[0].value = ''

    }



    const onAddCard = (value) => {
        // if (!newCardTitle) return  ///////plaster???????????
        const groupIdx = currBoard.groups.findIndex(_group => _group.id === group.id)
        const updatedBoard = { ...currBoard }
        boardService.createTask(value)
            .then((task) => {
                updatedBoard.groups[groupIdx].tasks.push(task)
                return updatedBoard
            })
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))

    }
    const onCopyCard = (task) => {
        const updatedBoard = { ...currBoard }
        boardService.copyTask(task)
            .then((task) => {
                console.log(task)
                const groupIdx = currBoard.groups.findIndex(_group => _group.id === group.id)
                updatedBoard.groups[groupIdx].tasks.push(task)
                return updatedBoard
            })
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))
    }

    const toggleForm = () => {
        formRef.current.classList.toggle('close')
        inputRef.current.value = ''
        addCardBtnRef.current.classList.toggle('close')

    }

    const onRemoveCard = (taskId) => {
        const groupIdx = currBoard.groups.findIndex(_group => _group.id === group.id)
        const taskIdx = currBoard.groups[groupIdx].tasks.findIndex(_task => _task.id === taskId)
        // console.log(groupIdx)
        const updatedBoard = { ...currBoard }
        boardService.removeTask(updatedBoard, groupIdx, taskIdx)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))
    }

    const onMyDrop = (res, groupIdDest, groupIdSource) => {
        const groupDest = board.groups.find(_group => _group.id === groupIdDest)
        const groupSource = board.groups.find(_group => _group.id === groupIdSource)
        const taskToMove = groupSource.tasks.splice(res.source.index, 1)
        const groupIdxDest = board.groups.findIndex(_group => _group.id === groupIdDest)
        const groupIdxSour = board.groups.findIndex(_group => _group.id === groupIdSource)
        groupDest.tasks.splice(res.destination.index, 0, taskToMove[0])
        let newBoard = { ...board }
        newBoard.groups.splice(groupIdxDest, 1, groupDest)
        newBoard.groups.splice(groupIdxSour, 1, groupSource)
        boardService.update(newBoard)
    }


    const handleOnDragEnd = (res) => {
        console.log(res)
        if (!res.destination) return;
        console.log("HRY");
        dragFunc(res)

    }

    const onChangeGroupTitle = (ev) => {
        const { value } = ev.target
        boardService.changeGroupTitle(currBoard, group, value)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))
    }

    /////
    //TODO: ADD STYLE
    return <article className='group'>
            <input className="group-title" defaultValue={group.title} type="text" onChange={onChangeGroupTitle} onBlur={onChangeGroupTitle} />
        <Droppable  droppableId={group.id} direction='vertical'>
            {(provided) => {

                {/* <DragDropContext onDragEnd={handleOnDragEnd}> */ }
                return <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {group.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => {
                                return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <TaskPreview key={task.id} onCopyCard={onCopyCard} onRemoveCard={onRemoveCard} index={index} group={group} task={task} key={task.id} />
                                </div>
                            }}
                        </Draggable>
                    )
                    )}
                    {provided.placeholder}
                </div>
                {/* </DragDropContext> */ }
            }}
        </Droppable>

        <div className="add-card-btn flex" onClick={toggleForm} ref={addCardBtnRef} ><span className="plus">+</span><button > Add a card </button></div>
        <form className="add-card-form close" onSubmit={onSubmit} ref={formRef}>
            <input ref={inputRef} name="card-title" type="text" placeholder="Enter a title for this card" />
            <button type="button" className="close-form" onClick={toggleForm}>X</button>
            <button className="save-card">Add card</button>
        </form>
        {/* <button onClick={(ev) => onRemoveGroup(ev,group.id)} className="remove-group">X</button> */}




    </article>
}