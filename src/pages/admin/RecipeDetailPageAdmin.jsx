import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AdminNavBar from "../../components/auth/AdminNavBar";
import { BACKEND_API_ADMIN } from "../../utils/endpoints";

const RecipeDetailPageAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_API_ADMIN}/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const recipe = response.data;
        setRecipe(recipe);
        setName(recipe.name);
        setDescription(recipe.description);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  useEffect(() => {
    if (categories.length > 0 && recipe?.categories?.length > 0) {
      const selectedIds = categories
        .filter((cat) => recipe.categories.includes(cat.name))
        .map((cat) => cat.id)
        .join(", ");

      setSelectedCategoryIds(selectedIds);
      console.log("Selected Category IDs:", selectedIds);
    }
  }, [categories, recipe]);

  const handleUpdateRecipe = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    axios
      .put(`${BACKEND_API_ADMIN}/recipe/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Recipe updated successfully!");
        setRecipe(response.data);
      })
      .catch((error) => console.error("Error updating recipe:", error));
  };

  const handleDeleteRecipe = () => {
    axios
      .delete(`${BACKEND_API_ADMIN}/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Recipe deleted successfully!");
        navigate("/admin/home");
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryIds(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <AdminNavBar />

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
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Recipe Description */}
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            {/* Categories */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Categories:
              </Typography>
              {recipe.categories && recipe.categories.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {recipe.categories.map((category, index) => (
                    <Chip key={index} label={category} />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No categories assigned
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Image Upload */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Update Image:
              </Typography>
              <input type="file" onChange={handleImageChange} />
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

            {/* Update and Delete Buttons */}
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateRecipe}
              >
                Update Recipe
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteRecipe}
              >
                Delete Recipe
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default RecipeDetailPageAdmin;
