import React, { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { setCurrBoard } from '../store/actions/board.actions'
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"

import { useEffectUpdate } from "./useEffectUpdate"

export function TaskDetails() {
    const { currBoard } = useSelector(state => state.boardModule)
    // console.log('hey ffrom det')
    const params = useParams()
    const taskId = params.taskId
    const [task, setTask] = useState({})
    const [group, setGroup] = useState({})
    const navigate = useNavigate()


    const dispatch = useDispatch()

    useEffect(() => {
        getGroupTask()
        if (!Object.keys(currBoard).length) {
            boardService.getById('board', params.boardId)
                .then((board) => dispatch(setCurrBoard(board)))
        }
        console.log(task.labelIds)

    }, [])


    const getGroupTask = async () => {
        try {
            const { task, group } = await boardService.getTaskGroupById(currBoard, taskId)

            setTask(task)
            setGroup(group)
        } catch (err) {
            console.log(err)
        }

    }

    const onCloseCardDetails = () => {
        navigate(`/boards/${currBoard._id}`)

    }

    const getLabel = (labelId) => {
        if (!currBoard.labels) return
        return (currBoard.labels.find(label => label.id === labelId))
    }

    if (!Object.keys(task).length || !Object.keys(group).length) return 'loading'
    return <div className="card-details">
        {task.style &&
            <header className="card-details-header" style={{ backgroundColor: task.style.backgroundColor }}>
            </header>
        }

        <main className="card-details-conatiner">
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
            </section>
            <section className="description">
                <header className="descriptiont-header">Description</header>
                <textarea name="add-desc" placeholder="Add more detailed description..." />

            </section>

            {/* <section className="custom-fields">
            </section> */}

            <section>
                <header className="activity-header">
                    <span>Activity</span>
                    <button>Show details</button>
                </header>
                <input name="comment" type="text" placeholder="Write a comment" />
            </section>

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

            <section></section>

        </main>
        <button onClick={onCloseCardDetails}>X</button>
    </div>
}