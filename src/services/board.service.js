import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
const board = require('../data/board.json')
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
	copyTask
}

async function query() {
	const board = await storageService.query(STORAGE_KEY)

	return board
}
async function queryTemplates() {
	const templates = await storageService.query(STORAGE_KEY2)
	return templates
}

function setStarred(board) {
	if (!board.isStared) {
		board.isStared = true
	} else {
		board.isStared = false
	}
	storageService.put(STORAGE_KEY, board).then(console.log)
}

// async function add(title, style) {
// 	const loggedUser = userService.getLoggedinUser()
// 	const board = {
// 		isStarred: false,
// 		title,
// 		isPublic: false,
// 		createdAt: Date.now(),
// 		createdBy: loggedUser,
// 		style,
// 		archive: [],
// 		labels: [
// 			// green
// 			{
// 				id: 'l101',
// 				title: '',
// 				color: '#61bd4f',
// 			},
// 			// yellow
// 			{
// 				id: 'l102',
// 				title: '',
// 				color: '#f2d600',
// 			},
// 			// orange
// 			{
// 				id: 'l103',
// 				title: '',
// 				color: '#ff9f1a',
// 			},
// 			// red
// 			{
// 				id: 'l104',
// 				title: '',
// 				color: '#eb5a46',
// 			},
// 			// purple
// 			{
// 				id: 'l105',
// 				title: '',
// 				color: '#c377e0',
// 			},
// 			// blue
// 			{
// 				id: 'l106',
// 				title: '',
// 				color: '#0079bf',
// 			},
// 		],
// 		members: [{ ...loggedUser }],
// 		groups: [],
// 		activities: [],
// 	}
// 	try {
// 		const savedBoard = await httpService.post('board', board)
// 		return savedBoard
// 	} catch (err) {
// 		console.log('Cannot save board', err)
// 	}
// }

// async function addGroup(title, boardId) {
// 	const newGroup = {
// 		id: utilService.makeId(),
// 		title,
// 		tasks: [],
// 	}
// 	try {
// 		const board = await getById(boardId)
// 		board.groups.push(newGroup)

// 		update(board)
// 		return board
// 	} catch (err) {
// 		console.log('Cannot add group', err)
// 	}
// }

// async function addTask(title, groupId, boardId) {
// 	const taskToAdd = {
// 		id: utilService.makeId(),
// 		createdAt: Date.now(),
// 		title,
// 		style: {
// 			backgroundColor: null,
// 			backgroundImage: {
// 				title: null,
// 				url: null,
// 			},
// 		},
// 		description: '',
// 		dueDate: null,
// 		isDone: false,
// 		archiveAt: null,
// 		byMember: userService.getLoggedinUser(),
// 		checklists: [],
// 		labelIds: [],
// 		members: [],
// 		attachments: [],
// 		comments: [],
// 	}

// 	try {
// 		const board = await getById(boardId)
// 		const groupIdx = board.groups.findIndex((group) => group.id === groupId)
// 		board.groups[groupIdx].tasks.push(taskToAdd)

// 		update(board)
// 		return board
// 	} catch (err) {
// 		console.log('Cannot add task', err)
// 	}
// }
// if(res===[]){
// res = templates

// }
// .then(console.log)
// }

// "id":"t102",
// "title": "gaming",
// "img": "../src/assets/img/gaming.jpg",
// "createdAt": "new Date() ",
// "isStared" : false,
// "viewedAt": "new Date() "

function getEmptyBoard(template) {
	let newStyle
	if (template.img) {
		newStyle = { backgroundImage: template.img }
	} else {
		newStyle = { backgroundColor: template.color }
	}
	const newBoard = {
		title: template.title,
		// createdBy: {
		// "_id": "u101",
		// "fullname": "Itamar Sahar",
		// "imgUrl": "http://some-img"
		// },
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
		members: [],
		groups: [],
		activities: [],
		isStared: false,
	}
	return storageService.post(STORAGE_KEY, newBoard)
}

function getById(type, id) {
	// console.log('HELLOOOOOOO');
	return type === 'board'
		? storageService.get(STORAGE_KEY, id)
		: storageService.get(STORAGE_KEY2, id)
	// return axios.get(`/api/car/${carId}`)
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
