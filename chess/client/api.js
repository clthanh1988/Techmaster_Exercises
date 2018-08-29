//email, password, name, isplaying, tokenkey
const URL_REGISTER = "http://localhost:3000/players/register";
const URL_LOGIN = "http://localhost:3000/players/login";
const URL_UPDATE = "http://localhost:3000/players/update";
const URL_CREATE_GAME = "http://localhost:3000/players/createGame";
const URL_START_GAME = "http://localhost:3000/players/startGame";
const URL_MOVE = "http://localhost:3000/players/move";
const URL_GET_AVAI_PLAYERS = "http://localhost:3000/players/getAvailablePlayers/:pageNumber";
const URL_GET_AVAI_GAMES = "http://localhost:3000/players/getAvailableGames/:pageNumber";

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

let loginPlayer = async (email, password) => {
    try {
        
        let params = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password
              
        })};

        let response = await fetch(
            URL_LOGIN, params);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    } 
};

let updatePlayer = async (id, isplaying, name, password, tokenkey) => {
    try {
        
        let params = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,  
              isplaying,
              name,
              password,
              tokenkey
              
        })};

        let response = await fetch(
            URL_UPDATE, params);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    } 
};

let createGame = async (player1id, player2id, description) => {
    try {
        
        let params = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player1id,
                player2id,
                description
              
        })};

        let response = await fetch(
            URL_CREATE_GAME, params);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    } 
};

let startGame = async (id, player1id, player2id, description) => {
    try {
        
        let params = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                player1id,
                player2id,
                description
              
        })};

        let response = await fetch(
            URL_START_GAME, params);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    } 
};

let move = async (gameid, playerid, piecenumber, dest) => {
    try {
        
        let params = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameid, 
                playerid, 
                piecenumber, 
                dest
              
        })};

        let response = await fetch(
            URL_MOVE, params);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    } 
};

let getAvailablePlayers = async () => {
    try {
       let response = await fetch(
        URL_GET_AVAI_PLAYERS);
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.log(error);
    } 
};

let getAvailableGames = async () => {
    try {
       let response = await fetch(
        URL_GET_AVAI_GAMES);
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.log(error);
    } 
};








module.exports = {
    insertPlayer,
    loginPlayer,
    updatePlayer,
    createGame,
    startGame,
    move,
    getAvailablePlayers,
    getAvailableGames
}
