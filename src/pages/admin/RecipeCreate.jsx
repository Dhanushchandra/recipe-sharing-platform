import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AdminNavBar from "../../components/auth/AdminNavBar";
import { BACKEND_API_ADMIN } from "../../utils/endpoints";

const RecipeCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Fetch all categories
  useEffect(() => {
    axios
      .get(`${BACKEND_API_ADMIN}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategoryIds(event.target.value);
  };

  // Handle image upload
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle form submission
  const handleCreateRecipe = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("userId", localStorage.getItem("uid"));
    formData.append("categories", selectedCategoryIds.join(","));

    if (image) {
      formData.append("image", image);
    }

    axios
      .post(`${BACKEND_API_ADMIN}/recipe`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Recipe created successfully!");
        navigate("/admin/home");
      })
      .catch((error) => console.error("Error creating recipe:", error));
  };

  return (
    <>
      <AdminNavBar />

      <Container sx={{ mt: 4, mb: 4 }}>
        <Card>
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

            {/* Category Selection */}
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={selectedCategoryIds}
                  onChange={handleCategoryChange}
                  label="Categories"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Image Upload */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Upload Image:
              </Typography>
              <input type="file" onChange={handleImageChange} />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Create Button */}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRecipe}
              >
                Create Recipe
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default RecipeCreate;
