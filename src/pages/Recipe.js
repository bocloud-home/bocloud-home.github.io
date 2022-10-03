import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import yaml from 'js-yaml';
import './Recipe.css';

function Recipe() {
    let { id } = useParams();
    const [recipe, setRecipe] = useState({name: 'Unknown', ingredients: [], steps: [], category: "Unknown"});
    useEffect(() => {
      fetch("/recipes.yml")
      .then(
        (result) => {
          result.text().then( (data) => {
            var recipes = yaml.load(data);
            let tmp = recipes.filter(function(x) { return x.recipe_id.localeCompare(id) === 0; } )[0];
            setRecipe(tmp);
          });
          console.log(recipe);
        },
        (error) => {
          console.log(error);
        }
      )
    }, []);
    return (
      <div className="recipe-page">
        <div className="recipe-header">
          <img src={`/${recipe.name.replace(' ', '_')}.jpg`} alt={recipe.name}/>
          <div className="recipe-title">
            <h1>{recipe.name} ({recipe.category})</h1>
          </div>
        </div>
        <div className="recipe-body">
          <div className="recipe-ingredients">
            <h2>Ingredients:</h2>
            <ul>
            {
              recipe.ingredients.map(item => (
                <li>{item}</li>
              ))
            }
            </ul>
          </div>
          <div className="recipe-steps">
            <h2>Steps:</h2>
            {
              recipe.steps.map(item => (
                <p>{item}</p>
              ))
            }
          </div>
        </div>
      </div>
    );
};

export default Recipe;