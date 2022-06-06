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
	removeCard,
	copyCard,
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
	calculateProg,
	addTodo,
	updateTodo
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

async function createList(board, title) {
	const updatedBoard = { ...board }
	const id = utilService.makeId()
	const list = { id, title, tasks: [] }
	updatedBoard.groups.push(list)
	return updatedBoard
}

async function copyCard(task, group, board) {
	const updatedBoard = { ...board }
	const taskCopy = { ...task }
	const newId = utilService.makeId()
	console.log(newId)
	taskCopy.id = newId
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	updatedBoard.groups[groupIdx].tasks.push(taskCopy)
	return updatedBoard
}

async function removeCard(board, group, taskId) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(_task => _task.id === taskId)
	updatedBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
	return updatedBoard
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
	const groupIdx = updatedBoard.groups.findIndex((_group) => _group.id === group.id)
	let task = updatedBoard.groups[groupIdx].tasks.find((task) => task.id === taskId)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex((task) => task.id === taskId)
	if (task.labelIds) {
		const labelIdx = task.labelIds?.findIndex((_labelId) => _labelId === labelId)
		console.log(labelIdx)
		if (labelIdx !== -1) task.labelIds?.splice(labelIdx, 1)
		else task.labelIds.push(labelId)
	} else task.labelIds = [labelId]
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

async function addTodo(board, group, task, todoTitle) {
	const id = utilService.makeId()
	const newTodo = { title: todoTitle, id: id, isDone: false }
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	newBoard.groups[groupIdx].tasks[taskIdx].checklist.todos.push(newTodo)
	console.log(newBoard)
	return newBoard
}

async function updateTodo(board, group, task, todo) {
	console.log("ON BOARD SERVICE LOGGER", todo)
	const newTodo = { ...todo, isDone: !todo.isDone }
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	const todoIdx = newBoard.groups[groupIdx].tasks[taskIdx].checklist.todos.findIndex(
		(_todo) => _todo.id === todo.id
	)
	console.log("ON BOARD SERVICE LOGGER", newTodo)
	newBoard.groups[groupIdx].tasks[taskIdx].checklist.todos.splice(todoIdx,1,newTodo)
	return newBoard

}

function calculateProg(task) {
	// if(task.checklist.todos===[]) return 0
	let todoLength = task.checklist.todos.length;
	if (todoLength === 0) todoLength = 1
	const todoDone = task.checklist.todos.filter(todo => todo.isDone)
	// console.log('board Service ', todoLength);
	let integer =Math.trunc(((todoDone.length / todoLength) * 100))
	return integer
}