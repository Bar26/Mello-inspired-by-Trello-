import  {SOCKET_EMIT_BOARD_UPDATE}  from '../../services/socket.service'
import { boardService } from '../../services/board.service.js'
import { socketService, SOCKET_EMIT_UPDATED_BOARD } from '../../services/socket.service.js'

export function setCurrBoard(boardId) {
	return async (dispatch) => {
		let currBoard
		try {
			currBoard = await boardService.getById(boardId, true) ///CHECK
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

export function setIsTaskDetailsScreenOpen(isTaskDetailScreenOpen) {    //NOT IN USE FOR NOW
	return (dispatch) =>
		dispatch({
			type: 'SET_IS_TASK_DETAILS_SCREEN_OPEN',
			isTaskDetailScreenOpen,
		})
}


export function setCurrBoards(currUser) {
	return async (dispatch) => {
		try {
			Promise.all(currUser.boards?.map(async (boardId) => {
				const board = await boardService.getById(boardId)
				return board
				
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


export function addTask(taskTitle, group, currBoard) {
	return async (dispatch, getState) => {
		try {
			const state=getState()
			const {currUser}=state.userModule
			const board = await boardService.createTask(taskTitle, group, currBoard, currUser)
			console.log(currBoard);
			dispatch(onSaveBoard(board))
	
		} catch (err) {
			console.log('Cant add task', err)
		}
	}
}


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
	} catch {
		console.err();
	}
	}
	
}

export function onSaveBoard(board) {
	socketService.emit(SOCKET_EMIT_BOARD_UPDATE, board)
	
	return async (dispatch) => {
		try {
			socketService.emit(SOCKET_EMIT_UPDATED_BOARD,board)
			const savedBoard = await boardService.update(board)
			dispatch({ type: 'SAVE_BOARD', board: {...savedBoard} })
		} catch (err) {
			console.log('BoardActions: err in onSaveBoard', err)
		}
	}
}
