import React from 'react';
import yaml from 'js-yaml';
import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard.js';
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

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    useEffect(() => {
      fetch("/recipes.yml")
      .then(
        (result) => {
          result.text().then( (data) => {
            setRecipes(yaml.load(data));
            setSelectedRecipes(yaml.load(data));
            setCategories(yaml.load(data).map(r => r.category).filter((v, i, self) => self.indexOf(v) === i));
          });
        },
        (error) => {
          console.log(error);
        }
      )
    }, []);
    return (<div>
        <h1>Recipes</h1>
        <div className="recipe-filters">
          <p>Filters
          <div className="function-buttons">
            <a className="create-button">
              <i className="bi bi-plus"></i>
              Create
            </a>
            <a href={`data:text/yaml;charset=utf-8,${encodeURIComponent(
              yaml.dump(recipes, 2)
            )}`} className="export-button" download="recipes.yml">
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