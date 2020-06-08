const base_url = "https://cors-anywhere.herokuapp.com/http://api.football-data.org/";
const API_KEY = "ba85c12da2174620b87994d6177409ec";

// if fetch is successful
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // reject() will make catch called
    return Promise.reject(new Error(response.statusText));
  } else {
    // change object to promise so we can use 'then'
    return Promise.resolve(response);
  }
}

// to parse json to JavaScript array
function json(response) {
  return response.json();
}

// to handle error in catch
function error(error) {
  // error Parameter from Promise.reject()
  console.log("Error : " + error);
}

// request json data 
function getCompetitions() {
  // if data exist in cache, generate it from cache first
  if ("caches" in window) {
    caches.match(base_url + "v2/competitions?plan=TIER_ONE").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          return document.getElementById("competitions").innerHTML = getCompetitionsView(data);
        });
      }
    });
  } 

  // or get data from API
  fetch(base_url + "v2/competitions?plan=TIER_ONE", {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      "X-Auth-Token": API_KEY 
    }
  })
    .then(status)
    .then(json)
    // result generated from data
    .then(function(data) {
      return document.getElementById("competitions").innerHTML = getCompetitionsView(data);
    })
    .catch(error);
}

function getCompetitionById() {
  return new Promise(function(resolve, reject) {
    // getting id from id parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      // if data exist in cache, generate it from cache first
      caches.match(base_url + "v2/competitions/" + idParam + "/standings").then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // send object data so we can save it to indexed db
            resolve(data);

            return document.getElementById("competition-content").innerHTML = getCompetitionByIdView(data);
          });
        }
      });
    }

    // or get data from API
    fetch(base_url + "v2/competitions/" + idParam + "/standings", {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "X-Auth-Token": API_KEY 
      }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        getCompetitionByIdView(data);
        // send object data so we can save it to indexed db
        resolve(data);
    
        // attach data to element with id competition-content
        return document.getElementById("competition-content").innerHTML = getCompetitionByIdView(data);
    });
  });
}

function getSavedCompetitions() {
  // get data from getAll method in db.js
  getAll().then(function(data) {
    // attach data to element with id saved-competitions
    return document.getElementById("saved-competitions").innerHTML = getSavedCompetitionsView(data);
  });
}

function getSavedCompetitionById() {
  return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    
    getById(idParam).then(function(data) {
      // send object data so we can save it to indexed db
      resolve(data);

      // attach data to element with id competition-content
      return document.getElementById("competition-content").innerHTML = getSavedCompetitionByIdView(data);
    });
  });
}