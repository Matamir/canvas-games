import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Bouncy from './components/Bouncy';
import Selection from './components/Selection';
import Baseball from './components/Baseball';
import Circle from './components/Circle';
import EstimationGame from './components/EstimationGame'
import ColorGuessr from './components/ColorGuessr'
import ColorMatcher from './components/ColorMatcher'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Selection />} />
        <Route exact path="/Bouncy" element={<Bouncy />} />
        <Route exact path="/Baseball" element={<Baseball />} />
        <Route exact path="/Circle" element={<Circle />} />
        <Route exact path="/EstimationGame" element={<EstimationGame />} />
        <Route exact path="/ColorGuessr" element={<ColorGuessr />} />
        <Route exact path="/ColorMatcher" element={<ColorMatcher />} />

      </Routes>
    </Router>
  );
}

export default App;
