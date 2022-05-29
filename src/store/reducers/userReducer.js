import { userService } from '../../services/user.service.js'

const INITIAL_STATE = {
	// user: userService.getLoggedinUser(),
	users: [],
}
export function userReducer(state = INITIAL_STATE, action) {
	var newState = state
	switch (action.type) {
		case 'SET_USER':
			newState = { ...state, user: action.user }
			break
		case 'SET_USER':
			newState = { ...state, watchedUser: action.user }
			break
		case 'REMOVE_USER':
			newState = {
				...state,
				users: state.users.filter((user) => user._id !== action.userId),
			}
			break
		case 'SET_USERS':
			newState = { ...state, users: action.users }
			break

		default:
	}

	return newState
}
