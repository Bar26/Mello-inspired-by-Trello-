// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import React, { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { useDispatch, useSelector } from 'react-redux'
import pen from '../assets/img/pen.png'
import { setCurrBoard } from '../store/actions/board.actions'
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"




export function TaskPreview({ group, task, onRemoveCard, onCopyCard }) {
    const navigate = useNavigate()
    const [date, setDate] = useState(new Date())
    const [style, setStyle] = useState({ height: "32px", width: "100%" })
    const { currBoard } = useSelector(state => state.boardModule)
    const refs = useRef([])
    const params = useParams()
    const dispatch = useDispatch()
    const penRef = useRef()
    const [isLabel, setIsLabel] = useState(false)
    const editModalRef = useRef()



    useEffect(() => {
        if (!Object.keys(currBoard).length) {
            boardService.getById('board', params.boardId)
                .then((board) => dispatch(setCurrBoard(board)))

        }

        if (task.dueDate) {

            const date2 = new Date(task.dueDate)
            setDate(date2)
        }
        if (task.style) {
            setStyle({ ...style, ...task.style })
        }

        if (!task.labelIds) penRef.current.classList.add('noLabel')
    }, [])


    const getLabel = (labelId) => {
        if (!currBoard.labels) return
        return (currBoard.labels.find(label => label.id === labelId))
    }

    const onOpenLabel = (ev) => {
        ev.stopPropagation()
        refs.current.map(ref => ref.classList.toggle('hide'))
    }

    const onToggleEditModal = (ev) => {
        ev.stopPropagation()
        editModalRef.current.classList.toggle('hide')
    }




    return <section className="task" onClick={() => navigate(`/boards/${currBoard._id}/${task.id}`)}>
        <div ref={penRef} className="pen-container" onClick={onToggleEditModal}>
            <img className="pen-img" src={pen} />

        </div>
        <div ref={editModalRef} className="edit-card-modal hide">
            <div><span>+</span><span>Open Modal</span></div>
            <div><span>+</span><span>Edit labels</span></div>
            <div><span>+</span><span>Change Members</span></div>
            <div><span>+</span><span>Change cover</span></div>
            <div><span>+</span><span>Move</span></div>
            <div onClick={() => onCopyCard(task)}><span>+</span><span>Copy</span></div>
            <div><span>+</span><span>Edit Dates</span></div>
            <div onClick={() => onRemoveCard(task.id)}><span>+</span><span>Archive</span></div>
            <div onClick={onToggleEditModal}><span></span><span>X</span></div>
        </div>

        {task.style && <>
            {/* {()=>onChangePad()} */}
            <div className="task-bg" style={{ ...style }}></div></>
        }
        <section className="task-details">
            {task.labelIds && currBoard.labels &&
                <div className="labels-container">
                    {task.labelIds.map((labelId, idx) => {

                        const label = getLabel(labelId)

                        const backgroundColor = label.backgroundColor
                        const title = label.title
                        return <div key={labelId + idx} className="label-container" onClick={onOpenLabel} style={{ backgroundColor: backgroundColor, minHeight: "8px", minWidth: "40px" }}>
                            <span ref={(element) => { refs.current[idx] = element }} className="label-title hide">{label.title}</span>
                        </div>
                    })}
                </div>
            }

            <div>{task.title}</div>
            {task.checklists &&
                task.checklists.map(checklist => {
                    return <div className="checklists-prev">

                        <span>{checklist.todos.filter(todo => todo.isDone).length}</span>
                        <span>/{checklist.todos.length}</span>
                    </div>
                })}

            {task.dueDate && <section className="due-date">
                <span>{utilService.getMonthName(date)} </span>
                <span>{date?.getDate().toString()}</span>

            </section>
            }

        </section>


    </section>
}