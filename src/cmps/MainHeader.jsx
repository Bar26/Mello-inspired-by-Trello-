import { boardService } from '../services/board.service.js'
import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions.js'
import { utilService } from '../services/util.service.js'

export const SecondaryHeader = () => {
    const [templates, setTemplates] = useState([])
    const [board, setBoards] = useState({})
    const navigate = useNavigate()
    const refRecent = React.createRef()
    const refTemplates = React.createRef()
    const refStarred = React.createRef()
    const refCreate = React.createRef()
    // const refMore = React.createRef()

    // const { currBoard } = useSelector(state => state.boardModule)
    const dispatch = useDispatch()

	useEffect(() => {
		if (!board._id) return
		console.log(board)
        loadTemplates()
		dispatch(setCurrBoard(board))
		navigate(`/boards/${board._id}`)
	}, [board])

    // useEffect(() => {
    //     if (!board._id) return
    //     // console.log(board)
    //     // dispatch(setCurrBoard(board))
    //     navigate(`/boards/${board._id}`)
    // }, [board])

	// const loadTemplates = () => {
	// 	boardService.queryTemplates().then((template) => setTemplates(template))
	// 	// .then((templates) => setTemplatestes(templates))
	// }

	// const onSelectTemplate = async (templateId) => {
	// 	const template = await boardService.getById('tamplate', templateId)
	// 	const newBoard = await boardService.getEmptyBoard(template)
	// 	console.log('on Select', newBoard)
	// 	setBoards(newBoard)
	// 	dispatch(newBoard)
	// }

    const toggleDiv = (refType) => {
        refType.current.classList.toggle('hide')
    }

    const loadTemplates = () => {
        boardService.queryTemplates().then((template) => setTemplates(template))
        // .then((templates) => setTemplatestes(templates))
    }

    //////// !!!!!! NOT GOOD LOG
    const recentMap = (template) => {
        // console.log(template.viewedAt)
        return true
    }


    const onSelectTemplate = async (templateId) => {
        const template = await boardService.getById('tamplate', templateId)
        const newBoard = await boardService.getEmptyBoard(template)
        console.log('on Select', newBoard)
        setBoards(newBoard)
        dispatch(setCurrBoard(newBoard))
    }

    return <header className='secondary-header'>
        <div className='flex'>
            <h1 className="logo">Trello</h1>
            <section className="nav-header flex">
                <div className='header-btn' style={{ width: '100%' }}>
                    <button className="secondary-header-button" onClick={() => toggleDiv(refRecent)}>Recent
                        <i className="fa-solid fa-chevron-down"></i>
                        <section ref={refRecent} className='header-modal recent hide'>
                            <div className='modal-title'>
                                <h1 >Recent Boards</h1>
                                <button className='close-modal-btn' onClick={() => toggleDiv(refRecent)}>X</button>
                            </div>
                            <hr />
                            <ul>
                                {templates.map(template => {
                                    if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
                                        <img className='template-img' src={template.img} />
                                        <span>{template.title}</span>
                                    </li>
                                })}
                            </ul>
                        </section>
                    </button>
                    <button className="secondary-header-button" onClick={() => toggleDiv(refStarred)}>Starred
                        <i className="fa-solid fa-chevron-down"></i>
                        <section ref={refStarred} className='header-modal starred hide'>
                            <h1>Starred Boards:</h1>
                            <button onClick={() => toggleDiv(refStarred)}>X</button>
                            <hr />
                            <ul>
                                {templates.map(template => {
                                    if (template.isStared) return <li key={utilService.makeId()} id={template.id}> Hey<button onClick={() => { onSelectTemplate(template._id) }}>{template.title}</button></li>
                                })}
                            </ul>
                        </section>
                    </button>
                    <button className="secondary-header-button" onClick={() => toggleDiv(refTemplates)}>Templates
                        <i className="fa-solid fa-chevron-down"></i>
                        <section ref={refTemplates} className='header-modal templates hide'>
                            <h1>Templates:</h1>
                            <button onClick={() => toggleDiv(refTemplates)}>X</button>
                            <hr />
                            <ul>
                                {templates.map(template => {
                                    return <li key={utilService.makeId()} id={template.id}><button onClick={() => { onSelectTemplate(template._id) }}>{template.title}</button></li>
                                })}
                            </ul>
                        </section>
                    </button>
                    <button className="secondary-header-button" onClick={() => toggleDiv(refCreate)}>+
                        {/* <i className="fa-solid fa-chevron-down"></i> */}
                        <section ref={refCreate} className='header-modal recent hide'>
                            <h1>Create</h1>
                            <button onClick={() => toggleDiv(refCreate)}>X</button>
                            <hr />
                            <ul>
                                {templates.map(template => {
                                    if (recentMap(template)) return <li key={utilService.makeId()} id={template.id}><button onClick={() => { onSelectTemplate(template._id) }}>{template.title}</button></li>
                                })}
                            </ul>
                        </section>
                    </button>
                </div>
            </section>
        </div>
        <div className='flex'>
            <div className='header-search-div'>
                <label className='label-search flex'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input className='header-search' />
                </label>
            </div>
            <div style={{ height: 32 }} className='user-logo'></div>
        </div>
    </header>
}



////#####!!!!! for Media Query
{/* <button className="secondary-header-more-button" onClick={() => toggleDiv(refMore)}>More</button>
<section ref={refMore} className='select-more hide'>
<ul>
    <li>Hey</li>
    <li>Noam</li>
    <li>Bar</li>
</ul>
</section> */}
