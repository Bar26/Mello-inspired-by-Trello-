import { TaskPreview } from "./TaskPreview"


export const GroupPreview = ({group}) => {
    // console.log(group)

 //TODO: ADD STYLE
    return <article className='group'>
        <header className='group-title'>
        {group.title}
        </header>
       
        <div className="task-list">
           {group.tasks.map(task=><TaskPreview task={task} key={task.id} />)} 
        </div>

        {/* <div className='card-taskes'>
            <div>Task1</div>
            <div>Task2</div>
            <div>Task3</div>
        </div> */}
        {/* <form>
            <input></input>
        </form> */}
    </article>
}