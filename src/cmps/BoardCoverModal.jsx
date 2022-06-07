import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onSaveBoard, setCurrBoard } from '../store/actions/board.actions'
export const BoardCoverModal = ({ coverMode, onSetCoverMode }) => {
	const { currBoard } = useSelector((state) => state.boardModule)
	const [board, setBoard] = useState({ ...currBoard })
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(onSaveBoard(board))
		dispatch(setCurrBoard(board._id))
	}, [board])

	const onChangeColorStyle = (newStyle) => {
		setBoard({ ...board, style: { backgroundColor: newStyle } })
		onSetCoverMode()
	}
	const onChangeImgStyle = (newStyle) => {
		setBoard({ ...board, style: { backgroundImage: `(${newStyle})`} })
		onSetCoverMode()
	}

	return (
		<section className={`cover-modal ${coverMode}`}>
			<div className="create-board-title">
				<button className="close-btn" onClick={onSetCoverMode}>
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
				Cover Board
			</div>

			<div className="colors-container">
				<label>Background</label>
				<div className="colors-wrapper">
					<div
						className="img-select"
						style={{
							background: `URL(https://wallpaperaccess.com/full/6879129.jpg) center center / cover`,
						}}
						onClick={() => {
							onChangeImgStyle('https://wallpaperaccess.com/full/6879129.jpg')
						}}
					></div>
					<div
						className="img-select"
						style={{
							background: `URL(https://i.pinimg.com/736x/bc/0e/09/bc0e09b8128012312eb392c59f36b9ef.jpg) center center / cover`,
						}}
						onClick={() => {
							onChangeImgStyle('https://i.pinimg.com/736x/bc/0e/09/bc0e09b8128012312eb392c59f36b9ef.jpg')
						}}
					></div>
					<div
						className="img-select"
						style={{
							background: `URL(https://4krelax.com/img/w-1.jpg) center center / cover`,
						}}
						onClick={() => {
							onChangeImgStyle('https://4krelax.com/img/w-1.jpg')
						}}
					></div>
					<div
						className="img-select"
						style={{
							background: `URL(https://images-na.ssl-images-amazon.com/images/I/81tlEXrWjAL.png) center center / cover`,
						}}
						onClick={() => {
							onChangeImgStyle('https://images-na.ssl-images-amazon.com/images/I/81tlEXrWjAL.png')
						}}
					></div>
					<div
						className="img-select"
						style={{
							background: `URL(https://i.pinimg.com/736x/87/ec/a0/87eca0aa25be58c27a4831853d1fcf85.jpg) center center / cover`,
						}}
						onClick={() => {
							onChangeImgStyle('https://i.pinimg.com/736x/87/ec/a0/87eca0aa25be58c27a4831853d1fcf85.jpg')
						}}
						
					></div>
					<div
						className="img-select"
						style={{
							background: `URL(https://img.wallpapersafari.com/desktop/1680/1050/86/40/bJ3UtF.jpg) center center / cover`,
						}}
						onClick={() => {
							onChangeImgStyle('https://img.wallpapersafari.com/desktop/1680/1050/86/40/bJ3UtF.jpg')
						}}
					></div>
					<button
						className="color-select red"
						onClick={() => {
							onChangeColorStyle('rgb(237, 90, 70)')
						}}
					></button>
					<button
						className="color-select yellow"
						onClick={() => {
							onChangeColorStyle('rgb(242, 214, 0)')
						}}
					></button>
					<button
						className="color-select turquoise"
						onClick={() => {
							onChangeColorStyle('rgb(81, 232, 152)')
						}}
					></button>
					<button
						className="color-select orange"
						onClick={() => {
							onChangeColorStyle('rgb(255, 159, 26)')
						}}
					></button>
					<button
						className="color-select blue"
						onClick={() => {
							onChangeColorStyle('#0079bf')
						}}
					></button>
					<button
						className="color-select purple"
						onClick={() => {
							onChangeColorStyle('rgb(195, 119, 224)')
						}}
					></button>
				</div>
			</div>
		</section>
	)
}
