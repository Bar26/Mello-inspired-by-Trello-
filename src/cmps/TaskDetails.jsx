import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"
import { setCurrBoard, setIsTaskDetailsScreenOpen } from "../store/actions/board.actions"


export function TaskDetails() {
    const { currBoard } = useSelector(state => state.boardModule)
    const dispatch = useDispatch()
    const params = useParams()
    const taskId = params.taskId
    const [task, setTask] = useState({})
    const [group, setGroup] = useState({})
    const navigate = useNavigate()
    const cardDetailsRef = useRef()
    const forListenerRef = useRef()
    const forListenerUpRef = useRef()
    const penRef = useRef()
    const editLabelModalRef = useRef()
    const descInputRef = useRef()
    const descInputContainerRef = useRef()
    const descPrevRef = useRef()
    const addLabelModalRef = useRef()
    const createLabelRef = useRef()
    const [newLabelColor, setNewLabelColor] = useState('#61bd4f')
    const [newLabelTitle, setNewLabelTitle] = useState()

    const palette = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0',
        '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563']


    useEffect(() => {
        getGroupTask()
        if (!Object.keys(currBoard).length) {
            boardService.getById('board', params.boardId)
                .then((board) => dispatch(setCurrBoard(board)))
        }
        console.log(task.labelIds)

    }, [])

    // useEffect(() => {

    // }, [newLabelColor])

    // useEffectUpdate(() => {


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
        toggleDescInput()
        boardService.saveDesc(currBoard, group.id, task.id, value)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))



    }

    const onCloseCardDetails = () => {
        navigate(`/boards/${currBoard._id}`)

    }

    const getLabel = (labelId) => {
        if (!currBoard.labels) return
        return (currBoard.labels.find(label => label.id === labelId))
    }



    const onCancelDescChange = () => {
        console.log('in cancel')
        toggleDescInput()
        descInputRef.current.value = ''
    }

    const onChangeCardTitle = (ev) => {
        const { value } = ev.target
        boardService.changeCardTitle(currBoard, group, taskId, value)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))
    }

    const onToggleLabelModal = () => {
        addLabelModalRef.current.classList.toggle('hide')
        addLabelModalRef.current.focus()
        // dispatch(setIsTaskDetailsScreenOpen(true))
    }

    const onToggleEditLabelModal = (ev) => {
        ev.stopPropagation()
        addLabelModalRef.current.classList.toggle('hide')
        editLabelModalRef.current.classList.toggle('hide')
    }

    const onToggleLabelToTask = (labelId) => {
        boardService.toggleLabelToTask(currBoard, group, taskId, labelId)
            .then(boardService.update)
            .then((board) => dispatch(setCurrBoard(board)))
    }

    const onSearchLabel = () => {

    }

    const onSaveNewLabel = () => {
        console.log(newLabelColor,newLabelTitle)
        boardService.createLabel(currBoard,group,task, newLabelColor,newLabelTitle)
        .then(boardService.update)
        .then((board) => dispatch(setCurrBoard(board)))
        onToggleCreateLabelModal()
    }

    const onToggleCreateLabelModal = () => {
        createLabelRef.current.classList.toggle('hide')
        addLabelModalRef.current.classList.toggle('hide')
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
                            <input className="details-group-title" defaultValue={task.title} type="text" onChange={onChangeCardTitle} />
                            <div className="in-group">in list <span className="list-name">{group.title}</span></div>
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
                                <section className="add-label-container" >
                                    <div onClick={onToggleLabelModal} className="card-details-add-label">+</div>
                                    <div ref={addLabelModalRef} className="add-label-modal hide" contentEditable >
                                        {/* onBlur={onToggleLabelModal} */}
                                        <header className="add-label-modal-header">
                                            <span className="add-label-modal-title">Labels</span>
                                            <button onClick={onToggleLabelModal} className="close-label-modal" >X</button>
                                        </header>
                                        <hr />
                                        <input onClick={onSearchLabel} className="search-label" placeholder="Search labels..." />
                                        <div className="labels-container">
                                            <span className="labels-title">Labels</span>
                                            <div className="labels-list">
                                                {
                                                    currBoard.labels.map(label => {
                                                        const backgroundColor = label.backgroundColor
                                                        const title = label.title
                                                        return <section className="label-in-modal-container">
                                                            <div key={label.id} className="label-in-modal" onClick={() => onToggleLabelToTask(label.id)}
                                                                style={{ backgroundColor: backgroundColor, height: "32px" }}>
                                                                {title}
                                                                {task.labelIds.includes(label.id) &&
                                                                    <div className="label-indication">✔</div>}
                                                            </div>
                                                            <div ref={penRef} className="edit-label" onClick={onToggleEditLabelModal}>
                                                                <img className="pen-img" src={pen} />
                                                                <div ref={editLabelModalRef} className="edit-label-modal hide"></div>

                                                            </div>
                                                        </section>
                                                    })
                                                }
                                            </div>

                                            <button onClick={onToggleCreateLabelModal} className="add-label-btn">Create a new label</button>
                                        </div>

                                    </div>



                                    <div ref={createLabelRef} className="create-label-modal-container hide">
                                        <header className="create-label-modal-header">
                                            <span className="go-back-to-label-modal">*</span>
                                            <span className="create-label-modal-title">Create label</span>
                                            <button onClick={onToggleCreateLabelModal} className="close-label-modal" >X</button>
                                        </header>
                                        <hr />
                                        <label className="create-label-label">Name
                                            <input className="create-label-input" type="text" onChange={(ev) => setNewLabelTitle(ev.target.value)} onBlur={(ev) => setNewLabelTitle(ev.target.value)} />
                                        </label>
                                        <div className="select-color-title">Select a color</div>
                                        <div className="colors-for-select">
                                            {palette.map(clr => {
                                                console.log(clr)
                                                return <div onClick={() => setNewLabelColor(clr)} className="label-color" style={{ backgroundColor: clr }}>
                                                    {newLabelColor === clr && <div>✔</div>}
                                                </div>
                                            })}
                                        </div>
                                        <button onClick={onSaveNewLabel} className="save-label">Create</button>



                                    </div>



                                </section>

                            </div>
                        }
                    </section></div>
                <section className="description">
                    <div className="desc-icon">O</div>
                    <div className="description-content">
                        <header className="description-header">
                            <div className="desc-title">Description</div>
                            <button className="edit-desc">Edit</button>
                        </header>


                        <div ref={descPrevRef} className="edit-prev" onClick={toggleDescInput} >{task.description || "Add a more detailed description..."}</div>
                        <div className="input-container close" ref={descInputContainerRef}>
                            <form onSubmit={onDescSubmit} onBlur={onDescSubmit}>
                                <textarea
                                    ref={descInputRef}
                                    className="add-desc"
                                    defaultValue={task.description || ''}
                                    name="add-desc"
                                    type="text"
                                    onSubmit={onDescSubmit}
                                    placeholder={task.description || "Add a more detailed description..."}
                                // onBlur={onDescSubmit}
                                />


                                <div className="desc-btn">
                                    <button className="save-desc">Save</button>
                                    <button type="button" onClick={(ev) => {
                                        ev.stopPropagation()
                                        onCancelDescChange(ev)
                                    }} className="cancel-change">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>


                {/* <section className="custom-fields">
            </section> */}

                <section className="activity-container">
                    <header className="activity-header">
                        <div className="title-icon-container">
                            <span className="activity-icon">O</span>
                            <span className="activity-title">Activity</span></div>
                        <button className="show-details">Show details</button>
                    </header>

                    <div className="input-container">
                        <div className="user-logo-details">BE</div>
                        <input className="comment" name="comment" type="text" placeholder="Write a comment..." />
                    </div>
                </section>


                <section></section>

            </main>
            <section className="details-aside">
                <section className="add-to-card"><span className="add-to-card-title" >Add to card</span>
                    <div className=""><span className=""><i class="fa-regular fa-user"></i></span><span>Members</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-tag"></i></span><span>Labels</span></div>
                    <div className=""><span className=""><i class="fa-regular fa-square-check"></i></span><span>Checklist</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-paperclip"></i></span><span>Attachment</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-tv"></i></span><span>Cover</span></div>
                    <div className=""><span className=""><i class="fa-regular fa-clock"></i></span><span>Dates</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-location-dot"></i></span><span>Location</span></div>
                    <div className=""><span className=""><i class="fa-regular fa-pen-field"></i></span><span>Custom fields</span></div>
                </section>
                <section className="card-details-actions"><span className="actions-title" >Actions</span>
                    <div className=""><span className=""><i class="fa-solid fa-arrow-right"></i></span><span>Move</span></div>
                    <div className=""><span className=""><i class="fa-regular fa-copy"></i></span><span>Copy</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-photo-film"></i></span><span>Make template</span></div>
                    <div className=""><span className=""><i class="fa-regular fa-eye"></i></span><span>Watch</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-box-archive"></i></span><span>Archive</span></div>
                    <div className=""><span className=""><i class="fa-solid fa-share-nodes"></i></span><span>Share</span></div>

                </section></section>
        </div>
        <button onClick={onCloseCardDetails}><i class="fa-solid fa-xmark"></i></button>
    </div>
}