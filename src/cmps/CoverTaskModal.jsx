import { useDispatch } from "react-redux"
import {  onUpdateCover } from '../store/actions/board.actions'



export function CoverTaskModal({ task, onToggleCoverModal,currBoard,group,taskId }) {
    const dispatch=useDispatch()
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

    return <section
        className="covers-container"
    >
        <header className="cover-header">
            <span className="title">covers</span>
            <button
                onClick={onToggleCoverModal}
                className="close-cover-modal"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

        </header>
        <hr />

        <section className="covers">
            {palette.map(color =>

                <div className="cover-container" style={{
                    backgroundColor: color,
                    height: '32px',
                }}
                onClick={()=>dispatch(onUpdateCover(currBoard,group,taskId,color))}
                >

                    {task.style?.backgroundColor === color &&
                        <div className="cover-indication">✔</div>}
                </div>
            )}


        </section>
    </section>
}