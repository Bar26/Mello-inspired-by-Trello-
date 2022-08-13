import { setCurrBoard, onSaveBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { boardService } from '../services/board.service'
import { loadUsers, updateUser } from '../store/actions/user.actions.js'
import { userService } from '../services/user.service'






export function AddMemberModal({ onToggleMemberModal, task = null, group = null }) {

    const { currBoard } = useSelector((state) => state.boardModule)
    const { users } = useSelector((state) => state.userModule)
    // const [stateUsers, setStateUser] = useState(users)
    const [filterMember, setFilterMember] = useState('')
    const [membersToShow, setMemberToShow] = useState([])
    const memberContainerRef = useRef()



    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(group)
        let val = task ? currBoard.members : users
        setMemberToShow(val)
        if (!task) memberContainerRef.current.style = "left:105%"
    }, [])

    useEffect(() => {
        if (!task) setMemberToShow(users)
    }, [users])


    const onSearchMember = ({ target }) => {
        const value = target.value
        setFilterMember(value)
    }

    const setToggleChoice = (member) => {

        if (task) onToggleMemberToTask(member._id)
        else onToggleMemberToBoard(member);
    }

    const onToggleMemberToTask = async (memberId) => {
        try {
            const updatedBoard = await boardService.toggleMemberToTask(currBoard, group, task?.id, memberId)
            console.log(group);
            await dispatch(onSaveBoard(updatedBoard))
        } catch (err) {
            console.log('connot add member to task', err)
        }

    }

    const onToggleMemberToBoard = async (member) => {
        try {
            const updatedBoard = await boardService.toggleMemberToBoard(currBoard, member)
            const updatedUser = await userService.toggleBoardToMember(currBoard, member)
            dispatch(updateUser(updatedUser))
            dispatch(onSaveBoard(updatedBoard))

        } catch (err) {
            console.log('connot add member to task', err)
        }
    }




    return (
        // <div
        //     ref={addMemberModalRef}
        //     className="add-member-modal hide"
        // >
        <section className="member-modal-container" ref={memberContainerRef} >
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
                        // const src = member.imgUrl
                        const username = member.username
                        const fullname = member.fullname
                        const bg = member.imgUrl ? `url(${member.imgUrl}) center center / cover` : '#de350b'


                        if (member.username.toLowerCase().includes(filterMember)) {

                            return (
                                <section className="member-in-modal-container" onClick={() => setToggleChoice(member)}>
                                    <div
                                        key={member._id}
                                        className="member-in-modal"
                                        style={{
                                            background: bg,
                                            // backgroundRepeat: 'no-repeat',
                                            // backgroundSize: 'cover',
                                            // backgroundPosition: 'center',
                                            height: '32px',
                                            width: '32px'
                                        }}
                                    >
                                        {!member.imgUrl && <span>{boardService.getInitials(member.fullname)}</span>}

                                    </div>
                                    <div className='user-name'>
                                        <span className='fullname'>{fullname + ' ('}</span>
                                        <span className='username'>{username + ')'}</span>
                                    </div>
                                    {task && task.memberIds && task.memberIds.includes(member._id) && (
                                        <div className="member-indication">✔</div>
                                    )}


                                    {!task && currBoard.members.map(m => {
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


