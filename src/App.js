// import logo from './logo.svg';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { AppHeader } from './cmps/header';
import {Home} from './pages/Home'


function App() {
  
  return (
    <Router>
    <div className="App">
      <AppHeader/>
    <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
