import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import { onSaveBoard, setCurrBoard } from '../store/actions/board.actions'
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'
import { boardService } from '../services/board.service';
import { useRef } from 'react';

export const DateModal = ({ toggleDateModal, board, group, task }) => {

    // const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(task.dates?.dueDate ? task.dates.dueDate : new Date());
    const dispatch = useDispatch()
    // let isSetStart = false
    // let endDateRef= useRef(useState(task.dates?.dueDate ? task.dates.dueDate : new Date().toLocaleDateString()))
    let endDateCopy = task.dates?.dueDate ? task.dates.dueDate : new Date()
    // task.dates?.dueDate ? new Date(Date.UTC(Number(endDate.slice(6)), Number(endDate.slice(3, 5)), Number(endDate.slice(0, 2)))) : new Date()
    // console.log((endDate));



    const onSave = async () => {
        // console.log( endDate)s
        // console.log(endDate.slice(6), endDate.slice(3,5),endDate.slice(0,2));

        let newBoard = await boardService.addDateToTask(board, group, task, endDate)
        ////// Another Arg to addDateToTask
        // if (startDate) newBoard = await boardService.addDateToTask(board, group, task, startDate)
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
                        const dateToSave = format(date, 'dd-MM-yyyy')
                        setEndDate(date)
                        endDateCopy = date
                        console.log((endDate));
                        // if (!isSetStart) {
                        // }

                        // else {
                        //     console.log(date);
                        //     const [start, end] = date
                        //     const  startToSave = format(start, 'dd.MM.yyyy')
                        //     const  endToSave = format(end, 'dd.MM.yyyy')
                        //     setStartDate(startToSave)
                        //     setEndDate(endToSave)
                        //     isSetStart = false
                        // }
                    }}
                    // selected = {mashu}
                    // selected={endDateCopy}
                    // selected = {new Date(Date.UTC(2022 ,6,19))}
                    // selectsRange={isSetStart}
                    inline />
                {/* <div className='start-date' id='startBox'>
                    <label>Start Date:
                        <input type="checkbox" checked={task?.dates?.start} onClick={onCheckBoxSelect}></input>
                        <input type="text" isdisabled={!task?.dates?.start}></input>
                    </label>
                </div> */}
                <div className='end-date'>
                    <label>Due Date:  
                        {/* <input type="checkbox" ></input> */}
                        {/* <input type="text" value={endDate} onChange={(ev) => setEndDate(ev.target.value)}></input> */}
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