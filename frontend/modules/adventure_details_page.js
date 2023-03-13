import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventureId = params.get("adventure");
  return adventureId;

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response  = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await response.json();
    // Place holder for functionality to work in the Stubs
    return data;
  }
  catch(err)
  {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventureDetails) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
    document.getElementById("adventure-name").textContent = adventureDetails.name;
    document.getElementById("adventure-subtitle").textContent = adventureDetails.subtitle;
    adventureDetails.images.forEach(image=>{
      const div = document.createElement("div");
      //div.className= "activity-card-image";
      div.innerHTML = `<img src=${image} class="activity-card-image"/>`;
      document.getElementById("photo-gallery").append(div);
    });
    document.getElementById("adventure-content").textContent = adventureDetails.content;
    //console.log(adventureDetails);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGalleryDiv = document.getElementById("photo-gallery");
  photoGalleryDiv.innerHTML=`<div id="carouselImages" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
images.map((image, index)=>{
  let divElem = document.createElement("div");
  divElem.className = `carousel-item ${index === 0? "active":""}`;
  divElem.innerHTML =`<img src=${image} class="activity-card-image"/>`;
  document.getElementById("carousel-inner").append(divElem);
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
      document.getElementById("reservation-cost").textContent = persons * adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    const myForm =  document.getElementById("myForm");
    myForm.addEventListener("submit", async (event)=>{
      event.preventDefault();
      //console.log(event.target.elements)
      const data = {
        name: event.target.elements.name.value,
        date: new Date(event.target.elements.date.value),
        person: event.target.elements.person.value,
        adventure: adventure.id
      }
      //console.log(data);
      try{
        const url =  config.backendEndpoint + "/reservations/new"
        const response = fetch(url,{
          method:"POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        alert("success");
        window.location.reload();
      }
      catch(err){
        alert("failed")
      }

    })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
      if(adventure.reserved ){
          document.getElementById("reserved-banner").style.display="block";
      }else{
        document.getElementById("reserved-banner").style.display="none";
      }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
