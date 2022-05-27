// import { BoardGroup } from "../cmps/BoardGroup"
import { SecondaryHeader } from '../cmps/MainHeader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GroupList } from '../cmps/groupList'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrBoard } from '../store/actions/board.actions'

export const BoardDeatails = () => {
    // console.log('in boardDetails')
    const params = useParams()
    const dispatch = useDispatch()
    const { currBoard } = useSelector(state => state.boardModule)
    // console.log(currBoard)

	return (
		<section>
			<SecondaryHeader />
			<GroupList boardId={params.boardId} board={currBoard} />
			{/* <BoardGroup/> */}
		</section>
	)
}
