
// import { BoardGroup } from "../cmps/BoardGroup"
import { SecondaryHeader } from "../cmps/MainHeader"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GroupList } from "../cmps/groupList"





export const BoardDeatails = () => {
    // console.log('in boardDetails')
    const params = useParams()

    return <section> 
        <SecondaryHeader />
        <GroupList boardId={params.boardId}/>
        {/* <BoardGroup/> */}
    </section>
}