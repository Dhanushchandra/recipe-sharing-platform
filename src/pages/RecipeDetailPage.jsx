import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Container,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import NavBar from "../components/noauth/NavBar";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe details based on the ID
    axios
      .get(`http://localhost:8080/noauth/v1/recipes/${id}`)
      .then((response) => {
        const recipe = response.data;
        setRecipe(recipe);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <NavBar />

      <Container sx={{ mt: 4, mb: 4 }}>
        <Card>
          {/* Recipe Image */}
          <CardMedia
            component="img"
            height="400"
            image={`data:image/jpeg;base64,${recipe.base64Image}`}
            alt={recipe.name}
          />
          <CardContent>
            {/* Recipe Name */}
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {recipe.name}
            </Typography>

            {/* Recipe Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, mb: 3 }}
            >
              {recipe.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Details:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Description:</strong> {recipe.description}
              </Typography>
              {/* <Typography variant="body1" color="text.secondary">
              <strong>Recipe ID:</strong> {recipe.id}
            </Typography> */}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Categories */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Categories:
              </Typography>
              {recipe.categories.map((category, index) => (
                <Chip key={index} label={category} sx={{ margin: 0.5 }} />
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Posted By (User Details) */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Posted By:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Username:</strong> {recipe.user.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Email:</strong> {recipe.user.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default RecipeDetailPage;
