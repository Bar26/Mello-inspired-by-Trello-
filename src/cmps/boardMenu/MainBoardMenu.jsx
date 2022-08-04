

import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Activity } from "./Activity";

export const MainBoardMenu = ({ menuShow, onToggleBoardMenu, setSelectedType, setTitle }) => {



    const { currBoard } = useSelector((state) => state.boardModule)
    const [backgroundState, setBackgroudState] = useState()
    const [backgroundInd, setBackgroudInd] = useState()

    useEffect(() => {
        const background = currBoard.style.backgroundImage ? `url${currBoard.style.backgroundImage}` : currBoard.style.backgroundColor
        const backgroundIndactor = currBoard.style.backgroundImage ? 'img' : 'color'
        setBackgroudState(background)
        setBackgroudInd(backgroundIndactor)
    }, [])

    return (<section className="menu-content">
        <div className="board-menu-actions">
            {/* <button className="board-menu-actions-btn">About this board <p>Add a description to your board</p></button> */}
            <button className="board-menu-actions-btn" onClick={() => { setSelectedType('change-bgc'); setTitle('Change background'); }}>
                {backgroundInd === 'img' && <div className="board-menu-actions-btn-bgc-prev" style={{ borderRadius: '3px', backgroundImage: backgroundState, backgroundSize: 'cover' }}><div className="filler"></div></div>}
                {backgroundInd === 'color' && <div className="board-menu-actions-btn-bgc-prev" style={{ borderRadius: '3px', background: backgroundState }}><div className="filler"></div></div>}
                Change background
            </button></div>
        <hr />
        <Activity />
    </section>
    )
}