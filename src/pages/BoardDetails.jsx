// import { BoardGroup } from "../cmps/BoardGroup"
import { SecondaryHeader } from '../cmps/MainHeader'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/groupList'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'
import { TaskDetails } from '../cmps/TaskDetails'


export const BoardDeatails = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const { currBoard } = useSelector(state => state.boardModule)

	return (

		<section>
			<SecondaryHeader />
			<GroupList boardId={params.boardId} />
			<Outlet/>


		</section>

	)
}
