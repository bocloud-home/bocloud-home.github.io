import React from 'react';
import yaml from 'js-yaml';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import RecipeCard from '../components/RecipeCard.js';
import RecipeController from '../RecipeController.js';
import './Recipes.css';

function selection(selected, setSelected, category, setSelectedRecipes, recipes) {
  var select = selected;
  if (select.includes(category)) {
    select.splice(select.indexOf(category), 1);
  } else {
    select.push(category);
  }
  setSelected(select);
  setSelectedRecipes(recipes.filter(r => select.length === 0 || select.includes(r.category)));
};

function download(recipes) {
  const yaml_content = yaml.dump(recipes, 2);
  const blob = new Blob([yaml_content], { type: "text/yaml" });
  const href = URL.createObjectURL(blob);
  return href;
}

function base64Image(image_path) {
  let canvas = document.createElement('canvas');
  let img1 = document.createElement('img');
  img1.setAttribute('src', image_path);
  canvas.width = 208;
  canvas.height = 208;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img1, 0, 0);
  var dataURL = canvas.toDataURL("image/jpeg");
  return dataURL;
}

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    useEffect(() => {
      const recipeSettings = async () => {
          var controller = new RecipeController();
          var tmpRecipes = await controller.list();
          console.log(tmpRecipes);
          setRecipes(tmpRecipes);
          setSelectedRecipes(tmpRecipes);
          setCategories(tmpRecipes.map(r => r.category).filter((v, i, self) => self.indexOf(v) === i));
      }
      recipeSettings();
    }, []);
    return (<div>
        <h1>Recipes</h1>
        <div className="recipe-filters">
          <p>Filters
          <div className="function-buttons">
            <a className="create-button">
            <Link to={`/recipe/create`}>
              <i className="bi bi-plus"></i>
              Create
            </Link>
            </a>
            <a href={`data:application/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(recipes)
            )}`} className="export-button" download="recipes.json">
              <i className="bi bi-cloud-download"></i>
              Export
            </a>
            <a onClick={() => (setSelected([]), setSelectedRecipes(recipes))} className="clear-button">
              <i className="bi bi-eraser-fill"></i>
              Clear Filters
            </a>
          </div>
          </p>
          <button onClick={() => (setSelected([]), setSelectedRecipes(recipes))} className={`${selected.length === 0 ? "selected" : ""}`}>All</button>
          {
            categories.map(category => (
              <button onClick={() => selection(selected, setSelected, category, setSelectedRecipes, recipes)} className={`${selected.includes(category) ? "selected" : ""}`}>{category}</button>
            ))
          }
        </div>
        {
          selectedRecipes.map(recipe => (
            <RecipeCard key={recipe.recipe_id} data={recipe}/>
          ))
        }
    </div>);
};

export default Recipes;