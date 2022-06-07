import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { boardService } from '../services/board.service'
import { useNavigate, useParams } from 'react-router-dom'
import { onCopyTask, onRemoveTask } from '../store/actions/board.actions'
import { AddMemberModal } from './MembersModal.jsx'

import {
    setCurrBoard,
    setIsTaskDetailsScreenOpen,
    onSaveBoard
} from '../store/actions/board.actions'
import ProgressBar from './proggresBar/ProggresBar'
import { utilService } from '../services/util.service'

export function TaskDetails() {
    const { currBoard } = useSelector((state) => state.boardModule)
    const dispatch = useDispatch()
    const params = useParams()
    const taskId = params.taskId
    const [task, setTask] = useState({})
    const [group, setGroup] = useState({})
    const navigate = useNavigate()
    const cardDetailsRef = useRef()
    const penRef = useRef()
    const editLabelModalRef = useRef()

    // const [descBeforChange, set
    const descInputRef = useRef()
    const descInputContainerRef = useRef()
    const descPrevRef = useRef()

    const addLabelModalRef = useRef()
    const attachmentModalRef = useRef()
    const createLabelRef = useRef()
    const createCheckListRef = useRef()
    const [newLabelColor, setNewLabelColor] = useState('#61bd4f')
    const [newLabelTitle, setNewLabelTitle] = useState()
    const checklistModalRef = useRef()

    const [filterLabel, setFilterLabel] = useState('')
    // const [filterMember, setFilterMember] = useState('a')
    const closeDetailsRef = useRef()
    // console.log(filterMember)

    const addMemberModalRef = useRef()

    const palette = [
        '#61bd4f',
        '#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
    ]

    const toggleDescInput = () => {
        descInputContainerRef.current.classList.toggle('close')
        descPrevRef.current.classList.toggle('close')
    }


    useEffect(() => {
        getGroupTask()
        if (!Object.keys(currBoard).length) {
            boardService.getById('board', params.boardId)
                .then((board) => dispatch(setCurrBoard(board)))
        }

    }, [])

    // useEffect(() => {==

    // }, [newLabelColor])

    // useEffectUpdate(() => {



    const getGroupTask = async () => {
        try {
            const { task, group } = await boardService.getTaskGroupById(
                currBoard,
                taskId
            )

            setTask(task)
            setGroup(group)
        } catch (err) {
            console.log(err)
        }
    }

    const onDescSubmit = (ev) => {
        // console.log('in desc submit')

        ev.preventDefault()
        const { value } = ev.target[0]
        console.log(value)
        toggleDescInput()
        onSaveDesc(value)

        // await dispatch(setCurrBoard(updatedBoard._id))
    }

    const onSaveDesc = async (value) => {
        const updatedBoard = await boardService.saveDesc(currBoard, group.id, task.id, value)
        await dispatch(onSaveBoard(updatedBoard))
    }

    const onCloseCardDetails = () => {
        navigate(`/boards/${currBoard._id}`)
    }

    const onCheckList = async () => {
        let newBoard = await boardService.createChecklist(currBoard, group, task)
        await boardService.update(newBoard)
        await dispatch(onSaveBoard(newBoard))
        // return newBoard
    }

    const onAttachment = async () => {
        let newBoard = await boardService.addAttachment(currBoard, group, task)
        await boardService.update(newBoard)
        await dispatch(onSaveBoard(newBoard))
        // return newBoard
    }

    const getLabel = (labelId) => {
        if (!currBoard.labels) return
        return currBoard.labels.find(label => label.id === labelId)
    }
    const getMember = (memberId) => {
        if (!currBoard.members) return
        return currBoard.members.find(member => member._id === memberId)
    }

    const onCancelDescChange = () => {
        console.log('in cancel')
        toggleDescInput()
        console.log(task.description)
        descInputRef.current.value = task.description
    }

    const onChangeCardTitle = (ev) => {
        const { value } = ev.target
        boardService
            .changeCardTitle(currBoard, group, taskId, value)
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

    const onToggleLabelToTask = async (labelId) => {
        try {
            const updatedBoard = await boardService.toggleLabelToTask(currBoard, group, taskId, labelId)
            await dispatch(onSaveBoard(updatedBoard))
            // await dispatch(setCurrBoard(updatedBoard._id))
        } catch (err) {
            console.log('connot add label to task', err)
        }

    }
    const onToggleMemberToTask = async (memberId) => {
        console.log('in togglemember')
        try {
            const updatedBoard = await boardService.toggleMemberToTask(currBoard, group, taskId, memberId)
            await dispatch(onSaveBoard(updatedBoard))
        } catch (err) {
            console.log('connot add member to task', err)
        }

    }


    const onSearchLabel = ({ target }) => {
        const value = target.value
        setFilterLabel(value)
    }
    // const onSearchMember = ({ target }) => {
    //     const value = target.value
    //     console.log(value)
    //     setFilterMember(value)
    // }

    const onSaveNewLabel = async () => {
        try {
            const updatedBoard = boardService.createLabel(currBoard, group, task, newLabelColor, newLabelTitle)
            await dispatch(onSaveBoard(updatedBoard))
            // await dispatch(setCurrBoard(updatedBoard._id))
            onToggleCreateLabelModal()
        } catch (err) {
            console.log('connot add label to task', err)
        }
    }
    const onAddItem = async (ev) => {
        console.log(ev.target[0].value);
        const newTodo = ev.target[0].value
        const newBoard = await boardService.addTodo(currBoard, group, task, newTodo)
        await dispatch(onSaveBoard(newBoard))
    }

    const onAddAttachment = async (ev) => {
        console.log(ev.target[0].value);
        const attachmentImg = ev.target[0].value;
        // (!ev.target[0].value) ? attachmentImg = '' : attachmentImg = ev.target[0].value
        const newBoard = await boardService.addAttachment(currBoard, group, task, attachmentImg)
        await dispatch(onSaveBoard(newBoard))
        // await dispatch(setCurrBoard(newBoard._id))
    }

    const onCheckBoxClick = async (ev, todo) => {
        const newBoard = await boardService.updateTodo(currBoard, group, task, todo)
        await dispatch(onSaveBoard(newBoard))

    }


    const onToggleCreateLabelModal = () => {
        createLabelRef.current.classList.toggle('hide')
        addLabelModalRef.current.classList.toggle('hide')
    }
    const onToggleMemberModal = () => {
        addMemberModalRef.current.classList.toggle('hide')
    }

    const toggleChecklistModal = () => {
        checklistModalRef.current.classList.toggle('hide')
        // checklistModalRef.current.value = ''
        // addListRef.current.classList.toggle('close')
    }

    const toggleattAchmentModal = () => {
        console.log('HELP ME');
        attachmentModalRef.current.classList.toggle('hide')
        // checklistModalRef.current.value = ''
        // addListRef.current.classList.toggle('close')
    }

    const onChangeAttachmentTitle = async (ev) => {
        const { value } = ev.target
        const updatedBoard = await boardService.changeAttachmentTitle(currBoard, group, task, value)
        await dispatch(onSaveBoard(updatedBoard))
    }

    const onDeleteChecklist = async () => {
        const newBoard = await boardService.deleteChecklist(currBoard, group, task)
        await dispatch(onSaveBoard(newBoard))

    }

    const onMakeAttachmentCoverTask = async () =>{
        const newBoard = await boardService.makeAttachmentCoverTask(currBoard,group,task)
        await dispatch(onSaveBoard(newBoard))
    }

    if (!Object.keys(task).length || !Object.keys(group).length) return 'loading'
    return (
        <div className="card-details" ref={cardDetailsRef}>
            {task.style && task.style.backgroundColor && (<header
                className="card-details-header"
                style={{ backgroundColor: task.style.backgroundColor }}
            ></header>

            )}
            {task.attachment && task.style?.isCover && (<header
                className="card-details-header"
                style={{background:`url(${task.attachment.imgUrl})`,backgroundRepeat:'no-repeat',
					backgroundSize:'contain' , backgroundPosition:'center',height:'160px',width:'100%', borderRadius:'3px' }}
            ></header>

            )}
            
            <div className="main-aside-container">
                <main className="card-details-conatiner">
                    {/* <div className="forListener" ref={forListenerUpRef}> */}
                    <section className="card-details-title-container">
                        <span className="card-icon"><i className="fa-solid fa-window-maximize"></i></span>
                        <section className="title-in-group">
                            <input
                                className="details-group-title"
                                defaultValue={task.title}
                                type="text"
                                onChange={onChangeCardTitle}
                            />
                            <div className="in-group">
                                in list <span className="list-name">{group.title}</span>
                            </div>
                        </section>
                    </section>
                    <section className="card-details-labels">
                        {task.labelIds && currBoard.labels && <>
                        <div className='title-and-labels'>
                            <span className="labels-title">Labels</span>
                            <div className="card-details-labels-container">
                                {task.labelIds.map((labelId) => {
                                    const label = getLabel(labelId)
                                    const backgroundColor = label.backgroundColor
                                    const title = label.title
                                    return (
                                        <div
                                            key={labelId}
                                            className="card-details-label"
                                            style={{
                                                backgroundColor: backgroundColor,
                                                height: '32px',
                                                width: '68px',
                                            }}
                                        >
                                            {title}
                                        </div>
                                    )
                                })}
                                <section className="add-label-container">
                                    <div
                                        onClick={onToggleLabelModal}
                                        className="card-details-add-label"           /////////?????????????
                                    >
                                        +
                                    </div>

                                </section>
                            </div></div>
                        </>}
                        {/* <section className="add-label-container"> */}
                        <div
                            ref={addLabelModalRef}
                            className="add-label-modal hide"
                        >
                            {/* onBlur={onToggleLabelModal} */}
                            <header className="add-label-modal-header">
                                <span className="add-label-modal-title">Labels</span>
                                <button
                                    onClick={onToggleLabelModal}
                                    className="close-label-modal"
                                >
                                    X
                                </button>
                            </header>
                            <hr />
                            <input
                                onChange={onSearchLabel}
                                className="search-label"
                                placeholder="Search labels..."
                                value={filterLabel}
                            />
                            <div className="labels-container">
                                <span className="labels-title">Labels</span>
                                <div className="labels-list">
                                    {currBoard.labels && currBoard.labels.map((label) => {
                                        const backgroundColor = label.backgroundColor
                                        const title = label.title
                                        if (label.title.toLowerCase().includes(filterLabel)) {

                                            return (
                                                <section className="label-in-modal-container">
                                                    <div
                                                        key={label.id}
                                                        className="label-in-modal"
                                                        onClick={() => onToggleLabelToTask(label.id)}
                                                        style={{
                                                            backgroundColor: backgroundColor,
                                                            height: '32px',
                                                        }}
                                                    >
                                                        {title}
                                                        {task.labelIds && task.labelIds.includes(label.id) && (
                                                            <div className="label-indication">✔</div>
                                                        )}
                                                    </div>
                                                    <div
                                                        ref={penRef}
                                                        className="edit-label"
                                                        onClick={onToggleEditLabelModal}
                                                    >
                                                        <img className="pen-img" src={pen} />
                                                        <div
                                                            ref={editLabelModalRef}
                                                            className="edit-label-modal hide"
                                                        ></div>
                                                    </div>
                                                </section>
                                            )
                                        }
                                        else return
                                    })}
                                </div>

                                <button
                                    onClick={onToggleCreateLabelModal}
                                    className="add-label-btn"
                                >
                                    Create a new label
                                </button>
                            </div>
                        </div>
                        {/* </section> */}

                        <div ref={createLabelRef} className="create-label-modal-container hide">
                            <header className="create-label-modal-header">
                                {/* <span className="go-back-to-label-modal">*</span> */}
                                <span className="create-label-modal-title">
                                    Create label
                                </span>
                                <button
                                    onClick={onToggleCreateLabelModal}
                                    className="close-label-modal"
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </header>
                            <hr />
                            <label className="create-label-label">
                                Name
                                <input
                                    className="create-label-input"
                                    type="text"
                                    onChange={(ev) => setNewLabelTitle(ev.target.value)}
                                    onBlur={(ev) => setNewLabelTitle(ev.target.value)}
                                />
                            </label>
                            <div className="select-color-title">Select a color</div>
                            <div className="colors-for-select">
                                {palette.map((clr,idx) => {
                                    // console.log(clr)
                                    return (
                                        <div
                                        key={clr+idx}
                                            onClick={() => setNewLabelColor(clr)}
                                            className="label-color"
                                            style={{ backgroundColor: clr }}
                                        >
                                            {newLabelColor === clr && <div>✔</div>}
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={onSaveNewLabel} className="save-label">
                                Create
                            </button>
                        </div>

                        <section className="card-details-members">
                            {task.memberIds && currBoard.members && <>
                                <span className="members-title">Members</span>
                                <div className="card-details-members-container">
                                    {task.memberIds.map((memberId) => {
                                        const member = getMember(memberId)
                                        const src = member.imgUrl
                                        return (
                                            <div
                                                key={memberId}
                                                className="card-details-member"
                                                style={{
                                                    background: `url(${src})`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    height: '32px',
                                                    width: '32px',
                                                    borderRadius: '50%'
                                                }}
                                            >
                                            </div>
                                        )
                                    })}
                                    <section className="add-member-container">
                                        <div
                                            onClick={onToggleMemberModal}
                                            className="card-details-add-member"           /////////?????????????
                                        >
                                            +
                                        </div>

                                    </section>
                                </div>
                            </>}
                        </section>





                    </section>
                    {/* </div> */}
                    <section className="description">
                        <div className="description-content">
                            <header className="description-header">
                                <span className="desc-icon"><i className="fa-solid fa-align-left"></i></span>
                                <div className="desc-title">Description</div>
                                {/* <button className="edit-desc">Edit</button> */}
                            </header>

                            <div
                                ref={descPrevRef}
                                className="edit-prev"
                                onClick={toggleDescInput}
                                style={task.description ? ({ backgroundColor: "transparent" }) : ({ backgroundColor: "rgb(235, 236, 240)" })}
                            >
                                {task.description || 'Add a more detailed description...'}
                            </div>
                            <div
                                className="input-container close"
                                ref={descInputContainerRef}
                            >
                                <form onSubmit={onDescSubmit}  >

                                    <textarea
                                        ref={descInputRef}
                                        className="add-desc"
                                        defaultValue={task.description || ''}
                                        name="add-desc"
                                        type="text"
                                        onBlur={onDescSubmit}
                                        placeholder={
                                            task.description || 'Add a more detailed description...'
                                        }
                                    />

                                    <div className="desc-btn">
                                        <button className="save-desc">Save</button>

                                        <button
                                            type="button"
                                            onClick={(ev) => {
                                                ev.stopPropagation()
                                                onCancelDescChange(ev)
                                            }}
                                            className="cancel-change"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* Add Tnai */}
                    {task.attachment && task.attachment.title!=='' && <section className='attachment-container'>
                        <header className='attachment-header'>
                            <span className="attachment-icon"><i className="fa-solid fa-paperclip"></i></span>
                            <div className='attachment-title-button flex'>
                                <span className="attachment-title">Attachments</span>
                                {/* <button className='attachment-title-delete' onClick={console.log('Make Delete')}>Delete</button> */}
                            </div>
                        </header>
                        {task.attachment.imgUrl === '' && <div>
                            <div className='add-item-attachment' ref={attachmentModalRef}>
                                {/* add className name hide */}
                                <div className='add-item-attachment-modal'>
                                    <form id='add-item-attachment' onSubmit={(event) => onAddAttachment(event)}>
                                        <input type='text' className='add-item-attachment-input' placeholder='Add an URL' />
                                    </form>
                                </div>
                                <div className='add-item-attachment-controller flex'>
                                    <div>
                                        <button className='attachment-add-btn' type='submit' form='add-item-attachment'>Add</button>
                                        <button onClick={toggleattAchmentModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {task.attachment.imgUrl !== '' && <section className='attachment-list-container flex'>
                            <img className='attachment-img' src={task.attachment.imgUrl} />
                            <div className='attachment-info flex'>
                                <input className="attachment-title" defaultValue={task.attachment.title} type="text" onChange={onChangeAttachmentTitle} onBlur={onChangeAttachmentTitle} />
                                <span className='attachment-created-at'>Added at {task.attachment.createdAt+''}</span>
                                <button onClick={onMakeAttachmentCoverTask}>Remove cover</button>
                            </div>
                        </section>}
                    </section>}



                    {/* checklist title to input */}
                    {task.checklist && task.checklist.todos && <section className='checklist-container '>
                        <header className='checklist-header'>
                            <span className="checklist-icon"><i className="fa-regular fa-square-check"></i></span>
                            <div className='checklist-title-button flex'>
                                <span className="checklist-title">Check List</span>
                                <button className='checklist-title-delete' onClick={onDeleteChecklist}>Delete</button>
                            </div>
                        </header>
                        <div className='proggres-bar flex'>
                            <span className='checklist-prog'>{boardService.calculateProg(task)}%</span>
                            <ProgressBar completed={boardService.calculateProg(task)}></ProgressBar>
                        </div>
                        {/* task.checkList.length>0&& */}

                        <section className='checklist-todos-list-container '>
                            <ul style={{ padding: 0 }}>
                                {task.checklist.todos.map(todo => {
                                    return (
                                        <li className='check-box-per-todo flex' key={todo.id}>
                                            <label className='checkbox-label' >
                                                <input onChange={(ev) => onCheckBoxClick(ev, todo)} className='checkbox' checked={todo.isDone} type="checkbox" id="todo.title" />
                                                {todo.title}</label>
                                        </li>
                                    )
                                })}
                            </ul>
                            <button className='prev-btn-add-item' onClick={toggleChecklistModal}>Add an item</button>
                            <div className='add-item-checklist hide' ref={checklistModalRef}>
                                {/* add className name hide */}
                                <div className='add-item-checklist-modal'>
                                    <form id='add-item' onSubmit={(event) => onAddItem(event)}>
                                        <input type='text' className='add-item-checklist-input' placeholder='Add an item' />
                                    </form>
                                </div>
                                <div className='add-item-checklist-controller flex'>
                                    <div>
                                        <button className='checklist-add-btn' type='submit' form='add-item'>Add</button>
                                        <button onClick={toggleChecklistModal}>Cancel</button>
                                    </div>
                                    <div className='checklist-controller-btn'>
                                        {/* <button className='checklist-add-btn'>Add</button> */}
                                        <button>Assign</button>
                                        <button>Due date</button>
                                        <button>@</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* <h1>{this.titleCheck()}</h1>
            <ul key={`todo ${id}`}>
                <div className='li-to-scroll'>
                {todos.map((todo, idx) => {
                    return <li className='todo-li flex' key={`line-${idx}`}>
                        <span className='todo-txt' onClick={() => this.clickTodo(todo, id)} style={{ textDecoration: todo.doneAt ? "line-through" : "none" }} >
                            {todo.txt}
                        </span>
                        <label className='todo-delete' title='Delete Line'>
                            <i className="fa-solid fa-circle-minus"></i>
                            <button onClick={(event) => this.onDeleteTodo(todo, id, event)} value={idx}  ></button>
                        </label>
                    </li>
                })}
                </div>
                <li className='todo-li flex'>
                    <form onSubmit={() => this.onAddToDo(id)}>
                        <input type='text' placeholder='Add Todo...'/>
                    </form>
                </li>
            </ul> */}


                    </section>}

                    {/* <section className="custom-fields">
            </section> */}

                    <section className="activity-container">
                        <header className="activity-header">
                            <div className="title-icon-container">
                                <span className="activity-icon"><i className="fa-solid fa-list-ul"></i></span>
                                <span className="activity-title">Activity</span>
                            </div>
                            <button className="show-details">Show details</button>
                        </header>

                        <div className="input-container">
                            <div className="user-logo-details">BE</div>
                            <input
                                className="comment"
                                name="comment"
                                type="text"
                                placeholder="Write a comment..."
                            />
                        </div>
                    </section>

                    <section></section>
                </main>
                <section className="details-aside">
                    <section className="add-to-card">
                        <span className="add-to-card-title">Add to card</span>
                        <div className="members-btn" onClick={onToggleMemberModal}>
                            <span className="">
                                <i className="fa-regular fa-user"></i>
                            </span>
                            <span>Members</span>


                            <div
                                ref={addMemberModalRef}
                                className="add-member-modal hide"
                                onClick={(ev) => ev.stopPropagation()}
                            >
                                <AddMemberModal onToggleMemberModal={onToggleMemberModal}
                                    // onSearchMember={onSearchMember}
                                    // filterMember={filterMember}
                                    currBoard={currBoard}
                                    onToggleMemberToTask={onToggleMemberToTask}
                                    task={task} />
                            </div>



                        </div>
                        <div className=" add-label-aside" onClick={onToggleLabelModal}>
                            <span className="">
                                <i className="fa-solid fa-tag"></i>
                            </span>
                            <span>Labels</span>
                        </div>
                        <div className="" onClick={() => onCheckList()}>
                            <span className="">
                                <i className="fa-regular fa-square-check"></i>
                            </span>
                            <span>Checklist</span>
                        </div>
                        <div className="" onClick={(event) => onAttachment(event)}>
                            <span className="">
                                <i className="fa-solid fa-paperclip"></i>
                            </span>
                            <span>Attachment</span>
                        </div>
                        <div className="">
                            <span className="add-to-card-cover">
                                <i className="fa-regular fa-window-maximize"></i>
                            </span>
                            <span>Cover</span>
                        </div>
                        <div className="">
                            <span className="">
                                <i className="fa-regular fa-clock"></i>
                            </span>
                            <span>Dates</span>
                        </div>
                        <div className="">
                            <span className="">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                            <span>Location</span>
                        </div>
                        {/* <div className="">
                            <span className="">
                                <i className="fa-regular fa-pen-field"></i>
                            </span>
                            <span>Custom fields</span>
                        </div> */}
                    </section>
                    <section className="card-details-actions">
                        <span className="actions-title">Actions</span>
                        <div className="">
                            <span className="">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                            <span>Move</span>
                        </div>
                        <div className="card-actions-copy" onClick={(ev) => dispatch(onCopyTask(ev, task, group, currBoard))}>
                            <span className="">
                                <i className="fa-regular fa-copy"></i>
                            </span>
                            <span>Copy</span>
                        </div>
                        {/* <div className="">
                            <span className="">
                                <i className="fa-solid fa-photo-film"></i>
                            </span>
                            <span>Make template</span>
                        </div> */}
                        {/* <div className="">
                            <span className="">
                                <i className="fa-regular fa-eye"></i>
                            </span>
                            <span>Watch</span>
                        </div> */}
                        <div className="card-actions-remove" onClick={(ev) => {
                            dispatch(onRemoveTask(ev, task.id, group, currBoard))
                            navigate(`/boards/${currBoard._id}`)
                        }
                        }
                        >
                            <span className="">
                                <i className="fa-solid fa-box-archive"></i>
                            </span>
                            <span>Archive</span>
                        </div>
                        <div className="">
                            <span className="">
                                <i className="fa-solid fa-share-nodes"></i>
                            </span>
                            <span>Share</span>
                        </div>
                    </section>
                </section>
            </div>
            <button ref={closeDetailsRef} className="close-details-btn" onClick={onCloseCardDetails}>
                <i className="fa-solid fa-x"></i>
            </button>
        </div >
    )
}
