const show = document.getElementById("action-window");
const submit = document.getElementById("submit");
const carList = document.getElementById("car-list");

let isFiltering = false;
let formIsShowing = false;

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
  img.classList.add("img-border");
  img.classList.add("side-bar-image");
  img.alt = cars.model;
  img.style.height = "115px";
  img.style.width = "200px";

  const name = document.createElement("div");
  name.innerText = cars.model;

  carList.append(img, name);

  img.addEventListener("click", () => {
    show.innerText = "";
    const carImg = document.createElement("img");
    carImg.classList.add("fade-in-image");
    carImg.classList.add("img-border");
    carImg.src = cars.img;
    carImg.alt = cars.model;

    const car = document.createElement("div");
    car.innerText = cars.year + " " + cars.make + " " + cars.model;
    car.id = "car-title";
    car.className = "fade-in-image";

    const br = document.createElement("br");

    const details = document.createElement("p");
    details.innerText = cars.details;
    details.id = "car-details";
    details.className = "fade-in-image";

    const br1 = document.createElement("br");

    const seller = document.createElement("span");
    seller.innerText = cars.contact;
    seller.id = "car-seller";
    seller.className = "fade-in-image";

    const br2 = document.createElement("br");

    const buy = document.createElement("button");
    buy.dataset.id = cars.id;
    buy.classList.add("fade-in-image");
    buy.classList.add("buy-btn");

    if (cars.sold) {
      buy.innerText = "Sold!";
      buy.disabled = true;
    } else {
      buy.innerText = cars.price + " " + "Buy!";
    }
    buy.addEventListener("click", (e) => {
      fetch(`http://localhost:3000/CARS/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sold: true }),
      }).then(() => {
        buy.disabled = true;
        buy.innerText = "Sold!";
      });
    });

    show.append(carImg, car, br, details, br1, seller, br2, buy);
  });
}

const sellCarBtn = document.querySelector("button#sellb");
sellCarBtn.addEventListener("click", showForm);

function showForm(e) {
  if (formIsShowing) {
    submit.innerHTML = "";
    formIsShowing = false;
  } else {
    formIsShowing = true;
    const form = document.createElement("form");
    const h = document.createElement("h3");
    const yearIn = document.createElement("input");
    const makeIn = document.createElement("input");
    const priceIn = document.createElement("input");
    const modelIn = document.createElement("input");
    const imgIn = document.createElement("input");
    const contactIn = document.createElement("input");
    const detailsIn = document.createElement("input");
    const br = document.createElement("br");
    const labelYear = document.createElement("label");
    const labelMake = document.createElement("label");
    const labelPrice = document.createElement("label");
    const labelModel = document.createElement("label");
    const labelImg = document.createElement("label");
    const labelContact = document.createElement("label");
    const labelDetails = document.createElement("label");
    const submitBtn = document.createElement("input");

    labelYear.textContent = "Year: ";
    labelPrice.textContent = "Price: $";
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
    priceIn.type = "number";
    contactIn.type = "text";
    detailsIn.type = "text";
    submitBtn.type = "submit";

    yearIn.classList.add("new-year");
    makeIn.classList.add("new-make");
    modelIn.classList.add("new-model");
    imgIn.classList.add("new-image");
    priceIn.classList.add("new-price");
    contactIn.classList.add("new-contact");
    detailsIn.classList.add("new-details");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newCarObject = {
        year: yearIn.value,
        make: makeIn.value,
        model: modelIn.value,
        img: imgIn.value,
        price: `$${priceIn.value}`,
        details: detailsIn.value,
        contact: contactIn.value,
        sold: false,
      };
      submit.innerHTML = "";
      fetch("http://localhost:3000/CARS/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCarObject),
      })
        .then((resp) => resp.json())
        .then((returnedCar) => {
          console.log(returnedCar);
          displayCars(returnedCar);
        });
      form.reset();
    });
    form.append(
      labelYear,
      yearIn,
      document.createElement("br"),
      document.createElement("br"),
      labelMake,
      makeIn,
      document.createElement("br"),
      document.createElement("br"),
      labelModel,
      modelIn,
      document.createElement("br"),
      document.createElement("br"),
      labelImg,
      imgIn,
      document.createElement("br"),
      document.createElement("br"),
      labelContact,
      contactIn,
      document.createElement("br"),
      document.createElement("br"),
      labelPrice,
      priceIn,
      document.createElement("br"),
      document.createElement("br"),
      labelDetails,
      detailsIn,
      document.createElement("br"),
      document.createElement("br"),
      submitBtn
    );
    submit.append(form);
  }
}

const filter = document.getElementById("filterb");
filter.addEventListener("click", (e) => {
  if (!isFiltering) {
    isFiltering = true;
    filter.innerText = "Filter Sold: ON";
    show.innerHTML = "";
    carList.innerHTML = "<h2>Car List: Sold</h2>";
    fetch("http://localhost:3000/CARS")
      .then((resp) => resp.json())
      .then((data) =>
        data.forEach((el) => {
          if (el.sold) displayCars(el);
        })
      );
  } else {
    isFiltering = false;
    filter.innerText = "Filter Sold: OFF";
    show.innerHTML = "";
    carList.innerHTML = "<h2>Car List: All</h2>";
    fetch("http://localhost:3000/CARS")
      .then((resp) => resp.json())
      .then((el) => el.forEach(displayCars));
  }
});

const us = document.querySelector(".logo");
us.addEventListener("click", () => {
  show.innerText = "";
  // if (formIsShowing) {
  //   show.innerHTML = "";
  //   formIsShowing = false;
  // } else {
  //   formIsShowing = true;
  const creators = document.createElement("h1");
  creators.innerText = "WebPage Creators";

  const andrew = document.createElement("h2");
  andrew.classList.add("one");

  andrew.innerText = "🏁Andrew Hawilew🏁";

  const aInfo = document.createElement("p");
  aInfo.className = "us";
  aInfo.innerText =
    "- I have been a dev for 2 years now and it's my passion to try and learn every concept about coding.";

  const iggy = document.createElement("h2");
  iggy.className = "two";
  iggy.innerText = "🔥Iggy Huguet🔥";

  const iInfo = document.createElement("p");
  iInfo.className = "us";
  iInfo.innerText =
    "- As a fellow Dev, I have more experience in HTML and CSS but I am in the process of getting more indepth with Javascript.";

  const tim = document.createElement("h2");
  tim.className = "three";
  tim.innerText = "🐌Tim Hoang🐌";

  const tInfo = document.createElement("p");
  tInfo.className = "us";
  tInfo.innerText =
    "- Being the newest member of the group, I am hoping to learn everything I can about coding so I can be a great resource for any newcomer.";

  show.append(creators, andrew, aInfo, iggy, iInfo, tim, tInfo);
});
