/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
function mapinit(target) {
  map = L.map(target).setView([38.974, -76.86609], 13);
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoidGtpbmcxMTQiLCJhIjoiY2wyNTk0bDZmMDU1MzNkbGo4MzNxYng3NiJ9.v8gekWvnaPyg40hr0UsSzg'
    }
  ).addTo(map);
  return map;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // eslint-disable-next-line max-len
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function inject(array) {
  console.log('after array is passed in');
  const target = document.querySelector('.resto');
  target.innerHTML = '';
  array.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

function addmarkers(map, collection) {
  // Leaflet can be a bit old-fashioned.
// Here's some code to remove map markers.
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
  collection.forEach((item, index) => {
    const point = item.geocoded_column_1?.coordinates;
    console.log('checking if point works', point);
    L.marker([point[1], point[0]]).addTo(map);
    if (index === 0 && point) {
      map.setView([point[1], point[0]]);
    }
  });
}

function dataHandler(array) {
  console.log('inside data h');
  const target = document.querySelector('.resto');
  target.innerHTML = '';
  const range = [...Array(15).keys()];
  return range.map((elm) => {
    const index = getRandomIntInclusive(0, array.length);
    return array[index];
  });
//   inject(callFuncKey);
//   return callFuncKey;
}

async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
    submitEvent.preventDefault(); // This prevents your page from refreshing!
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it contains all 1,000 records we need
  });
  const restName = document.querySelector('#name');
  const map = mapinit('map');
  const zipName = document.querySelector('#food');
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  let currentArray = [];
  if (arrayFromJson.data.length > 0) {
    console.log('automatically fires after loading');
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      currentArray = dataHandler(arrayFromJson.data);
      console.log(currentArray);
      inject(currentArray);
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
    });
  }
  restName.addEventListener('input', (event) => {
    if (!currentArray.length) {
      return;
    }
    const restaurants = currentArray.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(restaurants, 'filtering');
    const restaurantsCoordinates = restaurants.filter((item) => item.geocoded_column_1);
    console.log('checkinggggggg', restaurantsCoordinates);
    addmarkers(map, restaurantsCoordinates);
    inject(restaurants);
  });

  zipName.addEventListener('input', (event) => {
    if (!currentArray.length) {
      return;
    }
    const restaurants = currentArray.filter((item) => item.zip.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(restaurants, 'filtering');
    const restaurantsCoordinates = restaurants.filter((item) => item.geocoded_column_1);
    console.log('checkinggggggg', restaurantsCoordinates);
    addmarkers(map, restaurantsCoordinates);
    inject(restaurants);
  });
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests