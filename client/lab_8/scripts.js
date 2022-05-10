function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin);
}

function restoArrayMake(dataArray) {
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  return listItems;
}

function createHtmlList(collection) {
  // console.log('fired HTML creator');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${item.name}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

function initMap() {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(map);
}

// As the last step of your lab, hook this up to index.html
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.selection-form');
  const submit = document.querySelector('.submit_button');

  const restoName = document.querySelector('#name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson); // this is called "dot notation"
  // arrayFromJson.data - we're accessing a key called 'data' on the returned object
  // it contains all 1,000 records we need

  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';

    let currentArray = [];
    restoName.addEventListener('input', async (event) => {
      console.log(event.target.value);
      if (currentArray.length < 1) {
        return;
      }
      const selection = currentArray.filter((item) => {
        const nameLower = item.name.toLowerCase()
        const valueLower = event.target.value.toLowerCase();
        return nameLower.includes(valueLower);
      });
      createHtmlList(selection);
    });

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      currentArray = restoArrayMake(arrayFromJson.data);
      createHtmlList(currentArray);
    });

    zipcode.addEventListener('input', async(event) => {
      if (currentArray.length < 1) {
        return;
      }
      const zipSelection = currentArray.filter((item) => item.zip.includes(event.target.value));
      createHtmlList(zipSelection);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests