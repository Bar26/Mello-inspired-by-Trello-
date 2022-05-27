import { useEffect, useState } from 'react'

export const CreateModal = ({ createMode, onSetCreateMode }) => {
	const [board, setBoard] = useState({ color: '', title: '' })

	const [btnActive, setBtnActive] = useState('')
	const onSetBoardColor = (newColor) => {
		setBoard({ ...board, color: newColor })
	}

	useEffect(() => {
		if (board.title.length) {
			setBtnActive('filled')
		} else {
			setBtnActive('')
		}
	}, [board.title])

	const handleChange = (ev) => {
		const value = ev.target.value
		setBoard({ ...board, title: value })
	}

	return (
		<section className={`create-modal ${createMode}`}>
			<div className="create-board-title">
				<button className="close-btn" onClick={onSetCreateMode}>
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
				Create Board 
			</div>

			<div className="img-preview" style={{ backgroundColor: board.color }}>
				<img src="https://res.cloudinary.com/dgjmjxkct/image/upload/v1653575898/Trello/board-preview.25c287ae7ad9fc2da090aeeddd284374_qjegso.svg" />
			</div>
			<div className="colors-container">
				<label>Background</label>
				<div className="colors-wrapper">
					<button
						className="color-select red"
						onClick={() => {
							onSetBoardColor('rgb(237, 90, 70)')
						}}
					></button>
					<button
						className="color-select yellow"
						onClick={() => {
							onSetBoardColor('rgb(242, 214, 0)')
						}}
					></button>
					<button
						className="color-select turquoise"
						onClick={() => {
							onSetBoardColor('rgb(81, 232, 152)')
						}}
					></button>
					<button
						className="color-select orange"
						onClick={() => {
							onSetBoardColor('rgb(255, 159, 26)')
						}}
					></button>
					<button
						className="color-select green"
						onClick={() => {
							onSetBoardColor('rgb(97, 189, 79)')
						}}
					></button>
					<button
						className="color-select purple"
						onClick={() => {
							onSetBoardColor('rgb(195, 119, 224)')
						}}
					></button>
				</div>
			</div>
			<div className="create-title">
				<label htmlFor="name">Board Title</label>
				<input name="title" type="text" onChange={handleChange} />
			</div>
			<button
				className={`create-btn ${btnActive}`}
				onClick={() => {
					if (board.title.length) console.log(board)
				}}
			>
				Create
			</button>
		</section>
	)
}
