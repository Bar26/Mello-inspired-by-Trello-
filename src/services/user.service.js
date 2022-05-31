import { storageService } from './async-storage.service'
import { utilService } from './util.service.js'
// import { httpService } from './http.service'
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
	return storageService.query('user')
	// return httpService.get(`user`)
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
	await storageService.put('user', user)
	// user = await httpService.put(`user/${user._id}`, user)
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
}

async function login(userCred) {
	const users = await storageService.query('user')
	const user = users.find((user) => user.username === userCred.username)
	// const user = await httpService.post('auth/login', userCred)
	if (user) {
		console.log('3');
		// socketService.login(user._id)
		return saveLocalUser(user)
	}else {
		console.log('3');
		console.log('NEED TO SIGN IN !');
		throw new Error('service')
	}
}
async function signup(userCred) {
	const newUser = getEmptyUser(userCred)
	const user = await storageService.post('user', newUser)
	// const user = await httpService.post('auth/signup', userCred)
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
// 	return user.score
// }

function saveLocalUser(user) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

async function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser(user) {
	return {
		_id: '',
		fullname: user.fullname,
		username: user.username,
		password: user.password,
		boards: [],
		starredBoards: ['b101'],
		imgUrl:
			'https://res.cloudinary.com/dgjmjxkct/image/upload/v1653899076/dl6faof1ecyjnfnknkla_gxwbcq.svg',
		mentions: [],
	}
}

async function addBoardUser(boardId) {
	let user = await getLoggedinUser()
	user.boards = [...user.boards, boardId]
	console.log(user);
	return user
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
