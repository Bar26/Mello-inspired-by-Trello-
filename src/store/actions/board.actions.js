import  {SOCKET_EMIT_BOARD_UPDATE}  from '../../services/socket.service'

import { boardService } from '../../services/board.service.js'
import {SOCKET_EMIT_ACTIVITY_ADDED} from '../../services/socket.service'
import { socketService, SOCKET_EMIT_UPDATED_BOARD } from '../../services/socket.service.js'

export function setCurrBoard(boardId) {
	return async (dispatch) => {
		let currBoard
		try {
			currBoard = await boardService.getById(boardId, true) ////////CHECK!!!!!!!!!!!!!!!
			if (!currBoard) {
				currBoard = await boardService.getById(boardId)
			}
		} catch (err) {
			console.error('Cannot set board', err)
		} finally {
			dispatch({ type: 'SET_BOARD', currBoard })
		}
	}
}
// export function setGuestCurrBoard(guestBoard) {
// 	return async (dispatch) => {
// 		try {
// 			dispatch({ type: 'SET_GUEST_BOARD', guestBoard })
// 		} catch (err) {
// 			console.log('Cannot set board', err)
// 		}
// 	}
// }

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
	return (dispatch) =>
		dispatch({
			type: 'SET_IS_TASK_DETAILS_SCREEN_OPEN',
			isTaskDetailScreenOpen,
		})
}

// export function loadBoards() {
// 	return async (dispatch) => {
// 		try {
// 			const boards = await boardService.query()
// 			const action = { type: 'SET_BOARDS', boards }
// 			dispatch(action)
// 		} catch (err) {
// 			console.log('Cant load boards', err)
// 		}
// 	}
// }

export function setCurrBoards(currUser) {
	return async (dispatch) => {
		try {
			Promise.all(currUser.boards?.map(async (boardId) => {
				// try {
				const board = await boardService.getById(boardId)
				return board
				// } catch (err) {
				// 	console.log('cannot get boards', err);
				// }
			})).then((currBoards) => {
				dispatch({ type: 'SET_BOARDS', boards: currBoards })
			})
		}catch(err){
			console.log(err);
		}
	}
}


export function onCopyTask(ev, task, group, currBoard) {
	return async (dispatch, getState) => {
		try {
			ev.stopPropagation()
			let state=getState()
			let {currUser}=state.userModule
			const updatedBoard = await boardService.copyTask(task, group, currBoard, currUser)
			await dispatch(onSaveBoard(updatedBoard))
		} catch (err) {
			console.log('Cant copy task', err)
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

export function onRemoveTask(ev,task,group, currBoard) {
	return async (dispatch,getState) => {
		try {
			ev.stopPropagation()
			const state=getState()
			const {currUser}=state.userModule
			const updatedBoard = await boardService.removeTask(currBoard,group,task, currUser )
			await dispatch(onSaveBoard(updatedBoard))
		} catch (err) {
			console.log('Cant remove task', err)
		}
	}
}

// export function addActivity(boardId, task, txt) {
// 	return async (dispatch) => {
// 		try {
// 			const board = await boardService.addActivity(boardId, task, txt)
// 			dispatch({ type: 'SAVE_BOARD', board })
// 			return board
// 		} catch (err) {
// 			console.log('BoardActions: err in loadBoard', err)
// 		}
// 	}
// }

// export function loadBoard(boardId) {
// 	return async (dispatch) => {
// 		try {
// 			const board = await boardService.getById(boardId)
// 			dispatch({ type: 'SET_BOARD', board })
// 			return board
// 		} catch (err) {
// 			console.log('BoardActions: err in loadBoard', err)
// 		}
// 	}
// }

export function addTask(taskTitle, group, currBoard) {
	return async (dispatch, getState) => {
		try {
			const state=getState()
			const {currUser}=state.userModule
			const board = await boardService.createTask(taskTitle, group, currBoard, currUser)
			dispatch(onSaveBoard(board))
	
		} catch (err) {
			console.log('Cant add task', err)
		}
	}
}


// export function addGroup(groupTitle, boardId) {
// 	return async (dispatch) => {
// 		try {
// 			const board = await boardService.addGroup(groupTitle, boardId)
// 			dispatch({
// 				type: 'SAVE_BOARD',
// 				board: board,
// 			})
// 		} catch (err) {
// 			console.log('Cant add group', err)
// 		}
// 	}
// }

// export function removeGroup(groupId, boardId) {
// 	return async (dispatch) => {
// 		try {
// 			const board = await boardService.removeGroup(groupId, boardId)
// 			dispatch({
// 				type: 'SAVE_BOARD',
// 				board,
// 			})
// 		} catch (err) {
// 			console.log('Cant remove group', err)
// 		}
// 	}
// }

// export function addChecklist(
// 	checklistTitle,
// 	groupId,
// 	board,
// 	taskId,
// 	activityTxt = null
// ) {
// 	return async (dispatch) => {
// 		try {
// 			const updatedBoard = await boardService.addChecklist(
// 				checklistTitle,
// 				groupId,
// 				board._id,
// 				taskId,
// 				activityTxt
// 			)
// 			dispatch({
// 				type: 'SAVE_BOARD',
// 				board: updatedBoard,
// 			})
// 		} catch (err) {
// 			console.log('Cant add checklist', err)
// 		}
// 	}
// }

// export function updateTask(
// 	boardId,
// 	groupId,
// 	taskId,
// 	taskToUpdate,
// 	activityTxt = null,
// 	isComment = false
// ) {
// 	return async (dispatch) => {
// 		try {
// 			const board = await boardService.updateTask(
// 				boardId,
// 				groupId,
// 				taskId,
// 				taskToUpdate,
// 				activityTxt,
// 				isComment
// 			)
// 			dispatch({
// 				type: 'SAVE_BOARD',
// 				board: board,
// 			})
// 		} catch (err) {
// 			console.log('Cant update task', err)
// 		}
// 	}
// }
// export function updateTaskTest(board, taskToUpdate) {
// 	return async (dispatch) => {
// 		try {
// 			const boardToSave = await boardService.updateTaskTest(
// 				board._id,
// 				taskToUpdate
// 			)
// 			dispatch({
// 				type: 'SAVE_BOARD',
// 				board: boardToSave,
// 			})
// 		} catch (err) {
// 			console.log('Cant update task', err)
// 		}
// 	}
// }

export function onUpdateCover(currBoard, group, taskId, color) {
	return async (dispatch) => {
		try {
			const boardToSave = await boardService.updateCover(currBoard, group, taskId, color)
			await dispatch(onSaveBoard(boardToSave))


		} catch (err) {
			console.log('connot update cover of task', err)
		}
	}
}



export function onChangeColorStyle (currBoard,newStyle) {
	return async (dispatch)=>{
		try {
			
		const newBoard = await boardService.changeBoardStyle(currBoard, newStyle)
		await dispatch(onSaveBoard(newBoard))
		dispatch(setCurrBoard(newBoard._id))

  
		// setSelectedType('main-board')
		// setTitle('Menu')
	} catch {
		console.err();
	}
	}
	
}

// change to saveBoard
export function onSaveBoard(board) {
	console.log('in onsaveboard');
	socketService.emit(SOCKET_EMIT_BOARD_UPDATE, board)
	
	return async (dispatch) => {
		try {
			socketService.emit(SOCKET_EMIT_UPDATED_BOARD,board)
			const savedBoard = await boardService.update(board)
			dispatch({ type: 'SAVE_BOARD', board: savedBoard })
		} catch (err) {
			console.log('BoardActions: err in onSaveBoard', err)
		}
	}
}
