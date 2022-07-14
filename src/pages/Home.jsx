import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import hero1 from '../assets/img/hero1.png'
import { AppHeader } from '../cmps/AppHeader'
import { userService } from '../services/user.service'
import { setCurrUser } from '../store/actions/user.actions.js'
import melloPic from '../assets/img/mello pic.png'
import coinbasePic from '../assets/img/coinbase-pic.svg'
import googlePic from '../assets/img/google-pic.svg'
import grandPic from '../assets/img/grand-pic.svg'
import johnPic from '../assets/img/john-pic.svg'
import visaPic from '../assets/img/visa-pic.svg'
import zoomPic from '../assets/img/zoom-pic.webp'
import boardTeaser from '../assets/img/boradTeaser.svg'
import { teasersInfo } from '../services/home-data.service'
import { HomeTeaser } from '../cmps/HomeTeaser'
import trelloIcon from '../assets/img/trello-icon.png'
export function Home() {
	const dispatch = useDispatch()

	useEffect(() => {
		SetStore()
	}, [])

	const SetStore = async () => {
		await dispatch(setCurrUser({}))
		// await dispatch(setCurrBoard({}))
	}

	const onSetGuestMode = async () => {
		const guestUser = {
			name: 'Guest',
			imgUrl:
				'https://res.cloudinary.com/dgjmjxkct/image/upload/v1653899076/dl6faof1ecyjnfnknkla_gxwbcq.svg',
			boards: ['629d8fac2f760e2ec9cf7d8d'],
		}
		dispatch(setCurrUser(guestUser))
		userService.saveLocalUser(guestUser)
	}

	return (
		<section className="home">
			<AppHeader />
			<main className="main-container">
				<section className="main-article">
					<section className="content">
						<h1 className="title">Mello helps teams move work forward</h1>
						<p className="trello-prev">
							Collaborate, manage projects, and reach new productivity peaks.
							From high rises to the home office, the way your team works is
							unique—accomplish it all with Mello
						</p>
						<Link className='link-to-start-as-guest' to="boards">
							<button className="start-as-guest" onClick={onSetGuestMode}>
								Start doing
							</button>
						</Link>
					</section>
					<img className="hero1" src={hero1} />


				</section>
				<hr />

				<section className="start-working-container">
					<h2 className="title">
						It's more than work. It's a way of working together.
					</h2>
					<p className="content">
						Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows.<br />
						Manage projects, organize tasks, and build team spirit—all in one place.
					</p>
					<button className="sign-up">
						Sign up, it's free
					</button>

					<img className="mello-pic" src={melloPic} />
				</section>

				<section className="mello-teams">
					<p className="title">Join over 2,000,000 teams worldwide that are using Trello to get more done.</p>
					<div className="teams-icons">
						<img src={coinbasePic} alt="teamPic" />
						<img src={johnPic} alt="teamPic" />
						<img src={grandPic} alt="teamPic" />
						<img src={googlePic} alt="teamPic" />
					</div>
					<div className="teams-icons">
						<img src={visaPic} alt="teamPic" />
						<img src={zoomPic} alt="teamPic" />
					</div>
				</section>

				<section className="teasers-container">
					{teasersInfo.map(teaser => <HomeTeaser teaser={teaser} />)}
				</section>



			</main>

			<p className="responsive">
				Mello also works great on your smaller screen.
			</p>
			
			<footer className="main-footer">
				<h1 className="logo">
					<img src={trelloIcon} alt="melloIcom" />
					<span>Mello</span>
				</h1>
				<p>Copyright © 2022 Mello </p>

			</footer>

		</section>
	)
}
