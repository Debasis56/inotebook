
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './components/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message, type, typeMessage)=>{
    setalert({
      msg: message,
      type: type,
      typemsg: typeMessage
    })
    setTimeout(() => {
      setalert(null);
    }, 3000);

  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container my-3">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>} />
      <Route exact path="about" element={<About/>} />
      <Route exact path="login" element={<Login showAlert={showAlert}/>} />
      <Route exact path="signup" element={<Signup showAlert={showAlert}/>} />
      
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
