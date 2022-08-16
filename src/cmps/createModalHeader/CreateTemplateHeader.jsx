import { useEffect } from "react"
import { useState } from "react"
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import TrelloCopyTemplate from '../../assets/img/trello-copy-template.png'

export const CreateTemplateHeader = ({ onSelectTemplate }) => {

    const [templates, setTemplates] = useState([])
    const [isShowMore, setIsShowMore] = useState(true)

    useEffect(() => {
        loadTemplates()
    }, [])


    const loadTemplates = async () => {
        try {
            const templates = await boardService.queryTemplates()
            setTemplates(templates)
        } catch (err) {
            console.error('error query templetes', err)
        }
    }

    const onShowMore = () => {
        let toggle = !isShowMore
        setIsShowMore(toggle)
    }

    const onSelect = (templateId) => {
        onSelectTemplate(templateId)
    }


    return (
        <section className="create-template">
            <div className="show-more-templates">
                <span>Top templates</span>
                <span onClick={onShowMore}>V</span>
            </div>
            {isShowMore && <ul>
                {templates.map((template, index) => {
                    if (index < 8) return (
                        <li key={utilService.makeId()} id={template.id} onClick={() => onSelect(template._id)}>
                            <div className="header-star-template">
                                <div style={{ borderRadius: '3px', background: `url${template.img} center center/cover`, height: '32px', width: '40px' }}></div>
                                <span>{template.title}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            }
            <div className="modal-bottom">
                <img src={TrelloCopyTemplate} style={{ width: '24px', height: '24px' }}></img>
                <span>See hundreds of templates from our community</span>
            </div>
        </section>
    )
}