//email, password, name, isplaying, tokenkey
const URL_REGISTER = "http://localhost:3000/players/register";
var fetch = require("node-fetch");

let insertPlayer = async (email, password, name, isplaying, tokenkey) => {
    try {
        
        let params = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              name,
              isplaying,
              tokenkey
        })};

        let response = await fetch(
            URL_REGISTER, params);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    } 
};

let icaiget = async (email, password, name, isplaying, tokenkey) => {
    try {
       let response = await fetch(
        'https://facebook.github.io/react-native/movies.json');
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.log(error);
    } 
};







module.exports = {
    insertPlayer
}
