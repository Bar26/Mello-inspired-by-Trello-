import { userService } from '../../services/user.service.js'

export function loadUsers() {
	return async (dispatch) => {
		try {
			const users = await userService.getUsers()
			console.log(users);
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
		try {
			const user = await userService.signup(credentials)

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

// export function getUser(user) {
// 	setCurrUser(user)
// }

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
			console.log(updatedUser, 'from updateuser in user actions');
			dispatch({ type: 'SAVE_USER', user: updatedUser })
			dispatch({ type: 'SET_USER', user: updatedUser })

		} catch (err) {
			console.log('cannot save user', err);
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
