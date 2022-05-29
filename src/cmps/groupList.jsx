import { GroupPreview } from "./groupPreview"
import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState } from 'react'

export function GroupList({ currBoard }) {
    const [type, setType] = useState('board')
    const [board, setBoard] = useState(currBoard)

    // console.log('in groupList ', boardId);
    // useEffect(() => {
      // console.log('in groupList inside effect');
      // boardService.getById(type,board).then(setBoard)
    //   console.log(board.groups)
    // }, [])

    ////////לחלץ פה את הפארמס ולנסות לרנדר מחדש

   if(!Object.keys(board).length) return <h1>loading...</h1>
console.log(board._id,"MICC")
    return <section className="groups-container">
        {board.groups.map(group=> <GroupPreview key={group.id} id={group.id} group={group} board={board}/>)}
    </section>
}