
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardPreview } from '../cmps/BoardPreview'


export const Boards = () => {
    ///<BoardHeader/>
    return <section>
        <h1>
            Starred Boards
        </h1>
        <BoardPreview/>



        <h1>
            Recently Viewed Boards
        </h1>




        <h1>
            All Boards
        </h1>

    </section>
}