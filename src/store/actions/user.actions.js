import { userService } from '../../services/user.service.js'

// import {
// 	socketService,
// 	SOCKET_EMIT_USER_WATCH,
// 	SOCKET_EVENT_USER_UPDATED,
// } from '../services/socket.service.js'

export function loadUsers() {
	return async (dispatch) => {
		try {
			dispatch({ type: 'LOADING_START' })
			const users = await userService.getUsers()
			dispatch({ type: 'SET_USERS', users })
		} catch (err) {
			console.log('UserActions: err in loadUsers', err)
		} finally {
			dispatch({ type: 'LOADING_DONE' })
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
		try {
			const user = await userService.signup(credentials)
			console.log(user, 'from store')

			dispatch({
				type: 'SET_USER',
				user,
			})
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

// export function loadAndWatchUser(userId) {
// 	return async (dispatch) => {
// 		try {
// 			const user = await userService.getById(userId)
// 			dispatch({ type: 'SET_WATCHED_USER', user })
// 			// TODO: refactor to service
// 			socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
// 			socketService.off(SOCKET_EVENT_USER_UPDATED)
// 			socketService.on(SOCKET_EVENT_USER_UPDATED, (user) => {

// 				dispatch({ type: 'SET_WATCHED_USER', user })
// 			})
// 		} catch (err) {

// 			console.log('Cannot load user', err)
// 		}
// 	}
// }