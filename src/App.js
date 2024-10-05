import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';

import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import AlertState from './Context/alert/AlertState';
import Footer from './Components/Footer';
import Play from './Components/Play';

function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={ <Home /> } />
              <Route exact path="/about" element={ <About /> } />
              <Route exact path="/login" element={ <Login /> } />
              <Route exact path="/signup" element={ <Signup/> } />
              <Route exact path="/play" element={ <Play/> } />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </NoteState>
      </AlertState>
    </>
  )
}

export default App;
