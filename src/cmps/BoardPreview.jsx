import winter from '../assets/img/winter.png'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'


const style = {
    backgroundImage: winter,
}



export const BoardPreview = ({ board }) => {
    const dispatch = useDispatch()
    ///<BoardHeader/>
    // console.log('in boardlist',board)
    ///<BoardHeader/>
    return (
        <article className="board-preview" style={{ backgroundColor: 'green' }}>
            <Link onClick={() => dispatch(setCurrBoard(board))} to={`/boards/${board._id}`}>
                <h1>{board.title}</h1>
                <label className="star">
                    <button></button>
                    <i className="fa-regular fa-star"></i>
                    {/* <i className="fa-solid fa-copy"></i> */}
                </label>
            </Link>
        </article>
    )
}
