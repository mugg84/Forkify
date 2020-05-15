import Search from "./modules/Search";
import * as searchView from "./views/searchViews";
import { elements } from "./views/base";

/* Global state of the app
-Seach obj
-Current recipe obj
-liked recipes
*/

const state = {};

const controlSearch = async () => {
  // 1) get query from view
  const query = searchView.getInput(); //later
  console.log(query);

  if (query) {
    //2) new search obj and add to state
    state.search = new Search(query);

    //3) prepare ui for results
    searchView.clearInput();
    searchView.clearResults();

    //4) search for recipes
    await state.search.getResults();

    //5) render results on ui
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
