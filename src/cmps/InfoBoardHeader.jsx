import { useEffect, useState } from 'react'

export const InfoBoardHeader = () => {

    const imgs = [
        'https://res.cloudinary.com/noambar/image/upload/v1659188971/Trello/InfoTrello/NewToTrello_kuzdgm.png',
        'https://res.cloudinary.com/noambar/image/upload/v1659188972/Trello/InfoTrello/Power-Ups_wcadzb.png',
        'https://res.cloudinary.com/noambar/image/upload/v1659188972/Trello/InfoTrello/TeamUp_qv1iwx.png',
        'https://res.cloudinary.com/noambar/image/upload/v1659188972/Trello/InfoTrello/GetInspired_tixxgq.png'
    ]

    const tips = [
        'New to Mello? Check out the guide',
        'Make boards more powerful with Mello Power-Ups',
        'It`s easy to get your team up and running with Mello playbooks',
        'Get inspired by dozens of different Mello workflows',
    ]

    const [numOfTip, setNumOfTip] = useState(0)
    const [tipState, setTipState] = useState(tips[0])
    const [imgState, setImgState] = useState(imgs[0])


    useEffect(() => {
        setImgState(imgs[numOfTip])
        setTipState(tips[numOfTip])
    }, [numOfTip])

    const generateNewTip = () => {
        numOfTip === 3 ? setNumOfTip(0) : setNumOfTip((prev) => (prev + 1))
    }


    return (
        <section className="info-img-div">
            <img src={imgState} />
            <div className="for-h3">
                <h3>{tipState}</h3>
            </div>
            <button onClick={generateNewTip}>Get a new tip</button>
            <hr />
            <div className="info-button-buttom">
                <button>Pricing</button>
                <button>Apps</button>
                <button>Blog</button>
                <button>Privacy</button>
                <button>More...</button>
            </div>
        </section>
    )
}