import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint + "/cities");;
    const data =  await response.json();
    return data;
  }
  catch(err)
  {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const idData =  document.getElementById("data");
  //idData.innerHTML="";

  const divColElem = document.createElement("div");
  divColElem.className= "col-12 col-sm-6 col-lg-3 mb-4"; 

  const aElem = document.createElement("a");
  aElem.setAttribute("href", "pages/adventures/?city=" + id);
  aElem.setAttribute("id", id);

  const divTile =  document.createElement("div");
  divTile.className = "tile"

  const divTileText =  document.createElement("div");
  divTileText.className="tile-text text-center text-white";
  divTileText.innerHTML=`<h5>${city}</h5><p>${description}</p>`;

  const imgElem =  document.createElement("img");
  imgElem.setAttribute("src", image);
  imgElem.setAttribute("alt", "...");
  divTile.appendChild(divTileText);
  divTile.appendChild(imgElem);
  aElem.appendChild(divTile);

  divColElem.appendChild(aElem);

  idData.append(divColElem);

}

export { init, fetchCities, addCityToDOM };
