import trelloIconBlack from '../../assets/img/trello-black-full.svg'
import trelloCopyTemplateIcon from '../../assets/img/trello-copy-template.png'

export const MainCreate = ({onGoBack, setCreateModalTitle, setCreateState }) => {

    return (
        <div className='create-first-actions'>
            <button onClick={()=>{setCreateState('create-board'); setCreateModalTitle('Create board');}}>
                <div className='flex' style={{ gap: '2px' }}>
                    <img src={trelloIconBlack} style={{ color: '$clr-text-group', height: '20px', width: '20px' }} />
                    <span className='action-title'>Create Board</span>
                </div>
                <p className='action-desc'>A board is made up of cards orderd on lists.
                    Use it to mange projects, track information,or organize anything.</p>
            </button>
            <button>
                <div className='flex' style={{ gap: '2px' }}>
                    <img src={trelloCopyTemplateIcon} style={{ color: '$clr-text-group', height: '20px', width: '20px' }} />
                    <span className='action-title'>Start with a template</span>
                </div>
                <p className='action-desc'>Get started faster with a board template.</p>
            </button>
        </div>
    )

}