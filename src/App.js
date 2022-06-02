// import logo from './logo.svg';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { BoardDeatails } from './pages/BoardDetails'
import { BoardList } from './pages/BoardList.jsx'
import { Home } from './pages/Home'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { TaskDetails } from './cmps/TaskDetails'

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/boards/:boardId" element={<BoardDeatails />}>
						<Route path="/boards/:boardId/:taskId" element={<TaskDetails />} />
					</Route>

					<Route path="/boards" element={<BoardList />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
