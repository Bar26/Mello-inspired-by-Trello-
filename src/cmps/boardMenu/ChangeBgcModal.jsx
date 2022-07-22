import { useDispatch, useSelector } from "react-redux"
import colorsSrc from '../../assets/img/colors.jpg'
import collabSrc from '../../assets/img/imgcollobration.jpg'
import plusSrc from '../../assets/img/plus.png'


export const ChangeBgcModal = ({ menuShow, onToggleBoardMenu,setSelectedType,setTitle }) => {


    ////need to check for uploded img
    return (
        <section className="change-bgc-modal-container">
            <section className="implented">
                <div className="implented-img-colors"><img src={collabSrc}/><p>Photos</p></div>
                <div className="implented-img-colors" onClick={()=>{setSelectedType('colors-modal'); setTitle('Colors')}}><img src={colorsSrc}/><p>Colors</p></div>
            </section>
            <hr/>
            <section className="custom">
                <h2>Custom</h2>
                <div><img src={plusSrc}/></div>
            </section>
        </section>
    )
}