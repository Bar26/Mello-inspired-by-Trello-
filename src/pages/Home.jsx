import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import hero1 from '../assets/img/hero1.png'
import { AppHeader } from '../cmps/AppHeader'
import { userService } from '../services/user.service'
import { onSignup, setCurrUser } from '../store/actions/user.actions.js'
import melloPic from '../assets/img/mello pic.png'
import coinbasePic from '../assets/img/coinbase-pic.svg'
import googlePic from '../assets/img/google-pic.svg'
import grandPic from '../assets/img/grand-pic.svg'
import johnPic from '../assets/img/john-pic.svg'
import visaPic from '../assets/img/visa-pic.svg'
import zoomPic from '../assets/img/zoom-pic.webp'
import { teasersInfo } from '../services/home-data.service'
import { HomeTeaser } from '../cmps/HomeTeaser'
import trelloIcon from '../assets/img/trello-icon.png'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'


export function Home() {

	const dispatch = useDispatch()
	const onSetGuestMode = async () => {
		let guestUser = {
			fullname: 'Guest',
			username: utilService.makeId(),
			password: utilService.makeId(),
			imgUrl:
				'https://res.cloudinary.com/dgjmjxkct/image/upload/v1653899076/dl6faof1ecyjnfnknkla_gxwbcq.svg',
			
		}
		await dispatch(onSignup(guestUser))
		let newScrum = await boardService.getBoardForGuest()
		guestUser = {...guestUser,boards: [newScrum._id],starred: [newScrum._id] }
		guestUser = await userService.update(guestUser)
		await userService.saveLocalUser(guestUser)
		dispatch(setCurrUser(guestUser))
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
						Start with a Mello board, lists, and cards. Customize and expand with more features as your teamwork grows.<br />
						Manage projects, organize tasks, and build team spirit—all in one place.
					</p>
					<Link className="sign-up-free " to="/signup">

						Sign up, it's free
					</Link>

					<img className="mello-pic" src={melloPic} />
				</section>

				<section className="mello-teams">
					<p className="title">Join over 2,000,000 teams worldwide that are using Mello to get more done.</p>
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
