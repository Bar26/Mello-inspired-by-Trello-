import { GroupPreview } from './groupPreview'
import React, { useEffect, useState, useRef } from 'react'
import { useEffectUpdate } from './useEffectUpdate'
import { boardService } from '../services/board.service'
import { Droppable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import { setCurrBoard, onSaveBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export function GroupList() {
    const dispatch = useDispatch()
    const { currBoard } = useSelector((state) => state.boardModule)
    const { boardId } = useParams()
    const [board, setBoard] = useState({...currBoard})
    const listFormRef = React.createRef()
    const inputListRef = useRef()
    const addListRef = useRef()
    const [isGruopDraggable, setIsGruopDraggable] = useState(false)

    useEffect(() => {
        boardService.getById(currBoard._id).then(setBoard)
    }, [])

    const onAddList = async (value) => {
        try {
            const updatedBoard = await boardService.createList(currBoard, value)
            await dispatch(onSaveBoard(updatedBoard))
            // await dispatch(setCurrBoard(updatedBoard._id))
            setBoard(updatedBoard)
        } catch (err) {
            console.error('cannot add list', err)
        }
    }

    useEffect(() => {
        boardService.getById(boardId).then(setBoard)
    }, [])

    const onListSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        // setNewListTitle(value)
        onAddList(value)
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

    
    
    const onRemoveGroup = async (ev, groupId) => {
        const updatedBoard = await boardService.removeGroup(currBoard, groupId)
        await dispatch(onSaveBoard(updatedBoard))
        await dispatch(setCurrBoard(updatedBoard._id))
    }

    

    const handleOnDragEnd = (res) => {
        if (!res.destination) return;
        if (res.destination.droppableId === res.source.droppableId && res.destination.droppableId === board._id) {
            onSetIsGroupDraggable(false)
            moveGroup(res)
        }
        if (res.destination.droppableId !== board._id) {
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
        boardService.update(ASAnewBoard)
        await dispatch(onSaveBoard(newBoard))
    }
    
    if (!Object.keys(currBoard).length) return <h1>loading...</h1>
    return <section className="groups-container">
        <DragDropContext onDragEnd={handleOnDragEnd} >
            <Droppable isDropDisabled={isGruopDraggable} type='group' droppableId={currBoard._id} isCombineEnabled={true} direction="horizontal">
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
                            <div className='add-list-btn'>
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
