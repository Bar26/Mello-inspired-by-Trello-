import { GroupPreview } from "./groupPreview"
import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState } from 'react'

export function GroupList({ boardId }) {
    const [type, setType] = useState('board')
    const [board, setBoard] = useState({})

    console.log('in groupList ', boardId);
    useEffect(() => {
      console.log('in groupList inside effect');
      boardService.getById(type,boardId).then(setBoard)
    //   console.log(board.groups)
    }, [])

   if(!Object.keys(board).length) return <h1>loading...</h1>

    return <section className="groups-container">
        {board.groups.map(group=> <GroupPreview group={group} board={board}/>)}
    </section>
}