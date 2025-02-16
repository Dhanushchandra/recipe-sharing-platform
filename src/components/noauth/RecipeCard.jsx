import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={`data:image/jpeg;base64,${recipe.base64Image}`}
        alt={recipe.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Categories:
          {recipe.categories.map((category, index) => (
            <Chip key={index} label={category} sx={{ margin: 0.5 }} />
          ))}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Posted by: {recipe.user.username}
        </Typography>
        <Button
          component={Link}
          to={`/admin/recipe/${recipe.id}`}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
