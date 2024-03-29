import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { date } from 'yup'

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
	changeTaskTitle,
	changeGroupTitle,
	toggleLabelToTask,
	createLabel,
	getTemplateById,
	calculateProg,
	addTodo,
	updateTodo,
	deleteChecklist,
	createChecklist,
	changeAttachmentTitle,
	addAttachment,
	makeAttachmentCoverTask,
	toggleMemberToTask,
	toggleMemberToBoard,
	deleteElement,
	updateCover,
	copyGroup,
	deleteDateElement,
	addDateToTask,
	checkBoxDueDate,
	uploadImgToBoard,
	changeBoardBGStyle,
	getInitials,
	changeChecklistTitle,
	getBoardForGuest,
}




async function query(filterBy = {}) {
	return httpService.get(`board`, filterBy)
}
async function queryTemplates(filterBy = {}) {
	return httpService.get(`template`)
}

function setStarred(board) {
	const updatedBoard = { ...board }
	updatedBoard.isStared = !updatedBoard.isStared
	return updatedBoard
}
function setStarredTemplate(template) {
	if (!template.isStared) {
		template.isStared = true
	} else {
		template.isStared = false
	}
	storageService.put(STORAGE_KEY2, template)
}

async function setTitle(newBoard) {
	try {
		return httpService.put(`board/${newBoard._id}`, newBoard)
	} catch {
		console.log('Service ERROR')
	}
}
async function getEmptyBoard(template, boardForGroups, toSave = true) {
	let newStyle
	if (template.img) {
		newStyle = { backgroundImage: template.img }
	} else if (template.color) {
		newStyle = { backgroundColor: template.color }
	} else if (template.style.backgroundImage) {
		newStyle = { backgroundImage: template.style.backgroundImage }
	}
	const newBoard = {
		title: template.title,
		createdBy: await userService.getLoggedinUser(),
		style: newStyle,
		labels: boardForGroups.labels ? boardForGroups.labels : [],
		members: boardForGroups.members ? boardForGroups.members : [await userService.getLoggedinUser()],
		groups: boardForGroups.groups ? boardForGroups.groups : [],
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
	}
	// else {
	// 	newBoard._id = utilService.makeId()
	// 	return storageService.post(STORAGE_KEY, newBoard)
	// }
}
async function getBoardForGuest(toSave = true) {
	let template = await getById('629e05339a28133be456c12a')
	let newStyle
	if (template.style.backgroundImage) {
		newStyle = { backgroundImage: template.style.backgroundImage }
	} else {
		newStyle = { backgroundColor: template.color }
	}
	const newBoard = {
		title: 'Try Out Now',
		createdBy: await userService.getLoggedinUser(),
		style: newStyle,
		labels: template.labels,
		members: template.members,
		groups: template.groups ? template.groups : [],
		activities: [],
		uploadImgs: template.uploadImgs,
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
	// if (fromLocal) {
	// 	return storageService.get(STORAGE_KEY, id)
	// } else {
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

async function createTask(title, group, currBoard, currUser) {
	const id = utilService.makeId()
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)
	const task = { id, title, labelIds: [], memberIds: [] }
	const updatedBoard = { ...currBoard }
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	updatedBoard.groups[groupIdx].tasks.push(task)
	updatedBoard.activities.unshift({ type: 'add-task', task, taskTitle: task.title, groupTitle: group.title, userName: currUser.fullname, userImg: currUser.imgUrl, createdAt })
	return updatedBoard
}


async function createList(board, title, user) {
	const updatedBoard = { ...board }
	const id = utilService.makeId()
	const group = { id, title, tasks: [] }
	updatedBoard.groups.push(group)
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)

	updatedBoard.activities.unshift({ type: 'add-group', groupTitle: group.title, userImg: user.imgUrl, userName: user.fullname, createdAt })
	return updatedBoard
}

