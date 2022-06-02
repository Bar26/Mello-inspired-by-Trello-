// import { BoardGroup } from "../cmps/BoardGroup"
import { SecondaryHeader } from '../cmps/MainHeader'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/groupList'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'
import { TaskDetails } from '../cmps/TaskDetails'
import { Screen } from '../cmps/Screen.jsx'


export const BoardDeatails = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector(state => state.boardModule)

	return (
		<section
			className="board-details"
			// style={{ backgroundImage: currBoard.style.backgroundColor }}
		>
			<SecondaryHeader />
			<section className='board-content'>
				<GroupList boardId={params.boardId} />
				<Outlet />
				<Screen/>

			</section>
		</section>
	)
}
