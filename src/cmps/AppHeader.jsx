import { useRef } from 'react'
import { Link } from 'react-router-dom'

export function AppHeader() {

	const navMenuRef = useRef()
	const closeNavMenuRef = useRef()
	const openNavMenuRef = useRef()


	const toggleMenu = () => {
		navMenuRef.current.classList.toggle('nav-open')
		closeNavMenuRef.current.classList.toggle('none')
		openNavMenuRef.current.classList.toggle('hide')

	}
	return (
		<header className="main-header flex space-between ">
			<Link className="logo" to="/">
				<span className='fa-logo-container'><i class="fab fa-trello"></i></span><span>Mello</span>
			</Link>
			<section ref={navMenuRef} className="nav-header flex">
				<Link className="login" to="/login">
					Log in
				</Link>
				<Link className="signup" to="/signup">
					Sign up
				</Link>

			</section>
			<button ref={openNavMenuRef} className=" btn-menu " onClick={toggleMenu}><i class="fa-solid fa-bars"></i></button>
			<button ref={closeNavMenuRef} className=" close-menu none" onClick={toggleMenu}>   <i className="fa-solid fa-xmark"></i></button>
		</header>
	)
}
