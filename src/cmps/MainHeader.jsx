import { boardService } from '../services/board.service.js'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	setCurrBoard,
	onSaveBoard,
	setFilter,
} from '../store/actions/board.actions.js'
import { utilService } from '../services/util.service.js'
import { userService } from '../services/user.service.js'
import trelloIcon from '../assets/img/trello-icon.png'
import { useSelector } from 'react-redux'
import { socketService } from '../services/socket.service.js'


import { MainCreate } from './createModalHeader/MainCreate.jsx'
import { CreateBoardHeader } from './createModalHeader/CreateBoardHeader.jsx'
import { CreateTemplateHeader } from './createModalHeader/CreateTemplateHeader.jsx'
import { InfoBoardHeader } from './InfoBoardHeader.jsx'


export const MainHeader = () => {
	const [templates, setTemplates] = useState([])
	const [user, setUser] = useState({})
	const [board, setBoards] = useState({})
	const navigate = useNavigate()
	const refRecent = React.createRef()
	const refTemplates = React.createRef()
	const refStarred = React.createRef()
	const refCreate = React.createRef()
	const refInfo = React.createRef()


	const [createButtonState, setCreateState] = useState('main-create')
	const [createModalTitle, setCreateModalTitle] = useState('Create')
	const refCreate1 = React.createRef()

	const refCreateFirstModal = React.createRef()
	const dispatch = useDispatch()
	const { currUser } = useSelector((state) => state.userModule)
	const bg = currUser.imgUrl ? `url(${currUser.imgUrl}) center center / cover` : 'red'

	useEffect(() => {
		// socketService.setup()
	}, [])

	useEffect(() => {
		if (!board._id) return
		// loadTemplates()
		// await dispatch(onSaveBoard(board))
		onSend(board)
		navigate(`/boards/${board._id}`)
	}, [board])

	const onSend = async (board) => {
		await dispatch(setCurrBoard(board._id))
	}
	const loadUser = async () => {
		const user = await userService.getLoggedinUser()
		setUser(user)
	}

	const toggleModal = async (refType) => {
		try {
			refType.current.classList.toggle('hide')
			const templates = await boardService.queryTemplates()
			setTemplates(templates)
		} catch (err) {
			console.log('cannot get templates', err);
		}

	}

	const onSetStar = (ev, template) => {
		ev.stopPropagation()
		boardService.setStarred(template)
	}

	//////// !!!!!! NOT GOOD LOG
	const recentMap = (template) => {
		// console.log(template.viewedAt)
		return true
	}


	const onGoBack = () => {
		setCreateModalTitle('Create')
		setCreateState('main-create')
	}


	// console.log('template', templates);
	const onSelectTemplate = async (templateId) => {
		const template = await boardService.getTemplateById(templateId)
		const newBoard = await boardService.getEmptyBoard(template)
		// setBoards(newBoard)
		dispatch(setCurrBoard(newBoard._id))
		// dispatch(onSaveBoard(newBoard))
		navigate(`/boards/${newBoard._id}`)
	}

	const onSearchTyping = () => { }

	const handleSearch = (ev) => {
		console.log(ev.target)
		const txt = ev.target.value
		dispatch(setFilter(txt))
		// console.log(board)
		// const returnedTasks = board.groups.map((group) => {
		// return group.task.map((task) => {
		// task.title.includs(txt)
		// return task
		// })
		// })
		// return returnedTasks
	}

	const DynamicCmp = () => {
		switch (createButtonState) {
			case 'main-create':
				return <MainCreate setCreateModalTitle={setCreateModalTitle} setCreateState={setCreateState}></MainCreate>
				break;
			case 'create-board':
				return <CreateBoardHeader></CreateBoardHeader>
				break;
			case 'create-template':
				return <CreateTemplateHeader onSelectTemplate={onSelectTemplate} setCreateModalTitle={setCreateModalTitle} setCreateState={setCreateState}></CreateTemplateHeader>
				break;
			// return <NoteTxt onTextClick={props.onTextClick} onDeleteNote={props.onDeleteNote} note={props.note} />
			// return <MainCreate  onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></MainBoardMenu>
			// case 'change-bgc': {
			// 	// return <NoteImg  onDeleteNote={props.onDeleteNote} note={props.note} />
			// 	// return <ChangeBgcModal menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcModal>
			// }
			default:
				return
		}
	}

	return (
		<header className="secondary-header flex">
			<div className="flex">
				<h1 className="logo">
					<img src={trelloIcon} />
					<span>Mello</span>
				</h1>
				<section className="nav-header flex">
					<div className="header-btn" style={{ width: '100%' }}>
						<div className="button-top flex">
							<button
								className="secondary-header-button"
								onClick={() => toggleModal(refRecent)}
							>
								<span>Recent</span>
								<i className="fa-solid fa-chevron-down"></i>
							</button>
							<section ref={refRecent} className="header-modal recent hide">
								<div className="modal-title">
									<h1>Recent Boards</h1>
									<button
										className="close-modal-btn"
										onClick={() => toggleModal(refRecent)}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
								<hr />
								<ul>
									{templates.map((template) => {
										// if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
										return (
											<li
												key={utilService.makeId()}
												id={template.id}
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<div className="header-star-template">
													<img className="template-img" src={template.img} />
													<span>{template.title}</span>
												</div>
												<span className="template-indactor">Template</span>
												<span className="header-star hide2">
													{template.isStared && (
														<i
															onClick={(event) => onSetStar(event, template)}
															className="fa-solid fa-star"
															style={{
																color: 'yellow',
																'--fa-border-color': 'black',
															}}
														></i>
													)}
													{!template.isStared && (
														<i
															onClick={(event) => onSetStar(event, template)}
															className="fa-regular fa-star"
														></i>
													)}
												</span>
											</li>
										)
									})}
								</ul>
							</section>
						</div>

						<div className="button-top flex">
							<button
								className="secondary-header-button"
								onClick={() => toggleModal(refStarred)}
							>
								<span>Starred</span>
								<i className="fa-solid fa-chevron-down"></i>
							</button>
							<section ref={refStarred} className="header-modal starred hide">
								<div className="modal-title">
									<h1>Starred Templates</h1>
									<button
										className="close-modal-btn"
										onClick={() => toggleModal(refStarred)}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
								<hr />
								<ul>
									{templates.map((template) => {
										// if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
										if (template.isStared)
											return (
												<li
													key={utilService.makeId()}
													id={template.id}
													onClick={() => {
														onSelectTemplate(template._id)
													}}
												>
													<div className="header-star-template">
														<img className="template-img" src={template.img} />
														<span>{template.title}</span>
													</div>
													./ <span className="template-indactor">Template</span>
												</li>
											)
									})}
								</ul>
							</section>
						</div>

						<div className="button-top flex">
							<button
								className="secondary-header-button"
								onClick={() => toggleModal(refTemplates)}
							>
								<span>Templates</span>
								<i className="fa-solid fa-chevron-down"></i>
							</button>
							<section
								ref={refTemplates}
								className="header-modal template hide"
							>
								<div className="modal-title">
									<h1>Templates</h1>
									<button
										className="close-modal-btn"
										onClick={() => toggleModal(refTemplates)}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
								<hr />
								<ul>
									{templates.map((template) => {
										// if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
										return (
											<li
												key={utilService.makeId()}
												id={template.id}
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<div className="header-star-template">
													<img className="template-img" src={template.img} />
													<span>{template.title}</span>
												</div>
												<span className="template-indactor">Template</span>
											</li>
										)
									})}
								</ul>
							</section>
						</div>

						<div className="button-top flex">
							<button className="secondary-header-button create"
								onClick={() => toggleModal(refCreateFirstModal)}>Create</button>
							<section ref={refCreateFirstModal} className='header-modal create-first hide'>
								<div className='modal-title'>
									<button className='on-go-back-button' onClick={onGoBack}>goBack</button>
									<h1 style={{ fontSize: '16px' }}>{createModalTitle}</h1>
									<button className="close-modal-btn" onClick={() => toggleModal(refCreateFirstModal)}>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
								<hr />
								<DynamicCmp></DynamicCmp>
							</section>
							<section ref={refCreate} className="header-modal recent hide">
								<div className="modal-title">
									<h1>Create</h1>
									<button
										className="close-modal-btn"
										onClick={() => toggleModal(refCreate)}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
								<hr />
								<ul>
									{templates.map((template) => {
										// if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
										return (
											<li
												key={utilService.makeId()}
												id={template.id}
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<div className="header-star-template">
													<img className="template-img" src={template.img} />
													<span>{template.title}</span>
												</div>
												<span className="template-indactor">Template</span>
											</li>
										)
									})}
								</ul>
							</section>
						</div>
					</div>
				</section>
			</div>
			<div className="header-finish flex">
				<div className="header-search-div">
					<label className="label-search flex">
						<i className="fa-solid fa-magnifying-glass"></i>
						<input
							onChange={handleSearch}
							className="header-search"
							placeholder="Search"
							onFocus={() => {
								toggleModal(refCreate1)
							}}
						/>
					</label>
					<section ref={refCreate1} className="header-modal hide">
						<ul>
							<p className="search-offer">Recent Board</p>
							{templates.map((template, index) => {
								return (
									index < 5 && (
										<li key={utilService.makeId()} id={template.id}>
											<span className="header-search-star">
												{template.isStared && (
													<i
														onClick={(event) => onSetStar(event, template)}
														className="fa-solid fa-star"
														style={{
															color: 'yellow',
															'--fa-border-color': 'black',
														}}
													></i>
												)}
												{!template.isStared && (
													<i
														onClick={(event) => onSetStar(event, template)}
														className="fa-regular fa-star"
													></i>
												)}
											</span>
											<span
												className="to-select-template"
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<img className="template-img" src={template.img} />
												<span className="">{template.title}</span>
												<span className="template-indactor">Template</span>
											</span>
										</li>
									)
								)
							})}
						</ul>
					</section>
				</div>
				<div className="button-top  flex">
					<label>
						<button
							className="secondary-header-button"
							onClick={() => toggleModal(refInfo)}
						></button>
						<i className="fa-regular fa-square-info"></i>
					</label>
					<section ref={refInfo} className="header-modal info-modal hide">
						<div className="modal-title">
							<h1>Information</h1>
							<button
								className="close-modal-btn"
								onClick={() => toggleModal(refInfo)}
							>
								X
							</button>
						</div>
						<hr />
						<InfoBoardHeader></InfoBoardHeader>

					</section>
				</div>

				{/* 
                <div className='button-top flex'>
                    <button className="secondary-header-button" onClick={() => toggleModal(refCreate)}>
                        Create</button>
                    <section ref={refCreate} className='header-modal recent hide'>
                        <div className='modal-title'>
                            <h1 >Create</h1>
                            <button className='close-modal-btn' onClick={() => toggleModal(refCreate)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <hr />
                        <ul>
                            {templates.map(template => {
                                // if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
                                return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
                                    <div className='header-star-template'>
                                        <img className='template-img' src={template.img} />
                                        <span>{template.title}</span>
                                    </div>
                                    <span className='template-indactor'>Template</span>
                                </li>
                            })}
                        </ul>
                    </section>
                </div > */}
				{/* <div className='header-finish flex'>
                <div className='header-search-div'>
                <label className='label-search flex'>
                <i className="fa-solid fa-magnifying-glass"></i>
                        <input onChange={handleSearch} className='header-search' placeholder='Search' onFocus={() => { toggleModal(refCreate1) }} />
                    </label>
                    <section ref={refCreate1} className='header-modal hide'>
                    <ul>
                    <p className='search-offer'>Recent Board</p>
                    {templates.map((template, index) => {
                        return (index < 5) && <li key={utilService.makeId()} id={template.id} >
                        <span className='header-search-star'>{template.isStared && <i onClick={(event) => onSetStar(event, template)} className="fa-solid fa-star" style={{ color: 'yellow', '--fa-border-color': 'black' }}></i>}
                        {!template.isStared && <i onClick={(event) => onSetStar(event, template)} class="fa-regular fa-star"></i>}</span>
                        <span className='to-select-template' onClick={() => { onSelectTemplate(template._id) }}>
                        <img className='template-img' src={template.img} />
                                        <span className=''>{template.title}</span>
                                        <span className='template-indactor'>Template</span>
                                    </span>
                                    </li>
                                }
                            )}
                            </ul>
                            </section>
                            </div>
                            <div className='button-top  flex'>
                            <label>
                            <button className="secondary-header-button" onClick={() => toggleModal(refInfo)}></button>
                        <i class="fa-regular fa-square-info"></i>
                    </label>
                    <section ref={refInfo} className='header-modal info-modal hide'>
                    <div className='modal-title'>
                    <h1 >Information</h1>
                    <button className='close-modal-btn' onClick={() => toggleModal(refInfo)}>X</button>
                    </div>
                        <hr />
                        <section className='info-img-div'>
                        <img src={infoImg} />
                        <div className='for-h3'>
                        <h3 >New to Trello? Check out the guide</h3>
                        </div>
                        <button>Get a new tip</button>
                        <hr />
                        <div className='info-button-buttom'>
                        <button>Pricing</button>
                        <button>Apps</button>
                        <button>Blog</button>
                        <button>Privacy</button>
                        <button>More...</button>
                        </div>
                        </section>
                        </section>
                    </div > */}
				<div className="button-top flex">
					<label>
						<button className="secondary-header-button"></button>
						<i className="fa-regular fa-bell"></i>
					</label>
				</div>
				<div
					className="user-logo"
					style={{
						background: bg,
						height: '32px'
					}}

				>{currUser.fullname.slice(0, 1)}
				</div>
			</div>
		</header>
	)
}
