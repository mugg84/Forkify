/*
const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`);
replace top with 
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);

in recipe.js

const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);

replaced with
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
*/

//https://forkify-api.herokuapp.com/api/search

import axios from 'axios';

async function getResults(query) {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);

        try {
                const recipes = res.data.recipe;
                console.log(res);
        } catch (error) {
                console.log(error);
        }
}

getResults('pasta');