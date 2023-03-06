function fetchCars() {
  fetch("http://localhost:3000/CARS")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
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
  img.style.height = "125px";
  img.style.width = "125px";
  carList.append(img);

  img.addEventListener("click", () => {});
}
