import { Link } from 'react-router-dom'
import hero1 from '../assets/img/hero1.png'

export function Home() {
    return <main className='main-container'>
        <section className='main-article flex justify-center align-center'>
            <section className='content'>
                <h1 className="title">Trello helps teams move work forward</h1>
                <p className='trello-prev'>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello</p>
                <button className='start-as-guest'>Start now-it's free</button>
            </section>
            <img className='hero1' src={hero1} />
        </section>
        <button><Link to='boards'>Go Boards</Link></button>

    </main>
}