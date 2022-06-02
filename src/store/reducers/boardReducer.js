


const INITIAL_STATE = {
    currBoard: {},
    // boards: null,
    // filterBy: null
    board: null,
    isTaskDetailScreenOpen: false
}

export function boardReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_CURRBOARD':
            return {
                ...state,
                currBoard: action.board

            }
        case 'SET_IS_TASK_DETAILS_SCREEN_OPEN':
            return {
                ...state,
                isTaskDetailScreenOpen: action.isTaskDetailScreenOpen

            }

        case 'ADD_BOARD':
            return {
                ...state,
                board: [...state.robots, action.robot]
            }

        case 'REMOVE_ROBOT':
            return {
                ...state,
                robots: state.robots.filter(robot => robot._id !== action.robotId)
            }

        case 'UPDATE_ROBOT':
            return {
                ...state,
                robots: state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}