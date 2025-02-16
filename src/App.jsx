import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/noauth/NavBar";
import Home from "./pages";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Login from "./pages/admin/Login";
import AdminHome from "./pages/admin/AdminHome";
import RecipeDetailPageAdmin from "./pages/admin/RecipeDetailPageAdmin";
import RecipeCreate from "./pages/admin/RecipeCreate";

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
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/recipe/:id" element={<RecipeDetailPageAdmin />} />
      <Route path="/admin/recipe/create" element={<RecipeCreate />} />
    </Routes>
  );
}

export default App;
