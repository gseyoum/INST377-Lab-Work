/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function dataHandler(arr) {
    const range = [...Array(30).keys()];
    const listItems = range.map((item, index) => {
      const restNum = getRandomIntInclusive(0, arr.length - 1);
      return arr[restNum];
    });
    return listItems;
  }
  
  function createList(collection) {
    console.log(collection);
    const targetList = document.querySelector('.resto-list');
    targetList.innerHTML = '';
    collection.forEach((item) => {
      const {name} = item;
      const displayName = name.toLowerCase();
      const injectThisItem = `<li>${displayName}</li>`;
      targetList.innerHTML += injectThisItem;
    });
  }
  
  function initMap(targetId) {
    const latlong = [38.7849, -76.8721];
    const map = L.map(targetId).setView(latlong, 13);
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
  
  function addMapMarkers(map, collection) {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });
  
    collection.forEach((item) => {
      const point = item.geocoded_column_1?.coordinates;
      L.marker([point[1], point[0]]).addTo(map);
    });
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const form = document.querySelector('.form-block');
    const submitButton = document.querySelector('button[type="submit"]');
  
    const resto = document.querySelector('#resto_name');
    const zipcode = document.querySelector('#zipcode');
    const map = initMap('map');
    const retrievalVar = 'restaurants';
  
    submitButton.style.display = 'none';
  
    if (localStorage.getItem(retrievalVar) === undefined) {
      const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
      const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  
      localStorage.setItem(retrievalVar, JSON.stringify(arrayFromJson.data));
    }
  
    const storedDataString = localStorage.getItem(retrievalVar);
    const storedDataArray = JSON.parse(storedDataString);
  
    if (storedDataArray.length > 0) {
      submitButton.style.display = 'block';
  
      // eslint-disable-next-line prefer-const
      let currentArray = [];
  
      zipcode.addEventListener('input', async (event) => {
        const selectZip = currentArray.filter((item) => {
          const restoZip = item.zip;
          const zipVal = event.target.value;
          return restoZip.includes(zipVal);
        });
        createList(selectZip);
      });
  
      resto.addEventListener('input', async (event) => {
        const selectResto = storedData.filter((item) => {
          const lowerName = item.name.toLowerCase();
          const lowerValue = event.target.value.toLowerCase();
          return lowerName.includes(lowerValue);
        });
        createList(selectResto);
      });
  
      form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
        submitEvent.preventDefault(); // This prevents your page from refreshing!
        console.log('form submission'); // this is substituting for a "breakpoint"
        // arrayFromJson.data - we're accessing a key called 'data' on the returned object
        // it contains all 1,000 records we need
        currentArray = dataHandler(storedDataArray);
        createList(currentArray);
        addMapMarkers(map, currentArray);
      });
    }
  }
  
  // this actually runs first! It's calling the function above
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests