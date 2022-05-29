// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useEffect, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { utilService } from "../services/util.service"

export function TaskPreview({ task, index }) {
    const [date, setDate] = useState({})
    const [style, setStyle] = useState({ height: "32px", width: "100%" })

    useEffect(() => {
        if (task.dueDate) {

            const date2 = new Date(task.dueDate)
            setDate(date2)
            // console.log(date2)
        }
        if (task.style) {
            // console.log({ ...style, ...task.style })
            setStyle({ ...style, ...task.style })
        }
    }, [])


        // const updatedCmp = wap.cmps.map((currCmp, currIdx) => currIdx === idx ? template : currCmp)



    return( 
    <Draggable  key={utilService.makeId()} draggableId={utilService.makeId()} index={index}>
        {(provided) => (
            <section className={task.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                {task.style &&
                    <div style={{ ...style }}></div>
                }
                {task.title}
                {task.checklists &&
                    task.checklists.map(checklist => {
                        return <div className="checklists-prev" id={checklist.id}>

                            <span>{checklist.todos.filter(todo => todo.isDone).length}</span>
                            <span>/{checklist.todos.length}</span>
                        </div>
                    })}

                {task.dueDate && <section className="due-date">
                    <span>{utilService.getMonthName(date)} </span>
                    {/* <span>{date.getDate().toString()}</span> */}

                </section>
                }
            </section>
        )}
    </Draggable>)
}