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
			console.log('action', action)
			return (newState = { ...state, currBoard: action.currBoard })
		case 'SET_GUEST_BOARD':
			console.log('action', action)
			return (newState = { ...state, currBoard: action.guestBoard })
		case 'SET_BOARD':
			console.log('action', action)
			return (newState = { ...state, currBoard: action.currBoard })
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
			return (newState = { ...state, boards, board: { ...action.board } })

		case 'SET_IS_TASK_DETAILS_SCREEN_OPEN':
			return {
				...state,
				isTaskDetailScreenOpen: action.isTaskDetailScreenOpen,
			}

		case 'ADD_BOARD':
			return {
				...state,
				board: [...state.robots, action.robot],
			}

		case 'REMOVE_ROBOT':
			return {
				...state,
				robots: state.robots.filter((robot) => robot._id !== action.robotId),
			}

		case 'UPDATE_ROBOT':
			return {
				...state,
				robots: state.robots.map((robot) =>
					robot._id === action.robot._id ? action.robot : robot
				),
			}
		case 'SET_FILTER_BY':
			return {
				...state,
				filterBy: { ...action.filterBy },
			}

		default:
			return state
	}
}
