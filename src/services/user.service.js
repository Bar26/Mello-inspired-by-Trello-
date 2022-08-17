import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import {
	socketService,
} from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

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
	setStarUser,
	toggleBoardToMember
}

window.userService = userService

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await storageService.get('user', userId)
	return user
}
function remove(userId) {
	return storageService.remove('user', userId)
}

async function update(user) {
	await httpService.put(`user/${user._id}`, user)
	const loggedInUser = await getLoggedinUser()
	if (loggedInUser._id === user._id) {
		saveLocalUser(user)
	}
	return user
}

async function toggleBoardToMember(board, member) {
	const updatedUser = { ...member }
	const boardIdx = updatedUser.boards.findIndex((boardId) => boardId === board._id)
	if (board.createdBy._id !== member._id) {
		if (boardIdx !== -1) updatedUser.boards.splice(boardIdx, 1)
		else updatedUser.boards.push(board._id)
	}

	return updatedUser
}



async function login(userCred) {

	const user = await httpService.post('auth/login', userCred)
	if (user) {
		return saveLocalUser(user)
	} else {
		console.log('NEED TO SIGN IN !')
		throw new Error('service')
	}
}
async function signup(userCred) {
	const user = await httpService.post('auth/signup', userCred)
	socketService.login(user._id)
	return saveLocalUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	
}

function saveLocalUser(user) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

async function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function addBoardUser(boardId, user) {
	user.boards = [...user.boards, boardId]
	saveLocalUser(user)
	return user
}


async function setStarUser(user, boardId) {

	let boardIdIdx = user.starred?.findIndex(boardIdUser => boardId === boardIdUser)
	if (user.starred) {
		if (boardIdIdx === -1) user.starred.push(boardId)
		else user.starred.splice(boardIdIdx, 1)
	}
	else user.starred = [boardId]
	return user
}
