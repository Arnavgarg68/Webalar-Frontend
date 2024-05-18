import './App.css';

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import JoinRoom from './components/JoinRoom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/signup' Component={Signup}/>
        <Route path='/' Component={Login}/>
        <Route path='/profile/:id' Component={Profile}/>
        <Route path='/join-room/:roomId' Component={JoinRoom}/>
      </Routes>
    </Router>
  );
}

export default App;
