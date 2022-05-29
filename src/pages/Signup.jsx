import { useState, useEffect } from 'react'
import { AppHeader } from '../cmps/header'
import { userService } from '../services/user.service.js'

export function Signup() {
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
		fullname: '',
	})

	const handleChange = (ev) => {
		const field = ev.target.name
		const value = ev.target.value
		setCredentials({ ...credentials, [field]: value })
	}

	const onSignup = () => {
		userService.saveLocalUser(credentials)
		setCredentials({
			username: '',
			password: '',
			fullname: '',
		})
	}

	return (
		<section>
			<AppHeader />
			<input
				type="text"
				name="fullname"
				value={credentials.fullname}
				placeholder="Fullname"
				onChange={handleChange}
				required
			/>
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

			<button onClick={onSignup}>Signup!</button>
		</section>
	)
}
