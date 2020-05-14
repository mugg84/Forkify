import Search from "./modules/Search";

/* Global state of the app
-Seach obj
-Current recipe obj
-liked recipes
*/

const state = {};

const controlSearch = async () => {
  // 1) get query from view
  const query = "pizza"; //later

  if (query) {
    //2) new search obj and add to state
    state.search = new Search(query);
    //3) prepare ui for results

    //4) search for recipes
    await state.search.getResults();

    //5) render results on ui
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
