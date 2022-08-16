import { useState } from "react"
import { useSelector } from "react-redux"
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
		switch (selectedType) {
			case 'main-board': {
				return <MainBoardMenu menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></MainBoardMenu>
			}
			case 'change-bgc': {
				return <ChangeBgcModal setLastType={setLastType} setLastTitle={setLastTitle} onChangeBGImgStyle={onChangeBGImgStyle} onUploadImg={onUploadImg} menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcModal>
			}
			case 'colors-modal': {
				return <ChangeBgcColorsModal setLastType={setLastType} setLastTitle={setLastTitle} onGoBack={onGoBack} menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcColorsModal>
			}
			case 'pics-modal': {
				return <ChangeBgcPic onChangeBGImgStyle={onChangeBGImgStyle} setLastType={setLastType} setLastTitle={setLastTitle} onGoBack={onGoBack} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcPic>
			}
		}
	}

	const onToggleBoardMenu = () => {
		toggleBoardMenu()
	}

	const onGoBack = () => {
		setSelectedType(lastSelectedType)
		setTitle(lastTitle)
		setLastType('main-board')
		setLastTitle('Menu')
	}

	return (
		<section className={`board-menu-details ${menuShow}`}>
			<header className="menu-header">
			<button className="closebtn" onClick={onToggleBoardMenu}>
				   <i className="fa-solid fa-xmark"></i>
			</button>
			{selectedType !== 'main-board' &&
				<button className="go-back" onClick={onGoBack}> <i className="fa fa-angle-left" ></i> </button>
			}
			<h3 className="menu-title">{title}</h3>
			</header>
			<hr className="menu-hr" />
			
			<DynamicCmp menuShow={menuShow} ></DynamicCmp>
	

		</section>
	)
}
