import React, { useEffect, useState } from "react";
import RecipeCard from "../components/noauth/RecipeCard";
import NavBar from "../components/NavBar";
import { Pagination, Box } from "@mui/material";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0); // Current page (0-based index)
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [pageSize, setPageSize] = useState(1); // Number of items per page

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
      <NavBar />

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
            <RecipeCard recipe={recipe} />
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
    </>
  );
};

export default Home;
