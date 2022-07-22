






export const MainBoardMenu = ({ menuShow, onToggleBoardMenu, setSelectedType, setTitle }) => {




    return (
            <div className="board-menu-actions">
                <button className="board-menu-actions-btn">About this board <p>Add a description to your board</p></button>
                <button className="board-menu-actions-btn" onClick={() => {setSelectedType('change-bgc'); setTitle('Change background');}}><div className="board-menu-actions-btn-bgc-prev"></div> Change background</button>
            </div>
    )
}