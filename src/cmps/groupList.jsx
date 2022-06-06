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
    const [type, setType] = useState('board')
    const dispatch = useDispatch()
    const { currBoard } = useSelector((state) => state.boardModule)
    const { boardId } = useParams()
    const [board, setBoard] = useState({})
    const listFormRef = React.createRef()
    const [newListTitle, setNewListTitle] = useState('')
    const inputListRef = useRef()
    const addListRef = useRef()
    const [isGruopDraggable, setIsGruopDraggable] = useState(false)
    const [isTaskDraggable, setIsTaskDraggable] = useState(false)

    useEffect(() => {
        boardService.getById(currBoard._id).then(setBoard)
    }, [])

    // useEffectUpdate(() => {
    // 	onAddList()
    // }, [newListTitle])

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

    // useEffectUpdate(() => {
    // 	onAddList()
    // }, [newListTitle])

    const onListSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        // setNewListTitle(value)
        onAddList(value)
        ev.target[0].value = ''
    }


    const onSetIsTaskDraggable = (bool) => {
        setIsTaskDraggable(bool)
    }
    const onSetIsGroupDraggable = (bool) => {
        setIsGruopDraggable(bool)
    }

    const toggleListForm = () => {
        listFormRef.current.classList.toggle('close')
        inputListRef.current.value = ''
        addListRef.current.classList.toggle('close')
    }
    
    const moveGroup = async (res) => {
        console.log('ONMOVEGROUP')
        let newBoard = { ...currBoard }
        const gtm = newBoard.groups.splice(res.source.index, 1)
        console.log(gtm);
        newBoard.groups.splice(res.destination.index, 0, gtm[0])
        const ASA = await boardService.update(newBoard)
        console.log(ASA);
        console.log(currBoard);
    }

    const moveTaskInGroup = async (res) => {
        let newBoard = { ...currBoard }
        const groupDest = await currBoard.groups.find(_group => _group.id == res.destination.droppableId)
        const groupSource = await currBoard.groups.find(_group => _group.id == res.source.droppableId)
        const groupIdxDest = currBoard.groups.findIndex(_group => _group.id === res.destination.droppableId)
        const groupIdxSour = currBoard.groups.findIndex(_group => _group.id === res.source.draggableId)
        if(res.destination.droppableId === res.source.droppableId){
            const taskToMove = groupSource.tasks.splice(res.source.index, 1)
            groupDest.tasks.splice(res.destination.index, 0, taskToMove[0])
            newBoard.groups.splice(groupIdxDest, 1, groupDest)
        }
        if (res.destination.droppableId !== res.source.droppableId){
            const taskToMove = groupSource.tasks.splice(res.source.index, 1)
            groupDest.tasks.splice(res.destination.index, 0, taskToMove[0])
            newBoard.groups.splice(groupIdxSour, 1, groupSource)
            newBoard.groups.splice(groupIdxDest, 1, groupDest)
        } 
        setBoard(newBoard)
        boardService.update(newBoard)
    }


    const handleOnDragEnd = (res) => {
        if (!res.destination) return;
        if (res.destination.droppableId === res.source.droppableId && res.destination.droppableId === board._id) {
            console.log("in Group Move");
            onSetIsGroupDraggable(false)
            moveGroup(res)
        }
        if (res.destination.droppableId !== board._id) {
            moveTaskInGroup(res)
        }
    }


    ////////////????? check for string
    const handleDragOn = update => {
        if ('res.type' === 'gruop') {
            onSetIsGroupDraggable(true)
            onSetIsTaskDraggable(false)
        }
        else {
            onSetIsGroupDraggable(false)
            onSetIsTaskDraggable(true)

        }
    }


    const onRemoveGroup = async (ev, groupId) => {
        const updatedBoard = await boardService.removeGroup(currBoard, groupId)
        await dispatch(onSaveBoard(updatedBoard))
        await dispatch(setCurrBoard(updatedBoard._id))
    }




    if (!Object.keys(currBoard).length) return <h1>loading...</h1>
    return <section className="groups-container">
        <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={update => { handleDragOn(update) }} >
            <Droppable isDropDisabled={isGruopDraggable} type='group' droppableId={currBoard._id} isCombineEnabled={true} direction="horizontal">
                {(provided) => {
                    return <div className="dnd-board-main"  {...provided.droppableProps} ref={provided.innerRef}>
                        {currBoard.groups.map((group, index) => (
                            <Draggable key={group.id} draggableId={group.id} index={index} type={'group'}>
                                {(provided) => {
                                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <GroupPreview ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onRemoveGroup={onRemoveGroup} dragFunc={handleOnDragEnd} index={index} key={group.id} group={group} board={currBoard} />
                                        {provided.placeholder}
                                    </div>
                                }}
                            </Draggable>

                        ))}

                        {provided.placeholder}
                        <div className="add-list-btn flex" onClick={toggleListForm} ref={addListRef} ><span className="plus">+</span><button > Add another list </button></div>
                        <form className="add-list-form close" onSubmit={onListSubmit} ref={listFormRef}>
                            <input ref={inputListRef} name="list-title" type="text" placeholder="Enter list title..." />
                            <button type="button" className="close-list-form" onClick={toggleListForm}>X</button>
                            <button className="save-list">Add list</button>
                        </form>
                    </div>

                }}
            </Droppable>
        </DragDropContext >

    </section >
}
