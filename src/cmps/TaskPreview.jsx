import { useDrag } from 'react-dnd'

export function TaskPreview({task, provided}){

    return <section className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
        {task.title}
    </section>
}