async function copyTask(task, group, board, currUser) {
	const updatedBoard = { ...board }
	const taskCopy = { ...task }
	const newId = utilService.makeId()
	taskCopy.id = newId
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	updatedBoard.groups[groupIdx].tasks.push(taskCopy)
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)

	updatedBoard.activities.unshift({ type: "copy-task", task, taskCopy, taskTitle: task.title, groupTitle: group.title, userImg: currUser.imgUrl, userName: currUser.fullname, createdAt })
	return updatedBoard
}

async function copyGroup(group, board, user) {
	const updatedBoard = { ...board }
	const groupCopy = { ...group }
	const newId = utilService.makeId()
	groupCopy.id = newId
	updatedBoard.groups.push(groupCopy)
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)
	updatedBoard.activities.unshift({ type: 'copy-group', groupTitle: group.title, userImg: user.imgUrl, userName: user.fullname, createdAt })

	return updatedBoard
}

async function removeTask(board, group, task, user) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(_group => _group.id === group.id)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(_task => _task.id === task.id)
	updatedBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)

	updatedBoard.activities.unshift({ type: "remove-task", taskTitle: task.title, userImg: user.imgUrl, userName: user.fullname, createdAt })

	return updatedBoard
}
async function removeGroup(board, group, user) {
	let updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	updatedBoard.groups.splice([groupIdx], 1)
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)

	updatedBoard.activities.unshift({ type: 'remove-group', groupTitle: group.title, userImg: user.imgUrl, userName: user.fullname, createdAt })

	return updatedBoard
}

async function changeTaskTitle(board, group, taskId, value) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	updatedBoard.groups[groupIdx].tasks.find((task) => task.id === taskId).title =
		value
	return updatedBoard
}
async function changeChecklistTitle(board, group, taskId, value) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	updatedBoard.groups[groupIdx].tasks.find((task) => task.id === taskId).checklist.title =
		value
	return updatedBoard
}

async function changeGroupTitle(board, group, value) {
	const updatedBoard = { ...board }
	updatedBoard.groups.find((_group) => _group.id === group.id).title = value
	return updatedBoard
}
async function changeAttachmentTitle(board, group, task, value) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	updatedBoard.groups[groupIdx].tasks[taskIdx].attachment.title = value
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

async function toggleMemberToBoard(board, member) {
	const updatedBoard = { ...board }
	const memberIdx = updatedBoard.members.findIndex((m) => m._id === member._id)
	if (memberIdx !== -1 && updatedBoard.createdBy._id !== member._id) {
		updatedBoard.members.splice(memberIdx, 1)
		updatedBoard.tasks.map(task => {
			const memberIdx = task.memberIds?.findIndex((_memberId) => _memberId === member.id)
			if (memberIdx !== -1) task.memberIds?.splice(memberIdx, 1)
		})
	}
	else updatedBoard.members.push(member)
	return updatedBoard
}

async function createLabel(board, group, task, backgroundColor, title) {
	const updatedBoard = { ...board }
	const id = utilService.makeId()
	updatedBoard.labels.push({ id, backgroundColor, title })
	const groupIdx = updatedBoard.groups.findIndex(
		(_group) => _group.id === group.id
	)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	updatedBoard.groups[groupIdx].tasks[taskIdx].labelIds.push(id)
	return updatedBoard
}
async function createChecklist(board, group, task) {
	const updatedBoard = { ...board }
	const groupIdx = updatedBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === task.id)
	let checklist = { id: utilService.makeId(), title: 'Check List', todos: [] }
	updatedBoard.groups[groupIdx].tasks[taskIdx].checklist = checklist
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
	newBoard.groups[groupIdx].tasks[taskIdx].checklist = {}
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
	return newBoard
}
async function addAttachment(board, group, task, attachmentImg = null) {
	const newAttachment = { imgUrl: '', title: 'Uploded Img', createdAt: _getFormatedDate(new Date()) }
	if (attachmentImg !== null) newAttachment.imgUrl = attachmentImg
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	newBoard.groups[groupIdx].tasks[taskIdx].attachment = newAttachment
	if (attachmentImg !== null && newBoard.groups[groupIdx].tasks[taskIdx].style) newBoard.groups[groupIdx].tasks[taskIdx].style.isCover = false
	return newBoard
}

