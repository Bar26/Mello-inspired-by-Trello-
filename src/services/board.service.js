import { storageService } from './async-storage.service.js'

// const fs = require('fs')

// const board = require('../data/board.json')
// const templates = require('../data/templete.json')

// console.log('board', template)


// getJSONFromFile('../data/board.json', (err, board) => {
//     if (err) return console.log('Cannot read Pets file', err)
//     console.log('board', board)
// })

const STORAGE_KEY = 'Board'
const STORAGE_KEY2 = 'Template'
export const boardService = {
	query,
	queryTemplates,
	getById
}

async function query () {
	const board = await storageService.query(STORAGE_KEY)
	// console.log(board)
	return board
	// if(res===[]) res = board
}
async function queryTemplates() {
	// console.log(storageService.query(STORAGE_KEY2))
	const templates = await storageService.query(STORAGE_KEY2)
	// console.log(templates)
	return templates
	// if(res===[]){
		// res = templates
		
	// } 
	// .then(console.log)

}

function getById(type,id) {
    return (type==='board')? storageService.get(STORAGE_KEY, id):storageService.get(STORAGE_KEY2, id)
    // return axios.get(`/api/car/${carId}`)
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
