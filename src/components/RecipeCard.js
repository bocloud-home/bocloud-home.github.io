import './RecipeCard.css';
import React from 'react';

function RecipeCard(props) {
  const recipe = props.data;
  return (
    <a href={`/recipe/${recipe.recipe_id}`}>
    <div className="recipe-card">
      <img src={`/${recipe.name.replace(' ', '_')}.jpg`} alt={recipe.name}/>
      <div className="recipe-details">
        <p>{recipe.name}</p>
      </div>
    </div>
    </a>
  );
};

export default RecipeCard;