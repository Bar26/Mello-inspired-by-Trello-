
import winter from '../assets/img/winter.png'

const style = {
    'backgroundImage': winter,
}

export const BoardPreview = ({board}) => {
    ///<BoardHeader/>
    return <article className='board-preview' style={{ 'backgroundColor': 'green' }}>
        <h1>boardTitle</h1>
        {/* <h1>board.title</h1> */}
        <button className="star" >%</button>
    </article>
}