// import logo from './logo.svg';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { BoardDeatails } from './pages/BoardDetails';
import { BoardList } from './pages/BoardList.jsx';
import {Home} from './pages/Home'


function App() {
  
  return (
    <Router>
    <div className="App">
    <Routes>
          <Route path='/boards/:boardId' element={<BoardDeatails/>} />
          <Route path='/boards' element={<BoardList />} />
          <Route path='/' element={<Home />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
