import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../../services/board.service'



export function Activity() {

    const { currBoard } = useSelector((state) => state.boardModule)

    const getBg=(img)=>{
        const bg = img ? `url(${img}) center center / cover` : '#de350b'
        return bg
    }



    return <section className="activity-container">
        <div className="header">
            <span className="activity-icon-container"><i className="fa-solid fa-list-ul"></i></span>
            <span className="title">Activity</span>

        </div>
        {currBoard.activities.map(act => {
            switch (act.type) {
                case 'add-task': {

                    return <div className="activity">
                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),
                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName} </span>
                            <span>added </span>
                            {act.task && <Link className="link-to-task" to={`/boards/${currBoard._id}/${act.task.id}`}>
                                {act.task.title}
                            </Link>}
                            {!act.task &&
                                <span>{act.taskTitle}</span>
                            }
                            <span> to </span> {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'remove-task': {
                    return <div className="activity">
                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),

                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName}</span>
                            <span> archived</span> {act.taskTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'add-group': {
                    return <div className="activity">
                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),

                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName}</span>
                            <span> added {act.groupTitle} to this board</span></div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'remove-group': {
                    return <div className="activity">
                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),

                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName}</span>
                            <span> archived </span> {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'copy-task': {
                    return <div className="activity">
                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),

                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName} </span>
                            <span>copied </span>
                            {act.task && <Link className="link-to-task" to={`/boards/${currBoard._id}/${act.task.id}`}>
                                {act.task.title}
                            </Link>}
                            {!act.task && <span>{act.taskTitle}</span>}

                            <span> from </span>

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
                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),

                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName}</span>
                            <span>copied</span> {act.groupTitle}</div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }
                case 'change-BG': {
                    return <div className="activity">

                        <div
                            className="user-img"
                            style={{
                                background: getBg(act.userImg),

                                height: '32px'
                            }}
                        >
                            {!act.userImg && <span>{boardService.getInitials(act.userName)}</span>}
                        </div>
                        <div className="content">
                            <span className="user-name">{act.userName}</span>
                            <span> changed the background of this board</span>
                        </div>
                        <span className="created-at">
                            {act.createdAt}
                        </span>
                    </div>
                }

                default:
            }

        })


        }


    </section>
}



