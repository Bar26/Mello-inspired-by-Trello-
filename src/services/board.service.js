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
	setStarredTemplate,
	saveDesc,
	removeGroup,
	changeCardTitle,
	changeGroupTitle,
	toggleLabelToTask,
	createLabel,
	getTemplateById,
}

async function query(filterBy = {}) {
	return httpService.get(`board`, filterBy)
}
async function queryTemplates() {
	return httpService.get(`template`)
}

function setStarred(board) {
	board.isStared = !board.isStared
	return storageService.put(STORAGE_KEY, board)
}
function setStarredTemplate(template) {
	if (!template.isStared) {
		template.isStared = true
	} else {
		template.isStared = false
	}
	storageService.put(STORAGE_KEY2, template).then(console.log)
}

async function setTitle(newBoard) {
	try {
		console.log('newBoard', newBoard)
		return httpService.put(`board/${newBoard._id}`, newBoard)
	} catch {
		console.log('Service ERROR')
	}
}
async function getEmptyBoard(template, toSave = true) {
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
		groups: template.groups ? template.groups : [],
		activities: [],
		isStared: false,
	}
	if (toSave) {
		try {
			const savedBoard = await httpService.post('board', newBoard)
			return savedBoard
		} catch (err) {
			console.log('Cannot save board', err)
		}
	} else {
		return storageService.put(STORAGE_KEY, newBoard)
	}
}

async function getById(id) {
	return httpService.get(`board/${id}`)
}

async function getTemplateById(id) {
	return httpService.get(`template/${id}`)
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
	return httpService.put(`board/${board._id}`, board)
}

async function createTask(title) {
	const id = utilService.makeId()
	return { id, title }
}

async function createList(board,title) {
	const updatedBoard = { ...board }
	const id = utilService.makeId()
	const list = { id, title, tasks: [] }
	updatedBoard.groups.push(list)
	return updatedBoard
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

async function changeCardTitle(board, group, taskId, value) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	updatedBoard.groups[groupIdx].tasks.find((task) => task.id === taskId).title =
		value
	return updatedBoard
}

async function changeGroupTitle(board, group, value) {
	console.log('in change group title servie')
	const updatedBoard = { ...board }
	updatedBoard.groups.find((_group) => _group.id === group.id).title = value
	return updatedBoard
}

async function toggleLabelToTask(board, group, taskId, labelId) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	let task = updatedBoard.groups[groupIdx].tasks.find(
		(task) => task.id === taskId
	)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(
		(task) => task.id === taskId
	)
	const labelIdx = task.labelIds.findIndex((_labelId) => _labelId === labelId)
	if (labelIdx !== -1) task.labelIds.splice(labelIdx, 1)
	else task.labelIds.push(labelId)
	updatedBoard.groups[groupIdx].tasks[taskIdx] = task
	return updatedBoard
}

async function createLabel(board, group, task, backgroundColor, title) {
	const updatedBoard = { ...board }
	console.log(backgroundColor, title)
	const id = utilService.makeId()
	updatedBoard.labels.push({ id, backgroundColor, title })
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	console.log(groupIdx)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	updatedBoard.groups[groupIdx].tasks[taskIdx].labelIds.push(id)
	console.log(updatedBoard)
	return updatedBoard
}
