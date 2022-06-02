import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// const board = require('../data/board.json')
const templates = require('../data/templete.json')

const STORAGE_KEY = 'Board'
const STORAGE_KEY2 = 'Template'

export const boardService = {
	query,
	queryTemplates,
	setStarred,
	getById,
	update,
	createTask,
	getEmptyBoard,
	removeTask,
	copyTask,
	setTitle,
	createList,
	getTaskGroupById,
	saveDesc,
	removeGroup,
}

async function query(filterBy = {}) {
	return httpService.get(`board`, filterBy)
	// const board = await storageService.query(STORAGE_KEY)

	// return board
}
async function queryTemplates(filterBy = {}) {
	return httpService.get(`templete`, filterBy)
}

function setStarred(board) {
	board.isStared = !board.isStared
	return storageService.put(STORAGE_KEY, board)
}

async function setTitle(newBoard) {
	try {
		return storageService.put(STORAGE_KEY, newBoard)
	} catch {
		console.log('Service ERROR')
	}
}
async function getEmptyBoard(template) {
	let newStyle
	if (template.img) {
		newStyle = { backgroundImage: template.img }
	} else {
		newStyle = { backgroundColor: template.color }
	}
	const newBoard = {
		title: template.title,
		createdBy: await userService.getLoggedinUser(),
		style: newStyle,
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
			{
				id: 'l102',
				title: 'Progress',
				color: '#61bd33',
			},
		],
		members: [await userService.getLoggedinUser()],
		groups: [],
		activities: [],
		isStared: false,
	}
	try {
		const savedBoard = await httpService.post('board', newBoard)
		return savedBoard
	} catch (err) {
		console.log('Cannot save board', err)
	}
}

async function getById(id) {
	return httpService.get(`board/${id}`)
}

async function getTaskGroupById(board, taskId) {
	console.log(board)
	const group = board.groups.filter((group) =>
		group.tasks.find((task) => task.id === taskId)
	)[0]
	const task = group.tasks.find((task) => task.id === taskId)

	return { task, group }
}

async function saveDesc(board, groupId, taskId, desc) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(group) => group.id === groupId
	)
	updatedBoard.groups[groupIdx].tasks.find(
		(task) => task.id === taskId
	).description = desc
	return updatedBoard
}

async function update(board) {
	var updatedBoard
	updatedBoard = await storageService.put(STORAGE_KEY, board)

	return updatedBoard
}

async function createTask(title) {
	const id = utilService.makeId()
	return { id, title }
}

async function createList(title) {
	const id = utilService.makeId()
	return { id, title, tasks: [] }
}

async function copyTask(task) {
	const taskCopy = { ...task }
	const newId = utilService.makeId()
	taskCopy.id = newId
	return taskCopy
}

async function removeTask(board, groupIdx, taskIdx) {
	board.groups[groupIdx].tasks.splice(taskIdx, 1)

	return board
}
async function removeGroup(board, groupId) {
	console.log(' in remove')
	let updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(group) => group.id === groupId
	)
	updatedBoard.groups.splice([groupIdx], 1)
	console.log(updatedBoard)

	return updatedBoard
}
