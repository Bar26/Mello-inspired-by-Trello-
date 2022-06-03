import { storageService } from './async-storage.service'
import { utilService } from './util.service.js'
import { httpService } from './http.service'
import { store } from '../store/store'
// import {
// 	socketService,
// 	SOCKET_EVENT_USER_UPDATED,
// 	SOCKET_EMIT_USER_WATCH,
// } from './socket.service'
// import { showSuccessMsg } from '../services/event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gWatchedUser = null;

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	saveLocalUser,
	getUsers,
	getById,
	remove,
	update,
	addBoardUser,
}

window.userService = userService

function getUsers() {
	// return storageService.query('user')
	return httpService.get(`user`)
}

function onUserUpdate(user) {
	// showSuccessMsg(
	// `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
	// )
	// store.dispatch({ type: 'SET_WATCHED_USER', user })
}

async function getById(userId) {
	const user = await storageService.get('user', userId)
	// const user = await httpService.get(`user/${userId}`)
	// gWatchedUser = user;

	// socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
	// socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
	// socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

	return user
}
function remove(userId) {
	return storageService.remove('user', userId)
	// return httpService.delete(`user/${userId}`)
}

async function update(user) {
	// await storageService.put('user', user)
	user = await httpService.put(`user/${user._id}`, user)
	// Handle case in which admin updates other user's details
	const loggedInUser = await getLoggedinUser()
	if (loggedInUser._id === user._id) {
		saveLocalUser(user)
	}
	return user
}

async function login(userCred) {
	// const users = await storageService.query('user')
	// const user = users.find((user) => user.username === userCred.username)
	const user = await httpService.post('auth/login', userCred)
	if (user) {
		// socketService.login(user._id)
		return saveLocalUser(user)
	} else {
		console.log('NEED TO SIGN IN !')
		throw new Error('service')
	}
}
async function signup(userCred) {
	// const newUser = getEmptyUser(userCred)
	// const user = await storageService.post('user', newUser)
	const user = await httpService.post('auth/signup', userCred)
	// socketService.login(user._id)

	return saveLocalUser(user)
}
async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	// socketService.logout()
	// return await httpService.post('auth/logout')
}

// async function changeScore(by) {
// 	const user = getLoggedinUser()
// 	if (!user) throw new Error('Not loggedin')
// 	user.score = user.score + by || by
// 	await update(user)
// 	return user.scoreW
// }

function saveLocalUser(user) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

async function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function addBoardUser(boardId) {
	let user = await getLoggedinUser()

	user.boards = [...user.boards, boardId]

	return user
}
