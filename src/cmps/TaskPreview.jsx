import { useDrag } from 'react-dnd'

import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function TaskPreview({ task }) {
    const [date, setDate] = useState({})
    const [style, setStyle] = useState({ height: "32px", width: "100%" })

    useEffect(() => {
        if (task.dueDate) {

            const date2 = new Date(task.dueDate)
            setDate(date2)
            console.log(date2)
        }
        if (task.style) {
            console.log({ ...style, ...task.style })
            setStyle({ ...style, ...task.style })
        }
    }, [])




    return <section className="task">

        {task.style &&
            <div style={{ ...style }}></div>
        }
        {task.title}
        {task.checklists &&
            task.checklists.map(checklist => {
                return <div className="checklists-prev">

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
}