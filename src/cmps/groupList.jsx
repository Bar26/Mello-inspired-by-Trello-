import { GroupPreview } from "./groupPreview"
import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState } from 'react'
import { Droppable } from "react-beautiful-dnd"
import { DragDropContext } from "react-beautiful-dnd"
import { utilService } from "../services/util.service"
import { Draggable } from "react-beautiful-dnd"
import { setCurrBoard } from "../store/actions/board.actions"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"


export function GroupList() {
    const [type, setType] = useState('board')
    // const [board, setBoard] = useState(currBoard)
    const dispatch = useDispatch()
    const { currBoard } = useSelector(state => state.boardModule)
    const params = useParams()

    // console.log('in groupList ', boardId);
    // useEffect(() => {
    // console.log('in groupList inside effect');
    // boardService.getById(type,board).then(setBoard)
    //   console.log(board.groups)
    // }, [])

    useEffect(() => {
        if (!Object.keys(currBoard).length) {
            boardService.getById('board', params.boardId)
                .then((board) => dispatch(setCurrBoard(board)))
        }

    }, [])

    const onDrop = (res) => {
        let newBoard = { ...currBoard }
        // console.log("ON DROP", newBoard)
        // console.log(board);
        // const groupToMove = board.groups.find(_group => _group.id === res.draggableId)
        const gtm = newBoard.groups.splice(res.source.index, 1)
        console.log(gtm);
        newBoard.groups.splice(res.destination.index, 0, gtm[0])
        // newBoard.groups.splice(res.destination.index, 0, groupToMove)
        // setBoard(newBoard)
        boardService.update(newBoard)



        // console.log(newBoard, 'NewBoard');
        // console.log(groupToMove, 'Group');
        // let lastBoard = newBoard.groups.splice(res.destination.index, 0, groupToMove)
        // const afterDnDBoard = board
        // const groupDest = board.groups.find(_group => _group.id === groupIdDest)
        // const groupSource = board.groups.find(_group => _group.id === groupIdSource)
        // const taskToMove = groupSource.tasks.splice(res.source.index,1)
        // const groupIdxDest = board.groups.findIndex(_group => _group.id === groupIdDest)
        // const groupIdxSour = board.groups.findIndex(_group => _group.id === groupIdSource)
        // groupDest.tasks.splice(res.destination.index,0,taskToMove[0])
        // newBoard.groups.splice(groupIdxDest,1,groupDest)
        // newBoard.groups.splice(groupIdxSour,1,groupSource)
        // setBoard()
        // boardService.update(newBoard)
    }

    const handleOnDragEnd = (res) => {
        console.log(res, "Yes")
        if (!res.destination) return;
        onDrop(res)
        // let newBoard={...board}
        // const groups = board.groups;
        // const movingGroup = groups.splice(res.source.index, 1);
        // groups.splice(res.destination.index, 0, movingGroup);
        // newBoard.groups=groups
        // boardService.update(newBoard)
        // onMyDrop(res,res.destination.droppableId, res.draggableId, res.source.droppableId)
    }
    ////////לחלץ פה את הפארמס ולנסות לרנדר מחדש

    if (!Object.keys(currBoard).length) return <h1>loading...</h1>
    return <section className="groups-container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={currBoard._id}>
                {(provided) => {
                    return <div className="dnd-board-main" {...provided.droppableProps} ref={provided.innerRef}>
                        {currBoard.groups.map((group, index) => (
                            <Draggable key={group.id} draggableId={group.id} index={index}>
                                {(provided) => {
                                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <GroupPreview index={index} key={group.id} group={group} board={currBoard} />
                                    </div>
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>

                }}
            </Droppable>
        </DragDropContext>
    </section>
}