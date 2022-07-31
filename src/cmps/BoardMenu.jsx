import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { onSaveBoard, setCurrBoard } from "../store/actions/board.actions"
import { ChangeBgcColorsModal } from "./boardMenu/ChangeBgcColorsModal"
import { ChangeBgcModal } from "./boardMenu/ChangeBgcModal"
import { ChangeBgcPic } from "./boardMenu/ChangeBgcPic"
import { MainBoardMenu } from "./boardMenu/MainBoardMenu"

export const BoardMenu = ({ onChangeBGImgStyle, onUploadImg, onSetCoverMode, menuShow, toggleBoardMenu }) => {
	const [selectedType, setSelectedType] = useState('main-board')
	const [title, setTitle] = useState('Menu')
	const [lastSelectedType, setLastType] = useState('main-board')
	const [lastTitle, setLastTitle] = useState('Menu')



	const { currBoard } = useSelector((state) => state.boardModule)
	const dispatch = useDispatch()

	const palette = [
		'#61bd4f',
		'#ff9f1a',
		'#eb5a46',
		'#c377e0',
		'#0079bf',
		'#00c2e0',
		'#51e898',
		'#ff78cb',
		'#344563',
		'#519839'
	]

	const DynamicCmp = ({ menuShow }) => {
		// console.log(props.selectedType)
		switch (selectedType) {
			case 'main-board': {
				// return <NoteTxt onTextClick={props.onTextClick} onDeleteNote={props.onDeleteNote} note={props.note} />
				return <MainBoardMenu menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></MainBoardMenu>
			}
			case 'change-bgc': {
				// return <NoteImg  onDeleteNote={props.onDeleteNote} note={props.note} />
				return <ChangeBgcModal setLastType={setLastType} setLastTitle={setLastTitle} onChangeBGImgStyle={onChangeBGImgStyle} onUploadImg={onUploadImg} menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcModal>
			}
			case 'colors-modal': {
				// return <NoteToDo loadNotes={props.loadNotes} onDeleteNote={props.onDeleteNote} note={props.note} />
				return <ChangeBgcColorsModal setLastType={setLastType} setLastTitle={setLastTitle} onGoBack={onGoBack} menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcColorsModal>
			}
			case 'pics-modal': {
				return <ChangeBgcPic onChangeBGImgStyle={onChangeBGImgStyle} setLastType={setLastType} setLastTitle={setLastTitle} onGoBack={onGoBack} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcPic>
			}
		}
	}

	// const onSelect = async (newStyle) => {
	// 	// console.log(currBoard);
	// 	await onChangeColorStyle(newStyle)
	// 	// console.log(currBoard);
	// 	setTitle('Menu')
	// 	setSelectedType('main-board')
	// }

	const onToggleBoardMenu = () => {
		// setSelectedType('main-board')
		toggleBoardMenu()
	}

	// const onChangeColorStyle = async (newStyle) => {
	// 	try {
	// 		const newBoard = { ...currBoard, style: { backgroundColor: newStyle } }
	// 		await dispatch(onSaveBoard(newBoard))
	// 		setSelectedType('main-board')
	// 		setTitle('Menu')
	// 		// await dispatch(setCurrBoard(newBoard))
	// 	} catch {
	// 		console.err();
	// 	}
	// }

	// const setUpFunc = (lastType, lastTitle) => {
	// 	setTitle(lastTitle)
	// 	setSelectedType(lastType)
	// }

	const onGoBack = () => {
		const type = selectedType
		const titleToRem = title
		console.log(titleToRem, ' titlee');
		console.log(type, ' Selected');
		setSelectedType(lastSelectedType)
		setTitle(lastTitle)
		setLastType('main-board')
		setLastTitle('Menu')
	}

	return (
		<section className={`board-menu-details ${menuShow}`}>
			<button className="closebtn" onClick={onToggleBoardMenu}>
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					className="btn-content"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="none"
						stroke="#000"
						strokeWidth="2"
						d="M3,3 L21,21 M3,21 L21,3"
					></path>
				</svg>
			</button>
			{selectedType !== 'main-board' &&
				<button className="go-back" onClick={onGoBack}> goBack </button>
			}
			<h1>{title}</h1>
			<hr />
			<DynamicCmp menuShow={menuShow} ></DynamicCmp>
			<section className="activity">
				<header>
					<span></span>
					<span></span>
				</header>
				

			</section>

		</section>
	)
}
