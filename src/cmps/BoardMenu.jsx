import { useState } from "react"
import { ChangeBgcColorsModal } from "./boardMenu/ChangeBgcColorsModal"
import { ChangeBgcModal } from "./boardMenu/ChangeBgcModal"
import { MainBoardMenu } from "./boardMenu/MainBoardMenu"

export const BoardMenu = ({ menuShow, toggleBoardMenu }) => {
	const [selectedType, setSelectedType] = useState('main-board')
	const [title,setTitle] = useState('Menu')


	const DynamicCmp = ({ menuShow,selectedType, setSelectedType, onToggleBoardMenu }) => {
		// console.log(props.selectedType)
		switch (selectedType) {
			case 'main-board': {
				// return <NoteTxt onTextClick={props.onTextClick} onDeleteNote={props.onDeleteNote} note={props.note} />
				return <MainBoardMenu menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></MainBoardMenu>
			}
			case 'change-bgc': {
				// return <NoteImg  onDeleteNote={props.onDeleteNote} note={props.note} />
				return <ChangeBgcModal menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcModal>
			}
			case 'colors-modal': {
				// return <NoteToDo loadNotes={props.loadNotes} onDeleteNote={props.onDeleteNote} note={props.note} />
				return <ChangeBgcColorsModal menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcColorsModal>
			}
			case 'note-video': {
				// return <NoteVideo onDeleteNote={props.onDeleteNote} note={props.note} />
			}
		}
	}



	const onToggleBoardMenu = () => {
		// setSelectedType('main-board')
		toggleBoardMenu()
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
            <h1>{title}</h1>
            <hr />
			<DynamicCmp menuShow={menuShow} selectedType={selectedType} setSelectedType={setSelectedType} onToggleBoardMenu={onToggleBoardMenu} setTitle={setTitle}></DynamicCmp>
		</section>
	)
}
