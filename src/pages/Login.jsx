import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { boardService } from '../services/board.service.js'
import { onLogin, onLogout } from '../store/actions/user.actions.js'
import { setCurrUser } from '../store/actions/user.actions.js'

export function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	})
	const [isError, setIsError] = useState('')

	const handleChange = (ev) => {
		const field = ev.target.name
		const value = ev.target.value
		setCredentials({ ...credentials, [field]: value })
	}

	const onLoginUser = async () => {
		try {
			await dispatch(onLogin(credentials))
			navigate(`/boards`)
		} catch (err) {
			handleError()
		}
	}

	const handleError = () => {
		setIsError('show')
		setTimeout(setIsError, 2000, '')
	}

	const onSetGuestMode = async () => {
		let newScrum = await boardService.getBoardForGuest()
		await dispatch(
			setCurrUser({
				name: 'Guest',
				imgUrl:
					'https://res.cloudinary.com/dgjmjxkct/image/upload/v1653899076/dl6faof1ecyjnfnknkla_gxwbcq.svg',
				boards: [newScrum._id],
				starred: [newScrum._id]
			})
		)
		navigate(`/boards`)
	}

	return (
		<section className="sing-up-page">
			<AppHeader />
			<section className="sign-up">
				<h1 className="sign-up-title">Log in to your Trello account</h1>

				<input
					type="text"
					name="username"
					value={credentials.username}
					placeholder="Username"
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					value={credentials.password}
					placeholder="Password"
					onChange={handleChange}
					required
				/>

				<button className="sign-up-btn" onClick={onLoginUser}>
					Log in
				</button>
				<button className="guest-login-btn" onClick={onSetGuestMode}>
					<div>
						<img
							src="https://res.cloudinary.com/dgjmjxkct/image/upload/v1653899076/dl6faof1ecyjnfnknkla_gxwbcq.svg"
							className="button-icon-image guest"
						/>
						<p>Continue as Guest</p>
					</div>
				</button>
				<Link to="/">Back Home</Link>
				<div className={`log-in-error ${isError}`}>
					<h1>Wrong credentials</h1>
				</div>
			</section>
		</section>
	)
}
