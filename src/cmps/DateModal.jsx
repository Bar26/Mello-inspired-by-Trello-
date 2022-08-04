import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import { onSaveBoard, setCurrBoard } from '../store/actions/board.actions'
import "react-datepicker/dist/react-datepicker.css";
import { boardService } from '../services/board.service';

import {format} from 'date-fns'

export const DateModal = ({ toggleDateModal, board, group, task }) => {

    const [endDate, setEndDate] = useState(task.dates?.dueDate ? task.dates.dueDate : new Date().toLocaleDateString());
    const dispatch = useDispatch()
    let dateCheck = task.dates?.dueDate ? task.dates.dueDate : new Date()
    dateCheck= Date(dateCheck)
    
    const [_date,setDate] = useState(dateCheck)
    // console.log(Date(_date));
    // let endDateNotState = endDate
    

    

 

    const onSave = async () => {
        let dateToSave = format(_date,('dd/MM/yyyy'));
        let newBoard = await boardService.addDateToTask(board, group, task, dateToSave)
        await dispatch(onSaveBoard(newBoard))
    }
    
    const onRemove = async () => {
        const newBoard = await boardService.deleteDateElement(board, group, task)
        await dispatch(onSaveBoard(newBoard))
    }
    
    return (
        < section className='date-modal' >
            <header>
                <h1>Dates</h1>
                <button onClick={toggleDateModal}>X</button>
            </header>
            <hr />
            <div onClick={(ev) => {
                ev.stopPropagation()
            }}>
                <DatePicker
                    onChange={date => {
                        // const dateToSave = date.toLocaleDateString('he-IL')
                        // console.log(dateToSave);
                        // setEndDate(dateToSave)
                        // endDateNotState = new Date(dateToSave)
                        setDate(date)
                    }}
                    // selected= {_date}
                    // selected = {new Date(Date.UTC(endDateNotState.slice(6),Number(endDateNotState.slice(0,2))-1,endDateNotState.slice(3,5)))}
                    // selected = {date}
                    inline />
                <div className='end-date'>
                    {/* <label>Due Date:   {endDate} */}
                    {/* </label> */}
                </div>
            </div>

            <div className='date-actions'>
                <button onClick={onSave}>Save</button>
                <button onClick={onRemove}>Remove</button>
            </div>

        </section >

    )
}