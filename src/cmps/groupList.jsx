import { GroupPreview } from "./groupPreview"
import React,{ useCallback, useEffect, useState, useRef } from 'react'
import { useEffectUpdate } from "./useEffectUpdate"
import { setCurrBoard } from "../store/actions/board.actions"
import { useDispatch } from "react-redux"
import { boardService } from "../services/board.service"


export function GroupList({ boardId }) {
  const [type, setType] = useState('board')
  const [board, setBoard] = useState({})
  const dispatch = useDispatch()
  const listFormRef = React.createRef()
  let onMount = useRef(true)
  const [newListTitle, setNewListTitle] = useState('')
  const inputListRef = useRef()
  const addListRef = useRef()

  // console.log('in groupList ', boardId);
  useEffect(() => {
    // console.log('in groupList inside effect');
    boardService.getById(type, boardId).then(setBoard)
    //   console.log(board.groups)
  }, [])

  useEffectUpdate(() => {
    // console.log('in use effect update')
    // if (!onMount.current) onMount.current = false
    onAddList()
  }, [newListTitle])


  const onAddList = () => {
    const updatedBoard = { ...board }
    boardService.createList(newListTitle)
      .then((list) => {
        updatedBoard.groups.push(list)
        return updatedBoard
      })
      .then(boardService.update)
      .then((board) => dispatch(setCurrBoard(board)))

  }

  const toggleListForm = () => {
    listFormRef.current.classList.toggle('close')
    inputListRef.current.value = ''
    addListRef.current.classList.toggle('close')

}


  const onListSubmit = (ev) => {

    ev.preventDefault()
    const { value } = ev.target[0]
    setNewListTitle(value)
    ev.target[0].value = ''

  }

  if (!Object.keys(board).length) return <h1>loading...</h1>

  return <section className="groups-container">
    {board.groups.map(group => <GroupPreview group={group} key={group.id} board={board} />)}

    <div className="add-list-btn flex" onClick={toggleListForm} ref={addListRef} ><span className="plus">+</span><button > Add another list </button></div>
    <form className="add-list-form close" onSubmit={onListSubmit} ref={listFormRef}>
      <input ref={inputListRef} name="list-title" type="text" placeholder="Enter list title..." />
      <button type="button" className="close-list-form" onClick={toggleListForm}>X</button>
      <button className="save-list">Add list</button>
    </form>
  </section>
}
