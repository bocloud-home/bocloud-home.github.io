import React from 'react';


class RecipeController {

    constructor() {
        this.recipe = null;
        this.recipes = [];
        this.backendUrl = "http://0526c103.dsl.pool.telekom.hu:5000/api/recipe";
    }

    get(recipeId) {
        fetch(`${this.backendUrl}/${recipeId}`).then((data) => {
            this.recipe = data.json();
        }).catch((error) => {
            console.log(error);
        });
        return this.recipe;
    }

    update(recipe, recipeId) {
        this.recipe = recipe;

    }

    create(recipe) {
        this.recipe = recipe;
    }

   async list() {
        const response = await fetch(`${this.backendUrl}/list`);
        this.recipes = await response.json();
        return this.recipes;
    }
}

export default RecipeController;