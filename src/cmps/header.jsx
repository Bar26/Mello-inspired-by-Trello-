import { Link } from 'react-router-dom'

export function AppHeader() {
	return (
		<header className="main-header flex space-between">
			<Link className="logo" to="/">
				Trello
			</Link>
			<section className="nav-header flex">
				<Link className="login" to="/login">
					Log in
				</Link>
				<Link className="signup" to="/signup">
					Sign up
				</Link>
			</section>
		</header>
	)
}
