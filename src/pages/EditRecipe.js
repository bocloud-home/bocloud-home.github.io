import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import yaml from "js-yaml";
import "./EditRecipe.css";

function EditRecipe(props) {
  let { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    steps: [],
    category: "Leves",
  });
  console.log(recipe);
  useEffect(() => {
    fetch("/recipes.yml").then(
      (result) => {
        result.text().then((data) => {
          var recipes = yaml.load(data);
          let tmp = recipes.filter(function (x) {
            return x.recipe_id.localeCompare(id) === 0;
          })[0];
          if (tmp != null) {
            setRecipe(tmp);
            var nameInput = document.getElementById("name");
            var categoryInput = document.getElementById("category");
            var ingredientsInput = document.getElementById("ingredients");
            var stepsInput = document.getElementById("steps");
            nameInput.value = tmp.name;
            categoryInput.value = tmp.category;
            ingredientsInput.value = tmp.ingredients.join('\n');
            stepsInput.value = tmp.steps.join("\n");
          }
        });
        console.log(recipe);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  const [message, setMessage] = useState("");
  const categoryList = ["Leves", "Alap", "Főétel", "Desszert", "Köret"];

  const customSubmit = (e) => {
    e.preventDefault();
    var values = e.target.form.children;
    console.log(values.name.value);
    console.log(values.category.value);
    console.log(values.ingredients.value);
    console.log(values.steps.value);
    console.log(recipe);
  };

  return (
    <div className="editRecipe">
      <div className="editSection">
        <form>
          <label>Recipe name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
          <label>Category:</label>
          <select
            id="category"
            name="category"
          >
            {categoryList.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          <label>Ingredients:</label>
          <textarea
            id="ingredients"
            cols="40"
            rows="10"
            name="ingredients"
            placeholder="Ingredients"
          />
          <br/>
          <label>Steps:</label>
          <textarea
            id="steps"
            placeholder="Step"
            cols="40"
            name="steps"
            rows="5"
          />
          <br/>
          <hr/>
          <button className="submitButton" type="submit" onClick={customSubmit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;
