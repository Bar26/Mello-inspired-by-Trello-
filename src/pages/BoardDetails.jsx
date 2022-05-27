import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GroupPreview } from '../cmps/groupPreview'
import {boardService} from '../services/board.service.js'
// import { BoardGroup } from "../cmps/BoardGroup"
import { SecondaryHeader } from '../cmps/MainHeader'

export const BoardDeatails = () => {
	const [board, setBoard] = useState([])
	const { boardId } = useParams()

    const loadBorad =() => {

    }

	return (
		<section>
			{/* <BoardGroup/>  // change to grouplist */}
			<SecondaryHeader />
            <h1>{boardId}</h1>
			{/* <BoardGroup/> */}
		</section>
	)
}
