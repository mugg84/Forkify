export default 'I am an export string'

/*
const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`);
replace top with 
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);

in recipe.js

const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);

replaced with
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
*/