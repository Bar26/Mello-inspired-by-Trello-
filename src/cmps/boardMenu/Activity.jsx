import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



export function Activity() {

    const { currBoard } = useSelector((state) => state.boardModule)
    console.log(currBoard);


    return <section>
        {/* {currBoard.activities.map(act => {
            switch (act.type) {
                case 'add-task': {
                    return <div>
                        <span>{act.user.fullname}</span>
                        added
                        {act.task&&<Link className="link-to-task" to={`/boards/${currBoard._id}/${act.task.id}`}>
                            {act.task.title}
                        </Link>}
                        {act.taskTitle&&
                        <span>{act.taskTitle}</span>
                        
                        }
                        to {act.group.title}
                    </div>
                }
                case 'remove-task': {
                    return <div>
                        <span>{act.user.fullname}</span>
                        archived {act.task.title}
                    </div>
                }
                case 'add-group': {
                    return <div>
                        <span>{act.user.fullname}</span>
                        added {act.group.title} to this board.
                    </div>
                }
                case 'remove-group': {
                    return <div>
                        <span>{act.user.fullname}</span>
                        archived {act.group.title}
                    </div>
                }
                default:

            }
            // 	if (act.type === 'add-task') return <div>
            // 		<span>{act.user.fullname}</span>
            // 		 added
            // 		<Link className="link-to-task" to={`/boards/${currBoard._id}/${act.task.id}`}>
            // 			{act.task.title}
            // 		</Link> 
            // 		to {act.group.title}
            // 	</div>
            // 	else if(act.type === 'remove-task') return <div>
            // 	<span>{act.user.fullname}</span>
            // 	 archived {act.task.title}
            // </div>
        } */}


    </section>
}



