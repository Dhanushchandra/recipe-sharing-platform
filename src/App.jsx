import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages";
import RecipeDetailPage from "./pages/RecipeDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/blog"
        element={
          <>
            <NavBar />
            <h1>Under Maintenance</h1>{" "}
          </>
        }
      />
      <Route path="/recipe/:id" element={<RecipeDetailPage />} />
    </Routes>
  );
}

export default App;
