
import './App.css';
import React, {createContext} from 'react';
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
export const ThemeContext = createContext()
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

  const [mode, setmode] = useState('light');//Whether dark mode is enabled or not
  const toggleMode = ()=>{
    if(mode === 'light')
    {
    setmode('dark');
    document.body.style.backgroundColor = 'rgb(22,22,29)';
    //showAlert(" Dark Mode has been enabled", "success", "SUCCESS");
    }
    else
    {
    setmode('light');
    document.body.style.backgroundColor = 'white';
    //showAlert(" Light Mode has been enabled", "success", "SUCCESS")
    }
 }
  return (
    <>
    
    <NoteState>

    <Router>
    <ThemeContext.Provider value={{mode, toggleMode}}>
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
    </ThemeContext.Provider>
    </Router>
    </NoteState>
    
    
    </>
  );
}

export default App;
