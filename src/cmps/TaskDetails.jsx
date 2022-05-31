import React, { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { setCurrBoard } from '../store/actions/board.actions'
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"

import { useEffectUpdate } from "./useEffectUpdate"
import { DebounceInput } from 'react-debounce-input'

export function TaskDetails() {
    const { currBoard } = useSelector(state => state.boardModule)
    // console.log('hey ffrom det')
    const params = useParams()
    const taskId = params.taskId
    const [task, setTask] = useState({})
    const [group, setGroup] = useState({})
    const navigate = useNavigate()
    const cardDetailsRef = useRef()
    const forListenerRef = useRef()
    const forListenerUpRef = useRef()



    const [newDesc, setNewDesc] = useState(task.description || '')
    console.log(task.description)
    const newDescCopy = useRef(newDesc)
    const descInputRef = useRef()
    const descInputContainerRef = useRef()
    const descPrevRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        getGroupTask()
        if (!Object.keys(currBoard).length) {
            boardService.getById('board', params.boardId)
                .then((board) => dispatch(setCurrBoard(board)))
        }
        console.log(task.labelIds)

    }, [])

    useEffectUpdate(() => {

        onAddDesc()
    }, [newDesc])


    const onAddDesc = () => {

        boardService.saveDesc(currBoard, group.id, task.id, newDesc)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))

    }

    const toggleDescInput = () => {
        descInputContainerRef.current.classList.toggle('close')
        descPrevRef.current.classList.toggle('close')


    }


    const getGroupTask = async () => {
        try {
            const { task, group } = await boardService.getTaskGroupById(currBoard, taskId)

            setTask(task)
            setGroup(group)
        } catch (err) {
            console.log(err)
        }

    }


    const onDescSubmit = (ev) => {
        console.log('in desc submit')

        ev.preventDefault()
        const { value } = ev.target
        setNewDesc(value)



    }

    const onCloseCardDetails = () => {
        navigate(`/boards/${currBoard._id}`)

    }

    const getLabel = (labelId) => {
        if (!currBoard.labels) return
        return (currBoard.labels.find(label => label.id === labelId))
    }

    const onStartListen = () => {
        toggleDescInput()
        // forListenerUpRef.current.addEventListener('click',listenerFunc)

    }

    const listenerFunc = () => {
        toggleDescInput()
        forListenerUpRef.current.removeEventListener('click', listenerFunc)
        forListenerRef.current.removeEventListener('click', listenerFunc)
    }

    const onCancelDescChange = () => {
        setNewDesc(newDescCopy.current)
        toggleDescInput()
        forListenerUpRef.current.removeEventListener('click', listenerFunc)
        forListenerRef.current.removeEventListener('click', listenerFunc)

    }

    const onSaveDescChange = () => {
        newDescCopy.current = newDesc
        toggleDescInput()
        forListenerRef.current.removeEventListener('click')
        forListenerUpRef.current.removeEventListener('click')
    }



    if (!Object.keys(task).length || !Object.keys(group).length) return 'loading'
    return <div className="card-details" ref={cardDetailsRef}>
        {task.style &&
            <header className="card-details-header" style={{ backgroundColor: task.style.backgroundColor }}>
            </header>
        }
        <div className="main-aside-container">
            <main className="card-details-conatiner">
                <div className="forListener" ref={forListenerUpRef}>
                    <section className="card-details-title-container">
                        <div className="card-icon">O</div>
                        <section className="title-in-group">
                            <div className="title">{task.title}</div>
                            <div className="in-group">in list {group.title}</div>
                        </section>
                    </section>
                    <section className="card-details-labels">
                        <div className="labels-title">Labels</div>
                        {task.labelIds && currBoard.labels &&
                            <div className="card-details-labels-container">
                                {task.labelIds.map((labelId) => {
                                    const label = getLabel(labelId)
                                    const backgroundColor = label.backgroundColor
                                    const title = label.title
                                    return <div key={labelId} className="card-details-label"
                                        style={{ backgroundColor: backgroundColor, height: "32px", width: "68px" }}>
                                        {title}
                                    </div>
                                })}
                                <div className="card-details-add-label">+</div>
                            </div>
                        }
                    </section></div>
                <section className="description">
                    <div className="desc-icon">O</div>
                    <div className="description-content">
                        <header className="description-header">
                            <div className="title">Description</div>
                            <button className="edit-desc">Edit</button>
                        </header>


                        <div ref={descPrevRef} className="edit-prev" onClick={onStartListen} >{task.description || "Add a more detailed description..."}</div>
                        <div className="input-container close" ref={descInputContainerRef}>
                            <DebounceInput
                                element="textarea"
                                ref={descInputRef}
                                className="add-desc"
                                defaultValue={newDesc}
                                value={newDesc}
                                name="add-desc"
                                type="text"
                                debounceTimeout={300}
                                onChange={onDescSubmit}
                                placeholder={task.description || "Add a more detailed description..."}
                            />
                            <div className="desc-btn">
                                <button onClick={onSaveDescChange} className="save-desc">Save</button>
                                <button onClick={onCancelDescChange} className="cancel-change">Cancel</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="forListener" ref={forListenerRef}>

                    {/* <section className="custom-fields">
            </section> */}

                    <section className="activity-container">
                        <header className="activity-header">
                            <div className="title-icon-container">
                                <span className="activity-icon">O</span>
                                <span className="title">Activity</span>
                                <button className="show-details">Show details</button></div>
                        </header>

                        <div className="input-container">
                            <div className="user-logo-details">BE</div>
                            <input className="comment" name="comment" type="text" placeholder="Write a comment..." />
                        </div>
                    </section>


                    <section></section>

                </section>
            </main>
            <section className="add-to-card">
                <div className=""><span>Members</span></div>
                <div className=""><span>Checklist</span></div>
                <div className=""><span>Attachment</span></div>
                <div className=""><span>Cover</span></div>
                <div className=""><span>Labels</span></div>
                <div className=""><span>Dates</span></div>
                <div className=""><span>Location</span></div>
                <div className=""><span>Custom fields</span></div>
            </section>
        </div>
        <button onClick={onCloseCardDetails}>X</button>
    </div>
}