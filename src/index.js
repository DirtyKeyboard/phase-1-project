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
  img.src = cars.Img;
  img.alt = cars.Model;
  img.style.height = "115px";
  img.style.width = "200px";

  //   const name = document.createElement("div");
  //   name.innerText = cars.model;

  carList.append(img);

  img.addEventListener("click", () => {
    const show = document.getElementById("action-window");
    show.innerText = "";
    const carImg = document.createElement("img");
    carImg.src = cars.Img;
    carImg.alt = cars.Model;

    const car = document.createElement("div");
    car.innerText = cars.Year + " " + cars.Make + " " + cars.Model;

    // const details = document.createElement("p")
    // details.innerText = cars.info

    show.append(carImg, car);
  });
}
