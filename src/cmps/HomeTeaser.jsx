
export function HomeTeaser({ teaser }) {
    return <section className="teaser">
        <div className="content">
            {teaser.miniTitle && <h3 className="mini-title">{teaser.miniTitle}</h3>}
            <h2 className="title">{teaser.title}</h2>
            <p className="text">{teaser.text}</p>
            <button className="learn-more">+ Learn more</button>
        </div>
        

        {teaser.img && <img className={`img ${teaser.img.title}`}  src={teaser.img.src} alt="teaser img" />}
        {/* {teaser.img && <div  style={{background:`${teaser.img.src} center center / cover`, width:'400px' }}></div>} */}

    </section>
}