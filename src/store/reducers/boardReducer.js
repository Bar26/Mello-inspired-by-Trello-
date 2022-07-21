const initialState = {
	currBoard: {},
	boards: [],
	filterBy: { labels: [], members: [], txt: '' },
	isTaskDetailScreenOpen: false,
}

export function boardReducer(state = initialState, action) {
	let newState = state
	let boards
	switch (action.type) {
		case 'SET_BOARD':
			return (newState = { ...state, currBoard: action.currBoard })
		case 'SET_GUEST_BOARD':
			return (newState = { ...state, currBoard: action.guestBoard })
		case 'ADD_BOARD':
			return (newState = { ...state, boards: [...state.boards, action.board] })
		case 'SET_BOARDS':
			return (newState = { ...state, boards: action.boards })
		case 'SET_FILTER':
			return (newState = { ...state, filterBy: { ...action.filterBy } })

		case 'SAVE_BOARD':
			boards = state.boards.map((board) =>
				board._id === action.board._id ? action.board : board
			)
			// return (newState = { ...state, boards, board: { ...action.board } })
			return (newState = { ...state, boards})

		case 'SET_IS_TASK_DETAILS_SCREEN_OPEN':
			return {
				...state,
				isTaskDetailScreenOpen: action.isTaskDetailScreenOpen,
			}

		case 'REMOVE_BOARD':
			return {
				...state,
				boards: state.boards.filter((board) => board._id !== action.boardId),
			}

		default:
			return state
	}
}
