import winter from '../assets/img/winter.png'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const style = {
    backgroundImage: winter,
}

export const BoardPreview = ({ board }) => {
    ///<BoardHeader/>

    console.log(board)
    ///<BoardHeader/>
    return (
        <article className="board-preview" style={{ backgroundColor: 'green' }}>
            <Link to={`boards/${board._id}`}>
                <h1>{board.title}</h1>
                <label className="star">
                    <button></button>
                    <i class="fa-regular fa-star"></i>
                    {/* <i className="fa-solid fa-copy"></i> */}
                </label>
            </Link>
        </article>
    )
}
