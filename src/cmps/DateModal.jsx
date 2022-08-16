import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import { onSaveBoard } from '../store/actions/board.actions'
import "react-datepicker/dist/react-datepicker.css";
import { boardService } from '../services/board.service';

import {format} from 'date-fns'

export const DateModal = ({ toggleDateModal, board, group, task }) => {

    const dispatch = useDispatch()
    let dateCheck = task.dates?.dueDate ? task.dates.dueDate : new Date()
    dateCheck= Date(dateCheck)
    const [_date,setDate] = useState(dateCheck)

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
                        setDate(date)
                    }}
                   
                    inline />
                <div className='end-date'>
                </div>
            </div>

            <div className='date-actions'>
                <button onClick={onSave}>Save</button>
                <button onClick={onRemove}>Remove</button>
            </div>

        </section >

    )
}