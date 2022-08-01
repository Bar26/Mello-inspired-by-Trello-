import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppHeader } from '../cmps/AppHeader'
import { userService } from '../services/user.service.js'
import { onSignup } from '../store/actions/user.actions'
import { uploadService } from '../services/upload.service'
export function Signup() {


	const [imgUrl, setImgUrl] = useState('')
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
		fullname: '',
		imgUrl: imgUrl
	})
	// const [users, setUsers] = useState([])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	loadUsers()
	// }, [])

	// const loadUsers = async () => {
	// 	try {
	// 		const users = await userService.getUsers()
	// 		setUsers(users)
	// 	} catch {
	// 		console.error('Cannot load Users !')
	// 	}
	// }

	const onUploadImg = async (imgArr) => {
		// await dispatch(onSaveBoard(newBoard))
		// await dispatch(setCurrBoard(newBoard._id))
	}


	const onSelect = async (ev) => {
		let newImg = await uploadService.uploadImg(ev)
		console.log(newImg);
		// const boardUploaded = imgState
		// const imgArr = [...boardUploaded, newImg.url]
		// await onUploadImg(imgArr)
		// console.log(currBoard);
		// setImgState(imgArr)
	}


	const handleChange = async (ev) => {
		let value
		let field
		if (ev.target.type === 'file') {
			field = 'imgUrl'
			let tempVal = await uploadService.uploadImg(ev)
			// value = await uploadService.uploadImg(ev)
			value = tempVal.url
		}
		else {
			field = ev.target.name
			value = ev.target.value
		}
		setCredentials({ ...credentials, [field]: value })
	}

	const onSignupNewUser = () => {
		if (
			!credentials.username.length ||
			!credentials.password.length ||
			!credentials.fullname.length
		)
			return
		userService.saveLocalUser(credentials)
		dispatch(onSignup(credentials))

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
				<h1 className="sign-up-title">Sign up to Trello</h1>
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
				<input
					type="file"
					name="imgUrl"
					value={credentials.img}
					// placeholder=""
					onChange={handleChange}
				// required
				/>

				<button className="sign-up-btn" onClick={onSignupNewUser}>
					Signup!
				</button>
				<Link to="/">Back Home</Link>
			</section>
		</section>
	)
}
