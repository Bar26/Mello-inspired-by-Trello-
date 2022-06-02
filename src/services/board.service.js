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
	toggleLabelToTask

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
	console.log(' in remove');
	let updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
	updatedBoard.groups.splice([groupIdx], 1)
	console.log(updatedBoard)

	return updatedBoard
}

async function changeCardTitle(board, group, taskId, value) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	updatedBoard.groups[groupIdx].tasks.find(task => task.id === taskId).title = value
	return updatedBoard

}

async function changeGroupTitle(board, group, value) {
	console.log('in change group title servie')
	const updatedBoard = { ...board }
	updatedBoard.groups.find(_group => _group.id === group.id).title = value
	return updatedBoard
}

async function toggleLabelToTask(board, group, taskId, labelId) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	let task = updatedBoard.groups[groupIdx].tasks.find(task => task.id === taskId)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
	const labelIdx=task.labelIds.findIndex(_labelId => _labelId === labelId)
	if(labelIdx!==-1) task.labelIds.splice(labelIdx,1)
	else task.labelIds.push(labelId)
	updatedBoard.groups[groupIdx].tasks[taskIdx]=task
	return updatedBoard
}

// ////&&Test DATA!!!!!!1
// storageService.post(STORAGE_KEY2, {
// 	"id": "t101",
// 	"name": "cleaning",
// 	"img": "../src/assets/img/cleaning.jpg",
// 	"createdAt": "new Date() ",
// 	"viewedAt": "new Date() "
// }).then(x => console.log(x))

// storageService.post(STORAGE_KEY2, {
// 	"id": "t102",
// 	"name": "gaming",
// 	"img": "../src/assets/img/gaming.jpg",
// 	"createdAt": "new Date() ",
// 	"viewedAt": "new Date() "
// }).then(x => console.log(x))

// storageService.post(STORAGE_KEY2, {
// 	"id": "t103",
// 	"title": "hello",
// 	"img": "../src/assets/img/hello.jpg",
// 	"createdAt": "new Date() ",
// 	"viewedAt": "new Date() "
// }).then(x => console.log(x))

// // [
// // 	{
// // 		"id": "t101",
// // 		"name": "cleaning",
// // 		"img": "../src/assets/img/cleaning.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},
// // 	{
// // 		"id": "t102",
// // 		"name": "gaming",
// // 		"img": "../src/assets/img/gaming.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},
// // 	{
// // 		"id": "t103",
// // 		"title": "hello",
// // 		"img": "../src/assets/img/hello.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},

// // 	{
// // 		"id": "t104",
// // 		"title": "home",
// // 		"img": "../src/assets/img/home.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},
// // 	{
// // 		"id": "t105",
// // 		"title": "new-project",
// // 		"img": "../src/assets/img/new-project.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},
// // 	{
// // 		"id": "t106",
// // 		"title": "next-trip",
// // 		"img": "../src/assets/img/next-trip.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},
// // 	{
// // 		"id": "t107",
// // 		"title": "orange",
// // 		"img": "../src/assets/img/orange.jpg",
// // 		"createdAt": "new Date() ",
// // 		"viewedAt": "new Date() "
// // 	},
// // 	{
// // 		"id": "t108",
// 		"title": "todos",
// 		"img": "../src/assets/img/todos.jpg",
// 		"createdAt": "new Date() ",
// 		"viewedAt": "new Date() "
// 	},
// 	{
// 		"id": "t109",
// 		"title": "diet-plan",
// 		"img": "../src/assets/img/diet-plan.jpg",
// 		"createdAt": "new Date() ",
// 		"viewedAt": "new Date() "
// 	}
// ]

// storageService
// 	.post(STORAGE_KEY, {
// 		_id: 'b101',
// 		title: 'Trello',
// 		archivedAt: 1589983468418,
// 		createdAt: 1589983468418,
// 		createdBy: {
// 			_id: 'u101',
// 			fullname: 'Itamar Sahar',
// 			imgUrl: 'http://some-img',
// 		},
// 		style: {},
// 		labels: [
// 			{
// 				id: 'l101',
// 				title: 'Done',
// 				color: '#61bd4f',
// 			},
// 			{
// 				id: 'l102',
// 				title: 'Progress',
// 				color: '#61bd33',
// 			},
// 		],
// 		members: [
// 			{
// 				_id: 'u101',
// 				fullname: 'Noam Bar',
// 				imgUrl: 'https://www.google.com',
// 			},
// 		],
// 		groups: [
// 			{
// 				id: 'g101',
// 				title: 'To Do',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c101',
// 						title: 'Replace logo',
// 					},
// 					{
// 						id: 'c102',
// 						title: 'Add Samples',
// 					},
// 				],
// 				style: {},
// 			},
// 			{
// 				id: 'g102',
// 				title: ' Progress',
// 				tasks: [
// 					{
// 						id: 'c103',
// 						title: 'Login Auth',
// 						archivedAt: 1589983468418,
// 					},
// 					{
// 						id: 'c104',
// 						title: 'Add Socket',
// 						status: 'in-progress',
// 						description: 'description',
// 						comments: [
// 							{
// 								id: 'ZdPnm',
// 								txt: 'also @yaronb please CR this',
// 								createdAt: 1590999817436.0,
// 								byMember: {
// 									_id: 'u101',
// 									fullname: 'Tal Tarablus',
// 									imgUrl:
// 										'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
// 								},
// 							},
// 						],
// 						checklists: [
// 							{
// 								id: 'YEhmF',
// 								title: 'Checklist',
// 								todos: [
// 									{
// 										id: '212jX',
// 										title: 'To Do 1',
// 										isDone: false,
// 									},
// 								],
// 							},
// 						],
// 						memberIds: ['u101'],
// 						labelIds: ['l101', 'l102'],
// 						createdAt: 1590999730348,
// 						dueDate: 16156215211,
// 						byMember: {
// 							_id: 'u101',
// 							username: 'Tal',
// 							fullname: 'Tal Tarablus',
// 							imgUrl:
// 								'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
// 						},
// 						style: {
// 							bgColor: '#26de81',
// 						},
// 					},
// 				],
// 				style: {},
// 			},
// 			{
// 				id: 'g103',
// 				title: 'QA',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c105',
// 						title: 'Remove Task',
// 					},
// 					{
// 						id: 'c106',
// 						title: 'Add Task',
// 					},
// 				],
// 				style: {},
// 			},
// 			{
// 				id: 'g104',
// 				title: 'BUGS',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c107',
// 						title: 'Handle Refresh',
// 					},
// 					{
// 						id: 'c108',
// 						title: 'Broken Image',
// 					},
// 				],
// 				style: {},
// 			},
// 			{
// 				id: 'g105',
// 				title: 'Done',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c109',
// 						title: 'Sign Up',
// 					},
// 					{
// 						id: 'c110',
// 						title: 'Home Page Design',
// 					},
// 				],
// 				style: {},
// 			},
// 		],
// 		activities: [
// 			{
// 				id: 'a101',
// 				title: 'Changed Color',
// 				createdAt: 154514,
// 				byMember: {
// 					_id: 'u101',
// 					fullname: 'Itamar Sahar',
// 					imgUrl: 'http://some-img',
// 				},
// 				task: {
// 					id: 'c101',
// 					title: 'Replace Logo',
// 				},
// 			},
// 		],
// 	})
// 	.then((x) => console.log(x))
