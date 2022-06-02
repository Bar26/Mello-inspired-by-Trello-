export const BoardMenu = ({ menuShow, toggleBoardMenu }) => {
	const onToggleBoardMenu = () => {
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
			<h1>Menu</h1>
		</section>
	)
}
