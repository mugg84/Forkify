import Search from "./modules/Search";
import * as searchView from "./views/searchViews";
import { elements, renderLoader, clearLoader } from "./views/base";

/* Global state of the app
-Seach obj
-Current recipe obj
-liked recipes
*/

const state = {};

const controlSearch = async () => {
  // 1) get query from view
  const query = searchView.getInput(); //later

  if (query) {
    //2) new search obj and add to state
    state.search = new Search(query);

    //3) prepare ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    //4) search for recipes
    await state.search.getResults();

    //5) render results on ui
    clearLoader();
    searchView.renderResults(state.search.result);
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
