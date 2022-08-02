import { setCurrBoard, onSaveBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { boardService } from '../services/board.service'





export function AddMemberModal({ onToggleMemberModal = null, onToggleMemberToTask = null, task = null }) {

    const { currBoard } = useSelector((state) => state.boardModule)
    const { users } = useSelector((state) => state.userModule)
    const [filterMember, setFilterMember] = useState('')
    const [membersToShow, setMemberToShow] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        let val = task ? currBoard.members : users
        setMemberToShow(val)
    }, [])

    const onSearchMember = ({ target }) => {
        const value = target.value
        setFilterMember(value)
    }

    const setToggleChoice = (memberId) => {
        console.log('Task: ', task);
        console.log('member: ', memberId);
        if (task) onToggleMemberToTask(memberId)
        else onToggleMemberToBoard(memberId);
    }

    const onToggleMemberToBoard = async (memberId) => {
        try {
            const updatedBoard = await boardService.toggleMemberToBoard(currBoard, memberId)
            await dispatch(onSaveBoard(updatedBoard))
        } catch (err) {
            console.log('connot add member to task', err)
        }
    }




    return (
        // <div
        //     ref={addMemberModalRef}
        //     className="add-member-modal hide"
        // >
        <section className="member-modal-container">
            <header className="add-member-modal-header">
                <span className="add-member-modal-title">Members</span>
                <button
                    onClick={() => onToggleMemberModal()}
                    className="close-member-modal"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </header>
            <hr />
            <input
                onChange={onSearchMember}
                className="search-member"
                placeholder="Search members..."
                value={filterMember}
            />
            <div className="members-container">
                <span className="members-title">Board members</span>
                <div className="members-list">
                    {membersToShow.map(member => {
                        const src = member.imgUrl
                        const username = member.username
                        const fullname = member.fullname

                        if (member.username.toLowerCase().includes(filterMember)) {

                            return (
                                <section className="member-in-modal-container" onClick={() => setToggleChoice(member._id)}>
                                    <div
                                        key={member._id}
                                        className="member-in-modal"
                                        style={{
                                            background: `url(${src})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            height: '32px',
                                            width: '32px'
                                        }}
                                    ></div>
                                    <div className='user-name'>
                                        <span className='fullname'>{fullname + ' ('}</span>
                                        <span className='username'>{username + ')'}</span>
                                    </div>
                                    {task && task.memberIds && task.memberIds.includes(member._id) && (
                                        <div className="member-indication">✔</div>
                                    )}

                                    
                                    {!task && membersToShow.map(m => {
                                        if (m._id === member._id) return <div className="member-indication">✔</div>
                                    })}


                                </section>
                            )
                        }
                        else return
                    })}
                </div>
            </div>
            {/* // </div> */}
        </section>
    )
}


