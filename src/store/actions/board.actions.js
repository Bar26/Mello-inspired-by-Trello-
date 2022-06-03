import { boardService } from '../../services/board.service.js'

export function setCurrBoard(boardId) {
	return async (dispatch) => {
		try {
			const currBoard = await boardService.getById(boardId)
			console.log('board from backend:', currBoard)
			console.log('boardID FOR BAR from backend:', boardId)
			dispatch({ type: 'SET_BOARD', currBoard })
		} catch (err) {
			console.log('Cannot set board', err)
		}
	}
}
export function setGuestCurrBoard(guestBoard) {
	return async (dispatch) => {
		try {
			console.log('board from guest:', guestBoard)
			dispatch({ type: 'SET_GUEST_BOARD', guestBoard })
		} catch (err) {
			console.log('Cannot set board', err)
		}
	}
}

export function setFilter(filterBy) {
	return (dispatch) => {
		try {
			const action = { type: 'SET_FILTER', filterBy }
			dispatch(action)
		} catch (err) {
			console.log('Cant load boards', err)
		}
	}
}
export function setIsTaskDetailsScreenOpen(isTaskDetailScreenOpen) {
	// console.log("HEY FROM DISPATCH")
	console.log(isTaskDetailScreenOpen)
	return (dispatch) =>
		dispatch({
			type: 'SET_IS_TASK_DETAILS_SCREEN_OPEN',
			isTaskDetailScreenOpen,
		})
}

export function loadBoards() {
	return async (dispatch) => {
		try {
			const boards = await boardService.query()
			const action = { type: 'SET_BOARDS', boards }
			dispatch(action)
		} catch (err) {
			console.log('Cant load boards', err)
		}
	}
}

export function addBoard(boardToAdd) {
	return async (dispatch) => {
		try {
			const savedBoard = await boardService.add(
				boardToAdd.title,
				boardToAdd.style
			)
			const action = { type: 'ADD_BOARD', board: savedBoard }
			dispatch(action)
		} catch (err) {
			console.log('Cant load boards', err)
		}
	}
}

export function addActivity(boardId, task, txt) {
	return async (dispatch) => {
		try {
			const board = await boardService.addActivity(boardId, task, txt)
			dispatch({ type: 'SAVE_BOARD', board })
			return board
		} catch (err) {
			console.log('BoardActions: err in loadBoard', err)
		}
	}
}

export function loadBoard(boardId) {
	return async (dispatch) => {
		try {
			const board = await boardService.getById(boardId)
			dispatch({ type: 'SET_BOARD', board })
			return board
		} catch (err) {
			console.log('BoardActions: err in loadBoard', err)
		}
	}
}

export function addTask(taskTitle, groupId, boardId) {
	return async (dispatch) => {
		try {
			const board = await boardService.addTask(taskTitle, groupId, boardId)
			dispatch({
				type: 'SAVE_BOARD',
				board: board,
			})
		} catch (err) {
			console.log('Cant add task', err)
		}
	}
}

export function addGroup(groupTitle, boardId) {
	return async (dispatch) => {
		try {
			const board = await boardService.addGroup(groupTitle, boardId)
			dispatch({
				type: 'SAVE_BOARD',
				board: board,
			})
		} catch (err) {
			console.log('Cant add group', err)
		}
	}
}

export function removeGroup(groupId, boardId) {
	return async (dispatch) => {
		try {
			const board = await boardService.removeGroup(groupId, boardId)
			dispatch({
				type: 'SAVE_BOARD',
				board,
			})
		} catch (err) {
			console.log('Cant remove group', err)
		}
	}
}

export function addChecklist(
	checklistTitle,
	groupId,
	board,
	taskId,
	activityTxt = null
) {
	return async (dispatch) => {
		try {
			const updatedBoard = await boardService.addChecklist(
				checklistTitle,
				groupId,
				board._id,
				taskId,
				activityTxt
			)
			dispatch({
				type: 'SAVE_BOARD',
				board: updatedBoard,
			})
		} catch (err) {
			console.log('Cant add checklist', err)
		}
	}
}

export function updateTask(
	boardId,
	groupId,
	taskId,
	taskToUpdate,
	activityTxt = null,
	isComment = false
) {
	return async (dispatch) => {
		try {
			const board = await boardService.updateTask(
				boardId,
				groupId,
				taskId,
				taskToUpdate,
				activityTxt,
				isComment
			)
			dispatch({
				type: 'SAVE_BOARD',
				board: board,
			})
		} catch (err) {
			console.log('Cant update task', err)
		}
	}
}
export function updateTaskTest(board, taskToUpdate) {
	return async (dispatch) => {
		try {
			const boardToSave = await boardService.updateTaskTest(
				board._id,
				taskToUpdate
			)
			dispatch({
				type: 'SAVE_BOARD',
				board: boardToSave,
			})
		} catch (err) {
			console.log('Cant update task', err)
		}
	}
}

// change to saveBoard
export function onSaveBoard(board) {
	return async (dispatch) => {
		try {
			const savedBoard = await boardService.update(board)
			dispatch({ type: 'SAVE_BOARD', board: savedBoard })
		} catch (err) {
			console.log('BoardActions: err in onSaveBoard', err)
		}
	}
}
