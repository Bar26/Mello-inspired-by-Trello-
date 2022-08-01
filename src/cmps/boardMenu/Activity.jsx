import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



export function Activity() {

    const { currBoard } = useSelector((state) => state.boardModule)


    return <section className="activity-container">
        {currBoard.activities.map(act => {
            switch (act.type) {
                case 'add-task': {

                    return <div className="activity">
                        <div className="content">
                        <span className="user-name">{act.userName} </span>
                        added
                        {act.task && <Link className="link-to-task" to={`/boards/${currBoard._id}/${act.task.id}`}>
                            {act.task.title}
                        </Link>}
                        {!act.task &&
                            <span>{act.taskTitle}</span>
                        }
                        to {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'remove-task': {
                    return <div className="activity">
                          <div className="content">
                        <span className="user-name">{act.userName}</span>
                        archived {act.taskTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'add-group': {
                    return <div className="activity">
                          <div className="content">
                        <span className="user-name">{act.userName}</span>
                        added {act.groupTitle} to this board.</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'remove-group': {
                    return <div className="activity">
                          <div className="content">
                        <span className="user-name">{act.userName}</span>
                        archived {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'copy-task': {
                    return <div className="activity">
                          <div className="content">
                        <span className="user-name">{act.userName}</span>
                        copied
                        {act.task && <Link className="link-to-task" to={`/boards/${currBoard._id}/${act.task.id}`}>
                            {act.task.title}
                        </Link>}
                        {!act.task && <span>{act.taskTitle}</span>}

                        from

                        {act.taskCopy && <Link className="link-to-task" to={`/boards/${currBoard._id}/${act.taskCopy.id}`}>
                            {act.taskCopy.title}
                        </Link>}
                        {!act.taskCopy && <span>{act.taskTitle}</span>}
                        in list {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'copy-group': {
                    return <div className="activity">
                          <div className="content">
                        <span className="user-name">{act.userName}</span>
                        copied {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }




                default:

            }

        }

        )}

    </section>
}



