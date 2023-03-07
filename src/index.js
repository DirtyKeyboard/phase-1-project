const show = document.getElementById("action-window");
const carList = document.getElementById("car-list");
let isFiltering = false;

function fetchCars() {
  fetch("http://localhost:3000/CARS")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.forEach((cars) => {
        displayCars(cars);
      });
    });
}

fetchCars();

function displayCars(cars) {
  
  const img = document.createElement("img");
  img.src = cars.img;
  img.alt = cars.model;
  img.style.height = "115px";
  img.style.width = "200px";

  const name = document.createElement("div");
  name.innerText = cars.model;

  carList.append(img, name);

  img.addEventListener("click", () => {
    show.innerText = "";
    const carImg = document.createElement("img");
    carImg.src = cars.img;
    carImg.alt = cars.model;

    const car = document.createElement("div");
    car.innerText = cars.year + " " + cars.make + " " + cars.model;

    const details = document.createElement("p");
    details.innerText = cars.details;

    const seller = document.createElement("span");
    seller.innerText = cars.contact;

    const br = document.createElement("br");

    const buy = document.createElement("button");
    buy.dataset.id = cars.id

    if (cars.sold) {
      buy.innerText = "Sold!";
      buy.disabled = true;
    } else {
      buy.innerText = "Buy!";
    }
    buy.addEventListener("click", (e) => {
      //set cars.sold = true
      fetch(`http://localhost:3000/CARS/${e.target.dataset.id}`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"sold": true})
      }).then(() => {
        buy.disabled = true;
        buy.innerText = "Sold!";
      })

    });

    show.append(carImg, car, details, seller, br, buy);
  });
}

const sellCarBtn = document.querySelector("button.fl");
sellCarBtn.addEventListener("click", showForm);

function showForm(e) {
  show.innerHTML = "";
  const form = document.createElement("form");
  const h = document.createElement("h3");
  const yearIn = document.createElement("input");
  const makeIn = document.createElement("input");
  const modelIn = document.createElement("input");
  const imgIn = document.createElement("input");
  const contactIn = document.createElement("input");
  const detailsIn = document.createElement("input");

  const labelYear = document.createElement("label");
  const labelMake = document.createElement("label");
  const labelModel = document.createElement("label");
  const labelImg = document.createElement("label");
  const labelContact = document.createElement("label");
  const labelDetails = document.createElement("label");
  const br = document.createElement("br");
  const submitBtn = document.createElement("input");

  labelYear.textContent = "Year: ";
  labelMake.textContent = "Make: ";
  labelModel.textContent = "Model: ";
  labelImg.textContent = "Image: ";
  labelContact.textContent = "Contact Info: ";
  labelDetails.textContent = "Details: ";
  submitBtn.textContent = "Submit";

  h.textContent = "Sell Your Car!";
  yearIn.type = "number";
  makeIn.type = "text";
  modelIn.type = "text";
  imgIn.type = "text";
  contactIn.type = "text";
  detailsIn.type = "text";
  submitBtn.type = "submit";

  yearIn.classList.add("new-year");
  makeIn.classList.add("new-make");
  modelIn.classList.add("new-model");
  imgIn.classList.add("new-image");
  contactIn.classList.add("new-contact");
  detailsIn.classList.add("new-details");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCarObject = {
      //year, make, model, img, details, contact
      year: yearIn.value,
      make: makeIn.value,
      model: modelIn.value,
      img: imgIn.value,
      details: detailsIn.value,
      contact: contactIn.value,
      sold: false,
    };
    show.innerHTML = "";
    fetch("http://localhost:3000/CARS/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCarObject),
    }).then(resp => resp.json()).then(returnedCar => {
      console.log(returnedCar)
      displayCars(returnedCar)
    })
    form.reset();
  });
  form.append(
    labelYear,
    yearIn,
    labelMake,
    makeIn,
    labelModel,
    modelIn,
    labelImg,
    imgIn,
    labelContact,
    contactIn,
    br,
    labelDetails,
    detailsIn,
    submitBtn
  );
  show.append(form);
}


const filter = document.getElementById('filterb')
filter.addEventListener('click', (e) => 
{
    if (!isFiltering)
    {
        isFiltering = true;
        filter.innerText = "Filter Sold: ON"
        show.innerHTML = "";
        //filter.textContent = 'Show All Cars'
        //document.querySelector('h2').textContent = 'Car List: Sold'
        carList.innerHTML = "<h2>Car List: Sold</h2>";
        fetch('http://localhost:3000/CARS').then(resp => resp.json()).then(data => data.forEach(el => {
          if (el.sold)
            displayCars(el)
        }))
    }
    else
    {
      isFiltering = false;
      filter.innerText = "Filter Sold: OFF"
      show.innerHTML = "";
      carList.innerHTML = "<h2>Car List: All</h2>";
      //filter.textContent = 'Show Sold Cars'
      //document.querySelector('h2').textContent = 'Car List: All'
      fetch('http://localhost:3000/CARS').then(resp => resp.json()).then(el => el.forEach(displayCars))
    }
})