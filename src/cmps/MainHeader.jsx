import React from "react"




export const SecondaryHeader = () => {


    const refRecent = React.createRef()
    const refMore = React.createRef()

    const toggleDiv = (refType) => {
        refType.current.classList.toggle('hide')
    }

    return <header className='secondary-header'>
        <h1 className="logo">Trello</h1>
        <section className="nav-header flex">
            <button className="secondary-header-recent-button" onClick={() => toggleDiv(refRecent)}>Recent</button>
            <section ref={refRecent} className='select-recent hide'>
                <h1>Recent Boards</h1>
                <button onClick={() => toggleDiv(refRecent)}>X</button>
                <hr/>
                <ul>
                    <li>Hey</li>
                    <li>Bar</li>
                </ul>
            </section>
            <button className="secondary-header-more-button" onClick={() => toggleDiv(refMore)}>More</button>
            <section ref={refMore} className='select-more hide'>
                <ul>
                    <li>Hey</li>
                    <li>Noam</li>
                    <li>Bar</li>
                </ul>
            </section>
        </section>
    </header>
}