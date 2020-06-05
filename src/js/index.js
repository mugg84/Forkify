import Search from "./modules/Search";
import Recipe from "./modules/Recipes";
import * as searchView from "./views/searchViews";
import * as recipeView from "./views/recipesView";
import { elements, renderLoader, clearLoader } from "./views/base";

/* Global state of the app
-Seach obj
-Current recipe obj
-liked recipes
*/

const state = {};

/* SEARCH CONTROLLER */

const controlSearch = async () => {
  // 1) get query from view
  const query = searchView.getInput();

  if (query) {
    //2) new search obj and add to state
    state.search = new Search(query);

    //3) prepare ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //4) search for recipes
      await state.search.getResults();

      //5) render results on ui
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (e) {
      alert("Something went wrong with the search");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/*RECIPE CONTROLLER*/

const controlRecipe = async () => {
  //get ID for url
  const id = window.location.hash.replace("#", "");

  if (id) {
    //prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //highlight selected search item
    if (state.search) {
      searchView.highlightedSelected(id);
    }

    // create recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredientss
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculat servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();

      recipeView.renderRecipe(state.recipe);
    } catch (e) {
      alert("Error processing recipe");
    }
  }
};

//window.addEventListener("hashchange", controlRecipe);
//window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
(".btn-increase, .btn-decrease *");

//handling recipe button cicks
elements.recipe.addEventListener("click", (e) => {
  if (event.target.matches(".btn-decrease, .btn-decrease *")) {
    //decrasse button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.udpateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (event.target.matches(".btn-increase, .btn-increase *")) {
    //incrasse button is clicked
    state.recipe.udpateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
});
