"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./hero";
import Ship from "./page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/app" element={<Ship />} />
      </Routes>
    </Router>
  );
}
