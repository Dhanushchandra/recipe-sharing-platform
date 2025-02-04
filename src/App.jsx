import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<NavBar />} />
    </Routes>
  );
}

export default App;
