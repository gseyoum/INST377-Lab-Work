/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
let randArray = [];
function dataHandler(array) {
  // console.table(array);
  const range = [...Array(15).keys()];
  // sets a random list of restaurant names
  const listItems = range.map((item, index) => {
    const randNum = randomize(0, array.length - 1);
    return array[randNum];
  });
  return listItems;
}

// injects the random array into the list
function injectRandRestList(array) {
  document.querySelector('.resto-list').innerHTML = '';
  array.forEach((item) => {
    const restName = item.name.toLowerCase();
    const restZipCode = item.zip;
    const injectRestName = `<li>${restName}</li>`;
    const injectZipCode = `<li class = 'li-zip'>${restZipCode}</li>`;
    document.querySelector('.resto-list').innerHTML += injectRestName;
    document.querySelector('.resto-list').innerHTML += injectZipCode;
  });
}

// function that randomizes given a min and a max
function randomize(min, max) {
  minimum = Math.ceil(min);
  maximum = Math.floor(max);
  return Math.floor(
    Math.random() * (maximum - minimum + 1) + min
  );
}

// marks the restaurants on our current map
function markerPlace(map, collection) {
  console.log('fires map markers');
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
  collection.forEach(item => {
    const point = item.geocoded_column_1?.coordinates;
    let restCordinates = [point[1], point[0]]; // Transverses the coordinates of each restaurant
    console.log(restCordinates);
    L.marker(restCordinates).addTo(map);
  });
}

// Crreates Map
function initMap() {
  const map = L.map('map').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}

async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.user-form');
  const submitButton = document.querySelector('button');

  const restNameInput = document.querySelector('#rest-name');
  const zipCodeInput = document.querySelector('#zip-code');
  let restVar = 'restaurants';
  const pageMap = initMap();
  submitButton.style.display = 'none';

  // if we dont have the data stored in our browser we load the data from the API
  if (localStorage.getItem(restVar) === null) { // was set as 'undefined' beforre but did not work
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    localStorage.setItem(restVar, JSON.stringify(arrayFromJson)); // Accesses and stores the loaded data locally
    console.log('fires localStorage');
  }
  // if we do have our data stored on ourr browser we can just grab it
  const storedDataString = localStorage.getItem(restVar); // Reads the stored data and returns it
  const storedDataArray = JSON.parse(storedDataString); // Converts the stored data to an array
  console.log(storedDataArray);

  if (storedDataArray.length > 0) {
    submitButton.style.display = 'block';

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"

      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need

      // gives us the randomly generated restaurant list
      currentArray = dataHandler(storedDataArray);
      injectRandRestList(currentArray);
      markerPlace(pageMap, currentArray);
    });

    let currentArray = [];
    restNameInput.addEventListener('input', async (e) => {
      console.log(e.target.value);
      // console.log(currentArray);
      if (storedDataArray.length < 1) {
        console.log('empy');
        return;
      }

      const targetRest = currentArray.filter((item) => {
        // console.log(item.name);
        const lowerName = item.name.toLowerCase();
        const lowerInput = e.target.value.toLowerCase();

        return lowerName.includes(lowerInput);
      });
      console.log(targetRest);
      injectRandRestList(targetRest);
      markerPlace(pageMap, targetRest);
    });

    zipCodeInput.addEventListener('input', (e) => {
      console.log(e.target.value);

      if (storedDataArray.length < 1) {
        console.log('empty');
        return;
      }

      let targetZip = currentArray.filter((item) => {
        // console.log(item.zip);
        return item.zip.includes(e.target.value);
      });

      console.log(targetZip);
      injectRandRestList(targetZip);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests