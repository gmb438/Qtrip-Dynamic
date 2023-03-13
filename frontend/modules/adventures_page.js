
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //const city = search.split('=')[1];
  const params = new URLSearchParams(search);
  const city =  params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint + "/adventures?city=" + city);
    const data = await response.json();
    //console.log(data);
    return data;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key)=>{
    const divCol =  document.createElement("div");
    divCol.className="col-6 col-lg-3 mb-4";

    const anchorElem = document.createElement("a");
    anchorElem.setAttribute("href", "detail/?adventure="+ key.id);
    anchorElem.setAttribute("id", key.id);

    const divActivityCard =  document.createElement("div");
    divActivityCard.className ="activity-card";

    const imgElem =  document.createElement("img");
    imgElem.setAttribute("src", key.image);

    const divBanner =  document.createElement("div");
    divBanner.className = "category-banner"
    divBanner.textContent = key.category;

    // const textName =  document.createElement("h5");
    // textName.innerHTML = `<h5>${key.name}</h5>`;
    // const textCost =  document.createElement("p");
    // textCost.innerHTML = `<p>₹${key.costPerHead}</p>`;

    // const textDuration =  document.createElement("h5");
    // textDuration.innerHTML = `<h5>duration</h5>`;
    // const textHours =  document.createElement("p");
    // textHours.innerHTML = `<p>${key.duration} Hours</p>`;
    const divTextName =  document.createElement("div");
    divTextName.className = "d-block d-md-flex text-center justify-content-between mt-3 ps-3 pe-3";
    divTextName.innerHTML = `<h5>${key.name}</h5><p>₹${key.costPerHead}</p>`;
    const divTextDuration =  document.createElement("div");
    divTextDuration.className = "d-block d-md-flex text-center justify-content-between mt-3 ps-3 pe-3";
    divTextDuration.innerHTML = `<h5>Duration</h5><p>${key.duration} Hours</p>`;

    divActivityCard.appendChild(imgElem);
    divActivityCard.appendChild(divBanner);
    divActivityCard.appendChild(divTextName);
    divActivityCard.appendChild(divTextDuration);

    anchorElem.appendChild(divActivityCard);
    divCol.appendChild(anchorElem);

    document.getElementById("data").append(divCol);

  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurList = list.filter((key)=> key.duration>=low && key.duration<=high);
  return filteredDurList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredCatList = [];
  list.filter((key)=>{
    if(categoryList.includes(key.category)){
      filteredCatList.push(key);
    }
  });
  return filteredCatList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList =[];
  let arr = filters["duration"].split("-")

  if(filters["category"].length>0 && filters["duration"].length>0){
    filteredList = filterByCategory(list,filters.category)
    filteredList = filterByDuration(filteredList,parseInt(arr[0]),parseInt(arr[1]))
   }
   else if(filters["category"].length>0){
    filteredList = filterByCategory(list,filters.category);
   }
   else if(filters["duration"].length>0){
    filteredList = filterByDuration(list, parseInt(arr[0]), parseInt(arr[1]));
   }
   else{
     return list;
   }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList =  filters.category;
  //console.log(categoryList);
  categoryList.forEach(category=>{
    const catFilterDiv = document.createElement("div");
    catFilterDiv.className = "category-filter";
    catFilterDiv.textContent= category;
    document.getElementById("category-list").append(catFilterDiv);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
