import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppHeader } from '../cmps/AppHeader'
import { userService } from '../services/user.service.js'
import {  onSignup, setCurrUser } from '../store/actions/user.actions'
import { uploadService } from '../services/upload.service'
import { boardService } from '../services/board.service'
import uploadSvg from '../assets/img/add-user-add-svgrepo-com.svg'

export function Signup() {



	const [imgUrl, setImgUrl] = useState('')
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
		fullname: '',
		imgUrl: imgUrl,
		boards: [],
		starred: []
	})
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleChange = async (ev) => {
		let value
		let field
		if (ev.target.type === 'file') {
			field = 'imgUrl'
			let tempVal = await uploadService.uploadImg(ev)
			value = tempVal.url
		}
		else {
			field = ev.target.name
			value = ev.target.value
		}

		setCredentials({ ...credentials, [field]: value })
	}

	const onSignupNewUser = async () => {
		if (
			!credentials.username.length ||
			!credentials.password.length ||
			!credentials.fullname.length
		)
			return
		await dispatch(onSignup(credentials))
		let newScrum = await boardService.getBoardForGuest()
		let newUser = { ...credentials, boards: [newScrum._id], starred: [newScrum._id] }
		newUser = await userService.update(newUser)
		await userService.saveLocalUser(newUser)
		dispatch(setCurrUser(newUser))

		setCredentials({
			username: '',
			password: '',
			fullname: '',
		})
		navigate(`/boards`)
	}

	return (
		<section className="sing-up-page">
			<AppHeader />
			<section className="sign-up">
				<h1 className="sign-up-title">Sign up to Mello</h1>
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
				<label className="file-label" > 
				<img className="upload-img" src={uploadSvg}/>
				<span className="file-label-txt">Upload a profile picture</span>
					<input
						className="file-input"
						type="file"
						name="imgUrl"
						value={credentials.img}
						onChange={handleChange}
						style={{visibility:"hidden"}}
					/></label>

				<button className="sign-up-btn" onClick={onSignupNewUser}>
					Signup!
				</button>
				<Link to="/">Back Home</Link>
			</section>
		</section>
	)
}
