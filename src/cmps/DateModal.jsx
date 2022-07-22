import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import { onSaveBoard } from '../store/actions/board.actions'
import "react-datepicker/dist/react-datepicker.css";
import { boardService } from '../services/board.service';
import { useRef } from 'react';

export const DateModal = ({ toggleDateModal, board, group, task }) => {

    const [endDate, setEndDate] = useState(task.dates?.dueDate ? task.dates.dueDate : new Date().toLocaleDateString('en-GB'));
    const dispatch = useDispatch()
    let dateCheck = task.dates?.dueDate ? task.dates.dueDate : new Date()
    dateCheck= Date(dateCheck)
    
    const [_date,setDate] = useState(dateCheck)
    console.log(_date)
    // console.log(Date(_date));
    // let endDateNotState = endDate
    
    
    const onSave = async () => {
        console.log('State OmSave', _date)
        // console.log(endDate.slice(6), endDate.slice(3,5),endDate.slice(0,2));
        
        let newBoard = await boardService.addDateToTask(board, group, task, _date)
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
                        // console.log('func Date',date);
                        setDate(date)
                        // console.log(date, 'State Date');
                        // const dateToSave = date.toLocaleDateString('en-GB')
                        // setEndDate(dateToSave)
                        // endDateNotState = date
                        // console.log(endDateNotState);
                        // console.log(_date);
                    }}
                    // selected = {_date}

                    // selected = {new Date(endDate)}
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