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
import MoveTheSlider from './components/MoveTheSlider'
import GuessSliderPosition from './components/GuessSliderPosition'
import ColorGuessr from './components/ColorGuessr'
import ColorMatcher from './components/ColorMatcher'
import StayUpGame from './components/StayUpGame'
import ColorFinder from './components/ColorFinder'
import Snake from './components/Snake'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Selection />} />
        {/* <Route exact path="/Bouncy" element={<Bouncy />} /> */}
        <Route exact path="/Baseball" element={<Baseball />} />
        <Route exact path="/Circle" element={<Circle />} />
        <Route exact path="/MoveTheSlider" element={<MoveTheSlider />} />
        <Route exact path="/GuessSliderPosition" element={<GuessSliderPosition />} />
        <Route exact path="/ColorGuessr" element={<ColorGuessr />} />
        <Route exact path="/ColorMatcher" element={<ColorMatcher />} />
        <Route exact path="/StayUpGame" element={<StayUpGame />} />
        <Route exact path="/ColorFinder" element={<ColorFinder />} />
        <Route exact path="/Snake" element={<Snake />} />

      </Routes>
    </Router>
  );
}

export default App;
