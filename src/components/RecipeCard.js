import './RecipeCard.css';
import React from 'react';
import { Link } from "react-router-dom";

function RecipeCard(props) {
  const recipe = props.data;
  return (
    <Link to={`/recipe/${recipe.recipe_id}`}>
    <div className="recipe-card">
      <img src={`/${recipe.name.replace(' ', '_')}.jpg`} alt={recipe.name}/>
      <div className="recipe-details">
        <p>{recipe.name}</p>
      </div>
    </div>
    </Link>
  );
};

export default RecipeCard;