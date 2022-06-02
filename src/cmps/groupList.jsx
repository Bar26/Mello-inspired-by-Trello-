import { GroupPreview } from "./groupPreview"
import React, { useEffect, useState, useRef } from 'react'
import { useEffectUpdate } from "./useEffectUpdate"
import { boardService } from "../services/board.service"
import { Droppable } from "react-beautiful-dnd"
import { DragDropContext } from "react-beautiful-dnd"
import { Draggable } from "react-beautiful-dnd"
import { setCurrBoard } from "../store/actions/board.actions"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"


export function GroupList() {
    const [type, setType] = useState('board')
    const dispatch = useDispatch()
    const { currBoard } = useSelector(state => state.boardModule)
    const params = useParams()
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

    useEffect(() => {
        boardService.getById(type, currBoard._id).then(setBoard)
    }, [])

    useEffectUpdate(() => {
        onAddList()
    }, [newListTitle])

	const onListSubmit = (ev) => {
		ev.preventDefault()
		const { value } = ev.target[0]
		setNewListTitle(value)
		ev.target[0].value = ''
	}

	const moveGroup = (res) => {
		let newBoard = { ...currBoard }
		const gtm = newBoard.groups.splice(res.source.index, 1)
		console.log(gtm)
		newBoard.groups.splice(res.destination.index, 0, gtm[0])
		boardService.update(newBoard)
	}

	const moveTaskInGroup = (res) => {
		const groupDest = board.groups.find(
			(_group) => _group.id === res.destination.droppableId
		)
		const groupSource = board.groups.find(
			(_group) => _group.id === res.source.droppableId
		)
		const taskToMove = groupSource.tasks.splice(res.source.index, 1)
		const groupIdxDest = board.groups.findIndex(
			(_group) => _group.id === res.destination.droppableId
		)
		const groupIdxSour = board.groups.findIndex(
			(_group) => _group.id === res.source.droppableId
		)
		groupDest.tasks.splice(res.destination.index, 0, taskToMove[0])
		let newBoard = { ...board }
		newBoard.groups.splice(groupIdxDest, 1, groupDest)
		newBoard.groups.splice(groupIdxSour, 1, groupSource)
		console.log(newBoard)
		boardService.update(newBoard)
		dispatch(setCurrBoard(board))
	}

	const handleOnDragEnd = (res) => {
		console.log(res)
		if (!res.destination) return
		if (
			res.destination.droppableId === res.source.droppableId &&
			res.destination.droppableId === board._id
		) {
			console.log('moving group')
			moveGroup(res)
		}
		if (
			res.destination.droppableId === res.source.droppableId &&
			res.destination.droppableId !== board._id
		) {
			moveTaskInGroup(res)
		}
	}
	////////לחלץ פה את הפארמס ולנסות לרנדר מחדש

	const onRemoveGroup = (ev, groupId) => {
		console.log('in on remove group')

		boardService
			.removeGroup(currBoard, groupId)
			.then(boardService.update)
			.then((board) => dispatch(setCurrBoard(board)))
	}

    const onListSubmit = (ev) => {
        ev.preventDefault()
        const { value } = ev.target[0]
        setNewListTitle(value)
        ev.target[0].value = ''

    }

    const moveGroup = (res) => {
        let newBoard = { ...currBoard }
        const gtm = newBoard.groups.splice(res.source.index, 1)
        console.log(gtm);
        newBoard.groups.splice(res.destination.index, 0, gtm[0])
        boardService.update(newBoard)
    }

    const moveTaskInGroup = (res) => {
        const groupDest = board.groups.find(_group => _group.id === res.destination.droppableId)
        const groupSource = board.groups.find(_group => _group.id === res.source.droppableId)
        const taskToMove = groupSource.tasks.splice(res.source.index, 1)
        const groupIdxDest = board.groups.findIndex(_group => _group.id === res.destination.droppableId)
        const groupIdxSour = board.groups.findIndex(_group => _group.id === res.source.droppableId)
        groupDest.tasks.splice(res.destination.index, 0, taskToMove[0])
        let newBoard = { ...board }
        newBoard.groups.splice(groupIdxDest, 1, groupDest)
        newBoard.groups.splice(groupIdxSour, 1, groupSource)
        console.log(newBoard);
        boardService.update(newBoard)
        dispatch(setCurrBoard(newBoard))
    }


    const handleOnDragEnd = (res) => {
        if (!res.destination) return;
        if (res.destination.droppableId === res.source.droppableId && res.destination.droppableId === board._id) {
            onSetIsGroupDraggable(false)
            moveGroup(res)
        }
        if (res.destination.droppableId !== board._id) {
            moveTaskInGroup(res)
        }
    }
    
    const handleDragOn = update => {
        if ('res.type' === 'gruop') {
            onSetIsGroupDraggable(true)
            onSetIsTaskDraggable(false)
        }
        else{
            onSetIsGroupDraggable(false)
            onSetIsTaskDraggable(true)
            
        }
    }

    const onSetIsTaskDraggable = (bool) => {
        setIsTaskDraggable(bool);
    }
    const onSetIsGroupDraggable = (bool) => {
        setIsGruopDraggable(bool);
        // console.log(res);
    }

    const onRemoveGroup = (ev, groupId) => {

        console.log('in on remove group');

        boardService.removeGroup(currBoard, groupId)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))

    }



    if (!Object.keys(currBoard).length) return <h1>loading...</h1>
    return <section className="groups-container">
        <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={update=>{handleDragOn(update)}} >
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
                    </div>

                }}
            </Droppable>
        </DragDropContext >
        <div className="add-list-btn flex" onClick={toggleListForm} ref={addListRef} ><span className="plus">+</span><button > Add another list </button></div>
        <form className="add-list-form close" onSubmit={onListSubmit} ref={listFormRef}>
            <input ref={inputListRef} name="list-title" type="text" placeholder="Enter list title..." />
            <button type="button" className="close-list-form" onClick={toggleListForm}>X</button>
            <button className="save-list">Add list</button>
        </form>
    </section >
}

