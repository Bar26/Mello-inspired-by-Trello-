// import logo from './logo.svg';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { AppHeader } from './cmps/header';
import { BoardDeatails } from './pages/BoardDetails';
import { Boards } from './pages/Boards.jsx';
import {Home} from './pages/Home'


function App() {
  
  return (
    <Router>
    <div className="App">
      {/* <AppHeader/> */}
    <Routes>
          <Route path='/boards/:boardId' element={<BoardDeatails/>} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/' element={<Home />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
