import { Link } from 'react-router-dom'

export function AppHeader() {
	return (
		<header className="main-header flex space-between">
			<Link to="/">
				<h1 className="logo">Trello</h1>
			</Link>
			<section className="nav-header flex">
				<button className="login">Log in</button>
				<Link to="signup">
					<button className="signup">Sign up</button>
				</Link>
			</section>
		</header>
	)
}
