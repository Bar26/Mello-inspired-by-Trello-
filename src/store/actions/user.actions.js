import { boardService } from '../../services/board.service.js'
import { userService } from '../../services/user.service.js'

export function loadUsers() {
	return async (dispatch) => {
		try {
			const users = await userService.getUsers()
			dispatch({ type: 'SET_USERS', users })
			return users
		} catch (err) {
			console.log('UserActions: err in loadUsers', err)
		}
	}
}

export function removeUser(userId) {
	return async (dispatch) => {
		try {
			await userService.remove(userId)
			dispatch({ type: 'REMOVE_USER', userId })
		} catch (err) {
			console.log('UserActions: err in removeUser', err)
		}
	}
}

export function onLogin(credentials) {
	return async (dispatch) => {
		try {
			const user = await userService.login(credentials)
			dispatch({
				type: 'SET_USER',
				user,
			})
		} catch (err) {
			throw err
		}
	}
}

export function onSignup(credentials) {
	return async (dispatch) => {
		let newScrum = await boardService.getBoardForGuest()
		let newCred = {...credentials, boards:[newScrum._id], starred:[newScrum._id]}
		try {
			const user = await userService.signup(newCred)

			dispatch({
				type: 'SET_USER',
				user,
			})
			dispatch({
				type: 'ADD_USER',
				user
			}
			)
		} catch (err) {
			console.log('Cannot signup', err)
		}
	}
}

export function onLogout() {
	return async (dispatch) => {
		try {
			await userService.logout()
			dispatch({
				type: 'SET_USER',
				user: {},
			})
		} catch (err) {
			console.log('Cannot logout', err)
		}
	}
}

export function setCurrUser(user) {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_USER',
				user,
			})
		} catch (err) {
			console.log('Cannot SET USER', err)
		}
	}
}

export function getUser() {
	return async (dispatch) => {
		try {
			let user = await userService.getLoggedinUser()
			dispatch({
				type: 'SET_USER',
				user,
			})
		}
		catch (err) {
			console.log('Cannot SET USER', err)
		}
	}
}

export function updateUser(user) {
	return async (dispatch) => {
		try {
			let updatedUser = await userService.update(user)
			 dispatch({ type: 'SAVE_USER', user:updatedUser })
		} catch (err) {
			console.log('cannot save user', err);
		}
	}
}


