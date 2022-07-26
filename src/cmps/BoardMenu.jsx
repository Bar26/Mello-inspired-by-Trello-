import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { onSaveBoard } from "../store/actions/board.actions"
import { ChangeBgcColorsModal } from "./boardMenu/ChangeBgcColorsModal"
import { ChangeBgcModal } from "./boardMenu/ChangeBgcModal"
import { MainBoardMenu } from "./boardMenu/MainBoardMenu"
import { boardService } from "../services/board.service"

export const BoardMenu = ({ menuShow, toggleBoardMenu }) => {
	const [selectedType, setSelectedType] = useState('main-board')
	const [title, setTitle] = useState('Menu')
	const { currBoard } = useSelector((state) => state.boardModule)
	const dispatch=useDispatch()





	const DynamicCmp = ({ menuShow, selectedType, setSelectedType, onToggleBoardMenu }) => {
		// console.log(props.selectedType)
		switch (selectedType) {
			case 'main-board':
				return <MainBoardMenu menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></MainBoardMenu>

				break;
			case 'change-bgc':
				return <ChangeBgcModal menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcModal>

				break;
			case 'colors-modal':
				return <ChangeBgcColorsModal menuShow={menuShow} onToggleBoardMenu={onToggleBoardMenu} setSelectedType={setSelectedType} setTitle={setTitle}></ChangeBgcColorsModal>
				break;
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
			<h1 onClick={()=>{onChangeColorStyle('#001d4f')}}>gggg</h1>
			<h1>{title}</h1>
			<hr />
			<DynamicCmp menuShow={menuShow} selectedType={selectedType} setSelectedType={setSelectedType} onToggleBoardMenu={onToggleBoardMenu} setTitle={setTitle}></DynamicCmp>
		</section>
	)
}
