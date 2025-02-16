import React, { useEffect, useState } from "react";
import { Pagination, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../../components/noauth/NavBar";
import RecipeCard from "../../components/noauth/RecipeCard";
import AdminNavBar from "../../components/auth/AdminNavBar";
import { useNavigate } from "react-router-dom";
import AdminRecipeCard from "../../components/auth/AdminRecipeCard";

const AdminHome = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `http://localhost:8080/noauth/v1/recipes?page=${page}&size=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  return (
    <>
      <AdminNavBar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          padding: "16px",
        }}
      >
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <AdminRecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 25,
          borderRadius: "50px",
          padding: "12px 24px",
          backgroundColor: "orange",
          fontWeight: "bold",
        }}
        onClick={() => navigate("/admin/recipe/create")}
      >
        Create
      </Button>
    </>
  );
};

export default AdminHome;