async function makeAttachmentCoverTask(board, group, task) {
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === task.id)
	if (!newBoard.groups[groupIdx].tasks[taskIdx].style) newBoard.groups[groupIdx].tasks[taskIdx].style = { isCover: false }
	else newBoard.groups[groupIdx].tasks[taskIdx].style.isCover = !newBoard.groups[groupIdx].tasks[taskIdx].style.isCover;
	return newBoard
}

async function updateTodo(board, group, task, todo) {
	const newTodo = { ...todo, isDone: !todo.isDone }
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(
		(_task) => _task.id === task.id
	)
	const todoIdx = newBoard.groups[groupIdx].tasks[
		taskIdx
	].checklist.todos.findIndex((_todo) => _todo.id === todo.id)
	newBoard.groups[groupIdx].tasks[taskIdx].checklist.todos.splice(
		todoIdx,
		1,
		newTodo
	)
	return newBoard
}

function updateCover(currBoard, group, taskId, color) {
	const updatedBoard = { ...currBoard }
	const groupIdx = updatedBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === taskId)
	let task = updatedBoard.groups[groupIdx].tasks[taskIdx]
	task.style ? task.style.backgroundColor = color : task.style = { backgroundColor: color }
	updatedBoard.groups[groupIdx].tasks[taskIdx] = task
	return updatedBoard

}

function calculateProg(task) {
	if (!task.checklist) return
	let todoLength = task.checklist.todos.length;
	if (todoLength === 0) todoLength = 1
	const todoDone = task.checklist.todos.filter((todo) => todo.isDone)
	let integer = Math.trunc((todoDone.length / todoLength) * 100)
	return integer
}

function deleteElement(board, group, task, key) {
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === task.id)
	delete newBoard.groups[groupIdx].tasks[taskIdx][key]
	return newBoard
}
function deleteDateElement(board, group, task, key) {
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === task.id)
	delete newBoard.groups[groupIdx].tasks[taskIdx].dates
	return newBoard
}


function addDateToTask(board, group, task, date) {
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === task.id)
	if (newBoard.groups[groupIdx].tasks[taskIdx].dates) {
		newBoard.groups[groupIdx].tasks[taskIdx].dates.dueDate = date
	}
	else {
		newBoard.groups[groupIdx].tasks[taskIdx].dates = { dueDate: date }
	}
	return newBoard
}


function checkBoxDueDate(board, group, task, isChecked) {
	let newBoard = { ...board }
	const groupIdx = newBoard.groups.findIndex((_group) => _group.id === group.id)
	const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((_task) => _task.id === task.id)
	newBoard.groups[groupIdx].tasks[taskIdx].dates.completed = isChecked
	return newBoard
}

function uploadImgToBoard(board, imgArr) {
	let newBoard = { ...board }
	newBoard.uploadImgs = imgArr
	return newBoard

}

function changeBoardBGStyle(style, currBoard, user) {
	const newBoard = { ...currBoard, style }
	let createdAt = new Date()
	createdAt = _getFormatedDate(createdAt)
	newBoard.activities.unshift({ type: 'change-BG', userName: user.fullname, userImg: user.imgUrl, createdAt })

	return newBoard
}


// addGuestBoardExp()
// function addGuestBoardExp() {
// 	const board = {

