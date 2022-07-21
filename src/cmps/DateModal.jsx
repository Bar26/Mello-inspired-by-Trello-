import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import { onSaveBoard } from '../store/actions/board.actions'
import "react-datepicker/dist/react-datepicker.css";
import { boardService } from '../services/board.service';
import { useRef } from 'react';

export const DateModal = ({ toggleDateModal, board, group, task }) => {

    const [endDate, setEndDate] = useState(task.dates?.dueDate ? task.dates.dueDate : new Date().toLocaleDateString('he-IL'));
    const dispatch = useDispatch()
    let endDateNotState = endDate


    const onSave = async () => {
        // console.log( endDate)s
        // console.log(endDate.slice(6), endDate.slice(3,5),endDate.slice(0,2));

        let newBoard = await boardService.addDateToTask(board, group, task, endDate)
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
                        const dateToSave = date.toLocaleDateString('he-IL')
                        setEndDate(dateToSave)
                        endDateNotState = new Date(dateToSave)
                    }}
                    // selected = {Date.UTC(endDateNotState.slice(6),Number(endDateNotState.slice(0,2))-1,endDateNotState.slice(3,5))}
                    inline />
                <div className='end-date'>
                    <label>Due Date:   {endDate}
                    </label>
                </div>
            </div>

            <div className='date-actions'>
                <button onClick={onSave}>Save</button>
                <button onClick={onRemove}>Remove</button>
            </div>

        </section >

    )
}