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
	updateTodo,
	deleteChecklist,
	createChecklist,
	toggleMemberToTask
}

async function query(filterBy = {}) {
	return httpService.get(`board`, filterBy)
}
async function queryTemplates(filterBy = {}) {
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
		newBoard._id = utilService.makeId()
		return storageService.post(STORAGE_KEY, newBoard)
	}
}

async function getById(id, fromLocal = false) {
	if (fromLocal) {
		return storageService.get(STORAGE_KEY, id)
	} else {
		return httpService.get(`board/${id}`)
	}
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
		if (labelIdx !== -1) task.labelIds?.splice(labelIdx, 1)
		else task.labelIds.push(labelId)
	} else task.labelIds = [labelId]
	updatedBoard.groups[groupIdx].tasks[taskIdx] = task
	return updatedBoard
}
async function toggleMemberToTask(board, group, taskId, memberId) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex((_group) => _group.id === group.id)
	let task = updatedBoard.groups[groupIdx].tasks.find((task) => task.id === taskId)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex((task) => task.id === taskId)
	if (task.memberIds) {
		const memberIdx = task.memberIds?.findIndex((_memberId) => _memberId === memberId)
		if (memberIdx !== -1) task.memberIds?.splice(memberIdx, 1)
		else task.memberIds.push(memberId)
	} else task.memberIds = [memberId]
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
async function createChecklist(board, group, task) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	let checklist = { id: utilService.makeId(), title: 'Check List', todos: [] }
	
	updatedBoard.groups[groupIdx].tasks[taskIdx].checklist=checklist
	console.log('AddingCheckList',updatedBoard)
	return updatedBoard
}

async function deleteChecklist(board, group, task) {
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	newBoard.groups[groupIdx].tasks[taskIdx].checklist={}
	return newBoard
}
async function addTodo(board, group, task, todoTitle) {
	const id = utilService.makeId()
	const newTodo = { title: todoTitle, id: id, isDone: false }
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	newBoard.groups[groupIdx].tasks[taskIdx].checklist.todos.push(newTodo)
	console.log(newBoard)
	return newBoard
}

async function updateTodo(board, group, task, todo) {
	console.log('ON BOARD SERVICE LOGGER', todo)
	const newTodo = { ...todo, isDone: !todo.isDone }
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	const todoIdx = newBoard.groups[groupIdx].tasks[
		taskIdx
	].checklist.todos.findIndex((_todo) => _todo.id === todo.id)
	console.log('ON BOARD SERVICE LOGGER', newTodo)
	newBoard.groups[groupIdx].tasks[taskIdx].checklist.todos.splice(
		todoIdx,
		1,
		newTodo
	)
	return newBoard
}

function calculateProg(task) {
	console.log(task);
	if(!task.checklist) return 
	let todoLength = task.checklist.todos.length;
	if (todoLength === 0) todoLength = 1
	const todoDone = task.checklist.todos.filter((todo) => todo.isDone)
	// console.log('board Service ', todoLength);
	let integer = Math.trunc((todoDone.length / todoLength) * 100)
	return integer
}
// addGuestBoardExp()
function addGuestBoardExp() {
	const board = {
	
		title: 'Scrum Workflow',
		archivedAt: 1589983468418,
		createdAt: 1589983468418,
		createdBy: {
			_id: 'u101',
			fullname: 'Itamar Sahar',
			imgUrl: 'http://some-img',
		},
		style: { backgroundColor: 'rgb(255, 159, 26)' },
		labels: [
			{
				id: 'l101',
				title: 'Done',
				backgroundColor: '#61bd4f',
			},
			{
				id: 'l102',
				title: 'Progress',
				backgroundColor: '#C70A80',
			},
			{
				id: 'l103',
				title: 'feature',
				backgroundColor: '#FBCB0A',
			},
			{
				id: 'l104',
				title: 'to-update',
				backgroundColor: '#590696',
			},
		],
		members: [
			{
				_id: 'u101',
				fullname: 'Noam Bar',
				imgUrl:
					'https://live-production.wcms.abc-cdn.net.au/ff1221fbfdb2fe163fdda15df5f77676?impolicy=wcms_crop_resize&cropH=394&cropW=700&xPos=0&yPos=37&width=862&height=485',
			},
		],
		groups: [
			{
				id: 'g101',
				title: 'Sprint Backlog',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c101',
						title: 'Replace logo',
						labelIds: ['l103', 'l104'],
					},
					{
						id: 'c102',
						title: 'CRUDL',
					},
					{
						id: 'c103',
						title: 'Design Home page',
						style: {
							backgroundColor: '#0079bf',
						},
					},
				],
				style: {},
			},
			{
				id: 'g102',
				title: 'Dev',
				tasks: [
					{
						id: 'c104',
						title: 'Login Auth',
					},
					{
						id: 'c105',
						title: 'Login Page',
						style: {
							backgroundColor: '#00c2e0',
						},
					},

					{
						id: 'c106',
						title: 'Data Structure',
					},
				],

				memberIds: ['u101'],
				labelIds: ['l101', 'l102'],
				createdAt: 1590999730348,
				dueDate: 16156215211,
				byMember: {
					_id: 'u101',
					username: 'Itamar',
					fullname: 'Itamar Sahar',
					imgUrl:
						'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
				},
				style: {
					backgroundColor: '#26de81',
				},
			},

			{
				id: 'g103',
				title: 'Code Review',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c107',
						title: 'Sign up Auth',
						style: {
							backgroundColor: '#51e898',
						},
					},
					{
						id: 'c108',
						title: 'Design Seup SCSS',
					},
				],
				style: {},
			},
			{
				id: 'g104',
				title: 'Testing',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c109',
						title: 'Google Login',
						style: {
							backgroundColor: '#ff78cb',
						},
					},
					{
						id: 'c110',
						title: 'DB Security',
					},
				],
				style: {},
			},
			{
				id: 'g105',
				title: 'Done',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c111',
						title: 'Home Page functionallity',
					},
					{
						id: 'c112',
						title: 'Login and Sign up pages Design',
						style: {
							backgroundColor: '#344563',
						},
					},

					{
						id: 'c113',
						title: 'Create Logo ',
					},
				],
				style: {},
			},
		],
		activities: [
			{
				id: 'a101',
				title: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Itamar Sahar',
					imgUrl: 'http://some-img',
				},
				task: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
		],
	}
	if (storageService.get(STORAGE_KEY, board._id)) {
		storageService.post(STORAGE_KEY, board)
	}
}
