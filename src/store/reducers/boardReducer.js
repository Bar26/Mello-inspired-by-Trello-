


const INITIAL_STATE = {
    // boards: null,
    // filterBy: null
    board:null,
}

export function boardReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_BOARD':
            return {
                ...state,
                board: action.boards
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
                filterBy: {...action.filterBy}
            }

        default:
            return state;
    }
}