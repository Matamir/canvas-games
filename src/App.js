import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Bouncy from './components/Bouncy';
import Selection from './components/Selection';
import Baseball from './components/Baseball';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={<Selection/>} />
        <Route exact path="/Bouncy" element={<Bouncy/>} />
        <Route exact path="/Baseball" element={<Baseball/>} />
      </Routes>
    </Router>
  );
}

export default App;
