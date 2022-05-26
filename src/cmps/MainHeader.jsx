import { boardService } from '../services/board.service.js'
import React from "react"
import { useEffect, useState } from 'react'
import { useHistory, NavLink, useNavigate } from 'react-router-dom'



export const SecondaryHeader = () => {
    const [templates, setTemplates] = useState([])
    const [board, setBoards] = useState({})
    const navigate = useNavigate()
    const refRecent = React.createRef()
    const refMore = React.createRef()

    useEffect(() => {
        // loadBoards()
        loadTemplates()
    }, [])

    useEffect(() => {
        if(!board._id) return 
        console.log(board)
        navigate(`/boards/${board._id}`)
    }, [board])

    const toggleDiv = (refType) => {
        refType.current.classList.toggle('hide')
    }

    const loadTemplates = () => {
        boardService.queryTemplates().then((template) => setTemplates(template))
        // .then((templates) => setTemplatestes(templates))
    }

    const onSelectTemplate = async (templateId) => {
        const template = await boardService.getById('tamplate',templateId)
        const newBoard = await boardService.getEmptyBoard(template)
        console.log('on Select', newBoard)
        setBoards(newBoard)
    }

    return <header className='secondary-header'>
        <h1 className="logo">Trello</h1>
        <section className="nav-header flex">
            <button className="secondary-header-recent-button" onClick={() => toggleDiv(refRecent)}>Recent</button>
            <section ref={refRecent} className='select-recent hide'>
                <h1>Recent Boards</h1>
                <button onClick={() => toggleDiv(refRecent)}>X</button>
                <hr />
                <ul>
                    {templates.map(template => {
                            return <li><button onClick={()=>{onSelectTemplate(template._id)}}>{template.title}</button></li>
                    })}
                </ul>
            </section>
            <button className="secondary-header-more-button" onClick={() => toggleDiv(refMore)}>More</button>
            <section ref={refMore} className='select-more hide'>
                <ul>
                    <li>Hey</li>
                    <li>Noam</li>
                    <li>Bar</li>
                </ul>
            </section>
        </section>
        <div className='header-search-div'>
            <label className='label-search flex'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input className='header-search' />
            </label>
        </div>
        <div className='user-logo'></div>
    </header>
}