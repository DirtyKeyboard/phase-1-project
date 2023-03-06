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
  const carList = document.querySelector("h2");
  const img = document.createElement("img");
  img.src = cars.img;
  img.alt = cars.model;
  img.style.height = "115px";
  img.style.width = "200px";

  const name = document.createElement("div");
  name.innerText = cars.model;

  carList.append(img, name);

  img.addEventListener("click", () => {
    const show = document.getElementById("action-window");
    show.innerText = "";
    const carImg = document.createElement("img");
    carImg.src = cars.img;
    carImg.alt = cars.model;

    const car = document.createElement("div");
    car.innerText = cars.year + " " + cars.make + " " + cars.model;

    const details = document.createElement("p");
    details.innerText = cars.details;

    show.append(carImg, car, details);
  });
}