// 		title: 'Scrum Workflow',
// 		archivedAt: 1589983468418,
// 		createdAt: 1589983468418,
// 		createdBy: {
// 			_id: 'u101',
// 			fullname: 'Itamar Sahar',
// 			imgUrl: 'http://some-img',
// 		},
// 		style: { backgroundColor: 'rgb(255, 159, 26)' },
// 		labels: [
// 			{
// 				id: 'l101',
// 				title: 'Done',
// 				backgroundColor: '#61bd4f',
// 			},
// 			{
// 				id: 'l102',
// 				title: 'Progress',
// 				backgroundColor: '#C70A80',
// 			},
// 			{
// 				id: 'l103',
// 				title: 'feature',
// 				backgroundColor: '#FBCB0A',
// 			},
// 			{
// 				id: 'l104',
// 				title: 'to-update',
// 				backgroundColor: '#590696',
// 			},
// 		],
// 		members: [
// 			{
// 				_id: 'u101',
// 				fullname: 'Noam Bar',
// 				imgUrl:
// 					'https://live-production.wcms.abc-cdn.net.au/ff1221fbfdb2fe163fdda15df5f77676?impolicy=wcms_crop_resize&cropH=394&cropW=700&xPos=0&yPos=37&width=862&height=485',
// 			},
// 		],
// 		groups: [
// 			{
// 				id: 'g101',
// 				title: 'Sprint Backlog',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c101',
// 						title: 'Replace logo',
// 						labelIds: ['l103', 'l104'],
// 					},
// 					{
// 						id: 'c102',
// 						title: 'CRUDL',
// 					},
// 					{
// 						id: 'c103',
// 						title: 'Design Home page',
// 						style: {
// 							backgroundColor: '#0079bf',
// 						},
// 					},
// 				],
// 				style: {},
// 			},
// 			{
// 				id: 'g102',
// 				title: 'Dev',
// 				tasks: [
// 					{
// 						id: 'c104',
// 						title: 'Login Auth',
// 					},
// 					{
// 						id: 'c105',
// 						title: 'Login Page',
// 						style: {
// 							backgroundColor: '#00c2e0',
// 						},
// 					},

// 					{
// 						id: 'c106',
// 						title: 'Data Structure',
// 					},
// 				],

// 				memberIds: ['u101'],
// 				labelIds: ['l101', 'l102'],
// 				createdAt: 1590999730348,
// 				dueDate: 16156215211,
// 				byMember: {
// 					_id: 'u101',
// 					username: 'Itamar',
// 					fullname: 'Itamar Sahar',
// 					imgUrl:
// 						'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
// 				},
// 				style: {
// 					backgroundColor: '#26de81',
// 				},
// 			},

// 			{
// 				id: 'g103',
// 				title: 'Code Review',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c107',
// 						title: 'Sign up Auth',
// 						style: {
// 							backgroundColor: '#51e898',
// 						},
// 					},
// 					{
// 						id: 'c108',
// 						title: 'Design Setup SCSS',
// 					},
// 				],
// 				style: {},
// 			},
// 			{
// 				id: 'g104',
// 				title: 'Testing',
// 				archivedAt: 1589983468418,
// 				tasks: [
// 					{
// 						id: 'c109',
// 						title: 'Google Login',
// 						style: {
// 							backgroundColor: '#ff78cb',
// 						},
// 					},
// 					{
// 						id: 'c110',
// 						title: 'DB Security',
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
// 						id: 'c111',
// 						title: 'Home Page functionallity',
// 					},
// 					{
// 						id: 'c112',
// 						title: 'Login and Sign up pages Design',
// 						style: {
// 							backgroundColor: '#344563',
// 						},
// 					},

// 					{
// 						id: 'c113',
// 						title: 'Create Logo ',
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
// 	}
// 	if (storageService.get(STORAGE_KEY, board._id)) {
// 		storageService.post(STORAGE_KEY, board)
// 	}
// }



function _getFormatedDate(date) {
	const options = { month: 'short', day: 'numeric' };
	const MM = date.toLocaleString('en-us', options)
	const time = date.toLocaleTimeString()
	const createdAt = `${MM} ${time}`
	return createdAt
}

function getInitials(name) {
	let nameArr = name.split(' ')
	let nameInitials = nameArr[0].slice(0, 1)
	if (nameArr[1]) nameInitials = nameInitials + nameArr[1].slice(0, 1)
	return nameInitials
}