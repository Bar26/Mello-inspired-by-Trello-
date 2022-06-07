import { setCurrBoard, onSaveBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'





export function AddMemberModal({ onToggleMemberModal,
    onToggleMemberToTask,
    task }) {

    const { currBoard } = useSelector((state) => state.boardModule)
    const [filterMember, setFilterMember] = useState('')
    console.log(filterMember)


    const onSearchMember = ({ target }) => {
        const value = target.value
        console.log(value)
        setFilterMember(value)
    }

    return (
        // <div
        //     ref={addMemberModalRef}
        //     className="add-member-modal hide"
        // >
        <>
            <header className="add-member-modal-header">
                <span className="add-member-modal-title">Members</span>
                <button
                    onClick={() => onToggleMemberModal()}
                    className="close-member-modal"
                >
                    <i class="fa-solid fa-xmark"></i>
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
                    {currBoard.members && currBoard.members.map(member => {
                        console.log('there are members')
                        const src = member.imgUrl
                        const username = member.username
                        const fullname = member.fullname
                      
                        if (member.username.toLowerCase().includes(filterMember)) {

                            return (
                                <section className="member-in-modal-container"     onClick={() => onToggleMemberToTask(member._id)}>
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
                                            <span className='fullname'>{fullname+' ('}</span>
                                            <span className='username'>{username+')'}</span>
                                        </div>
                                        {task.memberIds && task.memberIds.includes(member._id) && (
                                            <div className="member-indication">✔</div>
                                        )}
                                    

                                </section>
                            )
                        }
                        else return
                    })}
                </div>
            </div>
            {/* // </div> */}
        </>
    )
}


