import { TaskPreview } from "./TaskPreview"
import React from "react"
import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState, useRef } from 'react'

export const GroupPreview = ({ group, board }) => {
    console.log(group)
    const formRef = React.createRef()
    let onMount = useRef()
    const [newCardTitle, setNewCardTitle] = useState('')

    useEffect(() => {
        console.log(onMount)
        if (!onMount.current) onMount.current = true
        else onAddCard()
    }, [newCardTitle])


    const onSubmit = (ev) => {
        console.log('in onsubmit')
        ev.preventDefault()
        console.log('adding card')
        console.log(ev.target[0]);           ////????????????
        const { value } = ev.target[0]
        console.log(value);
        setNewCardTitle(value)
    }

    const onAddCard = () => {
        console.log(newCardTitle)
        // console.log(board.groups)
        const groupIdx = board.groups.findIndex(_group => _group.id === group.id)
        console.log(groupIdx)
        const updatedBoard = { ...board }
        boardService.createTask(newCardTitle)
            .then((task) =>{
                updatedBoard.groups[groupIdx].tasks.push(task)
                return updatedBoard
            } )
            .then(boardService.update)

    }

    const toggleForm = () => {
        formRef.current.classList.toggle('close')
    }

    // const handleChange = ({ target }) => {
    //     // const value = target.type === 'number' ? (+target.value || '') : target.value
    //     const value = target.value
    //     setNewCardTitle({value })
    // }

    //TODO: ADD STYLE
    return <article className='group'>
        <header className='group-title'>
            {group.title}
        </header>

        <div className="task-list">
            {group.tasks.map(task => <TaskPreview task={task} key={task.id} />)}
        </div>

        <button className="add-card-btn" onClick={toggleForm}>+ Add a card </button>
        <form className="add-card-form close" onSubmit={onSubmit} ref={formRef}>
            <input name="card-title" type="text" placeholder="Enter a title for this card" />
        </form>


    </article>
}