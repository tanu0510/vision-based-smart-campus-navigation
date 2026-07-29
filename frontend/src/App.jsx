import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<Map />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
