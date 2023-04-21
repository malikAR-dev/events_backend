import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home/Home";
import View from "./pages/view/View";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:occasionId/:code" element={<View />}></Route>
      </Routes>
    </Router>
    // <div className="App">
    //   <Home />
    // </div>
  );
}

export default App;
