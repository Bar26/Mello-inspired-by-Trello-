import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import hero1 from '../assets/img/hero1.png'
import { AppHeader } from '../cmps/header'
import { setCurrBoard } from '../store/actions/board.actions'
import { setCurrUser } from '../store/actions/user.actions.js'
export function Home() {
	const dispatch = useDispatch()

	useEffect(()=>{
		SetStore()
	}, [])
	
	const SetStore = async()=>{
		await dispatch(setCurrUser({}))
		await dispatch(setCurrBoard({}))


	}



	const onSetGuestMode = async () => {
		dispatch(
			setCurrUser({
				name: 'Guest',
				imgUrl:
					'https://res.cloudinary.com/dgjmjxkct/image/upload/v1653899076/dl6faof1ecyjnfnknkla_gxwbcq.svg',
			})
		)
	}

	return (
		<section className="home">
			<AppHeader />
			<main className="main-container">
				<section className="main-article flex justify-center align-center">
					<section className="content">
						<h1 className="title">Trello helps teams move work forward</h1>
						<p className="trello-prev">
							Collaborate, manage projects, and reach new productivity peaks.
							From high rises to the home office, the way your team works is
							unique—accomplish it all with Trello
						</p>
						<Link className='link-to-start-as-guest' to="boards">
							<button className="start-as-guest" onClick={onSetGuestMode}>
								Start doing
							</button>
						</Link>
					</section>
					<img className="hero1" src={hero1} />
				</section>
				<button>
					<Link to="boards"></Link>
				</button>
			</main>
		</section>
	)
}
