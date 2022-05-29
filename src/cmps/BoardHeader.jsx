

export const BoardHeader = () => {


    return <header className="board-header flex space-between">
        <div className="b-h-first-part flex">
            <button className="select-board">
                Board
            </button>
            <input type='text' />
            <button className="set-star">
                star
            </button>
            <div className="members">
                Members Here
            </div>
            <button  className="share">
                Share
            </button>
        </div>
        <div className="b-h-second-part">
            <button className="filter">
                Filter
            </button>
            <button className="b-h-modal">
                Show Menu
            </button>

        </div>
    </header>
}