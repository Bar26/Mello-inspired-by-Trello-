import { GroupPreview } from './GroupPreview'
import React, { useState, useRef } from 'react'
import { boardService } from '../services/board.service'
import { Droppable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import {  onSaveBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'

export function GroupList({onChangeColorStyle}) {
    const dispatch = useDispatch()
    const { currBoard } = useSelector((state) => state.boardModule)
    const { currUser } = useSelector((state) => state.userModule)
    const listFormRef = React.createRef()
    const inputListRef = useRef()
    const addListRef = useRef()
    const [isGruopDraggable, setIsGruopDraggable] = useState(false)

    const onAddList = async (value) => {
        try {
            const updatedBoard = await boardService.createList(currBoard, value, currUser)
            await dispatch(onSaveBoard(updatedBoard))
        } catch (err) {
            console.error('cannot add list', err)
        }
    }


    const onListSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        onAddList(value)
        toggleListForm()
        ev.target[0].value = ''
    }

    const onSetIsGroupDraggable = (bool) => {
        setIsGruopDraggable(bool)
    }

    const toggleListForm = () => {
        listFormRef.current.classList.toggle('close')
        inputListRef.current.value = ''
        addListRef.current.classList.toggle('close')
        inputListRef.current.focus()
    }

    
    
    const onRemoveGroup = async (ev, group) => {
        const updatedBoard = await boardService.removeGroup(currBoard, group,currUser)
        await dispatch(onSaveBoard(updatedBoard))
    }

    

    const handleOnDragEnd = (res) => {
        if (!res.destination) return;
        if (res.destination.droppableId === res.source.droppableId && res.destination.droppableId === currBoard._id) {
            onSetIsGroupDraggable(false)
            moveGroup(res)
        }
        if (res.destination.droppableId !== currBoard._id) {
            moveTask(res)
        }
    }

    const moveGroup = async (res) => {
        let newBoard = { ...currBoard }
        const groupToMove = newBoard.groups.splice(res.source.index, 1)
        newBoard.groups.splice(res.destination.index, 0, groupToMove[0])
        await boardService.update(newBoard)
    }

    const moveTask = async (res) => {
        let newBoard = { ...currBoard }
        const groupDest = await newBoard.groups.find(_group => _group.id == res.destination.droppableId)
        const groupSrc = await newBoard.groups.find(_group => _group.id == res.source.droppableId)
        const groupIdxDest = newBoard.groups.findIndex(_group => _group.id === res.destination.droppableId)
        const groupIdxSrc = newBoard.groups.findIndex(_group => _group.id === res.source.droppableId)
        const taskToMove = groupSrc.tasks.splice(res.source.index, 1)[0]
        groupDest.tasks.splice(res.destination.index, 0, taskToMove)
        newBoard.groups.splice(groupIdxDest, 1, groupDest)
        if (res.destination.droppableId !== res.source.droppableId) newBoard.groups.splice(groupIdxSrc, 1, groupSrc)
        boardService.update(newBoard)
        await dispatch(onSaveBoard(newBoard))
    }
    
    if (!Object.keys(currBoard).length) return <h1>loading...</h1>
    return <section className="groups-container">
        <DragDropContext onDragEnd={handleOnDragEnd} >
            <Droppable isDropDisabled={isGruopDraggable} type="group" droppableId={currBoard._id} isCombineEnabled={true} direction="horizontal">
                {(provided) => {
                    return <div className="dnd-board-main"  {...provided.droppableProps} ref={provided.innerRef}>
                        {currBoard.groups.map((group, index) => (
                            <Draggable key={group.id} draggableId={group.id} index={index} type={'group'}>
                                {(provided) => {
                                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <GroupPreview onRemoveGroup={onRemoveGroup} dragFunc={handleOnDragEnd} index={index} key={group.id} group={group} board={currBoard} />
                                        {provided.placeholder}
                                    </div>
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        <div className="add-list-btn flex" onClick={toggleListForm} ref={addListRef} ><span className="plus"><i className="fa-solid fa-plus"></i></span><button > Add another list </button></div>
                        <form className="add-list-form close" onSubmit={onListSubmit} ref={listFormRef}>
                            <input ref={inputListRef} className="list-title" type="text" placeholder="Enter list title..." />
                            <div className="add-list-btn">
                                <button className="save-list">Add list</button>
                                <button type="button" className="close-list-form" onClick={toggleListForm}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </form>
                    </div>
                }}
            </Droppable>
        </DragDropContext >



    </section >
}
