import { boardService } from '../services/board.service.js'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	setCurrBoard,
	onSaveBoard,
	setFilter,
	setStarredBoards,
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
import { updateUser } from '../store/actions/user.actions.js'


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




	const [boardsToShow, setBoardsToShow] = useState([])
	const [filterVal, setFilterVal] = useState('')


	const [createButtonState, setCreateState] = useState('main-create')
	const [createModalTitle, setCreateModalTitle] = useState('Create')
	const refCreate1 = React.createRef()

	const refCreateFirstModal = React.createRef()
	const dispatch = useDispatch()


	const { currUser } = useSelector((state) => state.userModule)
	const { boards } = useSelector((state) => state.boardModule)
	const [staredBoards, setStaredBoards] = useState([])

	// const { starredBoards } = useSelector((state) => state.boardModule)


	const bg = currUser.imgUrl ? `url(${currUser.imgUrl}) center center / cover` : '#de350b'

	useEffect(() => {
		console.log(currUser);
	}, [])

	useEffect(() => {
		setBoardsToShow(boards)
	}, [boards])


	useEffect(() => {
		// loadUserStarredBoards()

	}, [currUser])

	useEffect(() => {
		if (!board._id) return
		onSend(board)
		navigate(`/boards/${board._id}`)
	}, [board])



	const onSearchBoard = ({ target }) => {
		const val = target.value
		setFilterVal(val)
	}

	const onSend = async (board) => {
		await dispatch(setCurrBoard(board._id))
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

	const onSetStar = async (ev, template) => {
		ev.stopPropagation()
		let newUser = await userService.setStarUser(currUser, template._id)
		await dispatch(updateUser(newUser))
	}

	const onGoBack = () => {
		setCreateModalTitle('Create')
		setCreateState('main-create')
	}


	const onSelectTemplate = async (templateId) => {
		const template = await boardService.getTemplateById(templateId)
		const newBoard = await boardService.getEmptyBoard(template)
		// setBoards(newBoard)
		dispatch(setCurrBoard(newBoard._id))
		// dispatch(onSaveBoard(newBoard))
		navigate(`/boards/${newBoard._id}`)
	}

	const onSelectBoard = async (board) => {
		dispatch(setCurrBoard(board._id))
		navigate(`/boards/${board._id}`)
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
			default:
				return
		}
	}


	const whichStar = (boardId) => {
		if (currUser.starred?.includes(boardId)) return <i
			className="fa-solid fa-star"
			style={{
				color: 'rgb(255,184,5)',
			}}
		></i>
		else return <i
			className="fa-regular fa-star"
		></i>
	}

	const getBackground = (board) => {
		let background
		if (currUser.boards.includes(board._id)) {
			background = board.style.backgroundImage ? `url${board.style.backgroundImage}` : board.style.backgroundColor
		} else {
			background = `url${board.img}`
		}
		return background


	}

	return (
		<header className="secondary-header flex">
			<div className="header-container flex">
				<h1 className="logo">
					<img src={trelloIcon} />
					<span>Mello</span>
				</h1>
				<section className="nav-header flex">
					<div className="header-btn" style={{ width: '100%' }}>

						<div className="button-top flex">
							<button
								className="secondary-header-button starred"
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
									{staredBoards.map((template) => {
										return (
											<li
												key={utilService.makeId()}
												// id={template.id}
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<div className="header-star-template">
													<div style={{ borderRadius: '3px', background: `${getBackground(template)} center center/cover`, height: '32px', width: '40px' }}></div>
													<span>{template.title}</span>
												</div>
												{!currUser.boards.includes(template._id) && <span className="template-indactor ">Template</span>}
											</li>
										)
									})}
								</ul>
							</section>
						</div>

						<div className="button-top flex">
							<button
								className="secondary-header-button templates"
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
									{templates.map((template, index) => {
										// if (recentMap(template)) return <li key={utilService.makeId()} id={template.id} onClick={() => { onSelectTemplate(template._id) }}>
										if (index < 7) return (
											<li
												key={utilService.makeId()}
												id={template.id}
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<div className="header-star-template">
													<div style={{ borderRadius: '3px', background: `url${template.img} center center/cover`, height: '32px', width: '40px' }}></div>
													{/* <img className="template-img" src={template.img} /> */}
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
								onClick={() => toggleModal(refCreateFirstModal)}><span className='create-for-responsive'>Create</span><span className='plus-for-responsive hide2'><i className="fa-solid fa-plus" style={{ outline: 'none', fontWeight: '700' }}></i></span></button>
							<section ref={refCreateFirstModal} className='header-modal create-first hide'>
								<div className='modal-title'>
									{createButtonState !== 'main-create' && <button className='on-go-back-button' onClick={onGoBack}><i className="fa fa-angle-left" ></i></button>}
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
													<img className="template-img" src={`url${template.img}`} />
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
							onChange={onSearchBoard}
							className="header-search"
							placeholder="Search"
							onFocus={() => {
								toggleModal(refCreate1)
							}}
							value={filterVal}
						/>
					</label>
					<section ref={refCreate1} className="header-modal search hide">
						<div className="modal-title" >
							<h1>Information</h1>
							<button
								className="close-modal-btn"
								onClick={() => toggleModal(refCreate1)}
							>
								X
							</button>
						</div>
						<hr />

						<ul>
							{/* <p className="search-offer">Recent Board</p> */}
							{boards.map(board => {
								if (board.title.toLowerCase().includes(filterVal.toLowerCase())) {
									return <li key={utilService.makeId()} id={board.id}>
										<span className="header-search-star" onClick={(event) => onSetStar(event, board)}>
											{whichStar(board._id)}
										</span>
										<span
											className="to-select-template"
											onClick={() => {
												onSelectBoard(board)
											}}
										>
											{board.style.backgroundImage && <div style={{ display: 'inline-block', borderRadius: '3px', background: `url${board.style.backgroundImage} center center/cover`, height: '32px', width: '40px' }}></div>}
											{!board.style.backgroundImage && <div style={{ display: 'inline-block', borderRadius: '3px', background: board.style.backgroundColor, height: '32px', width: '40px' }}></div>}
											<span className="">{board.title}</span>
											{/* <span className="template-indactor ">Template</span> */}
										</span>
									</li>
								}
							})}
							{templates.map((template, index) => {
								if (filterVal === '') {
									if (index > 4) {
										return
									}
								}
								if (template.title.toLowerCase().includes(filterVal.toLowerCase()))
									return (
										<li key={utilService.makeId()} id={template.id}>
											<span className="header-search-star" onClick={(event) => onSetStar(event, template)}>
												{whichStar(template._id)}
											</span>
											<span
												className="to-select-template"
												onClick={() => {
													onSelectTemplate(template._id)
												}}
											>
												<div style={{ display: 'inline-block', borderRadius: '3px', background: `url${template.img} center center/cover`, height: '32px', width: '40px' }}></div>

												<span className="">{template.title}</span>
												<span className="template-indactor ">Template</span>
											</span>
										</li>

									)
							})}
						</ul>
					</section>
				</div>
				<div className="button-top info flex">
					<label className='info-label'>
						<button
							className="secondary-header-button info"
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

				<div className="button-top bell flex">
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

				>{!currUser.imgUrl && <span>{boardService.getInitials(currUser.fullname)}</span>}
				</div>
			</div>
		</header>
	)
}
