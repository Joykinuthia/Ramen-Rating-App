

const handleClick = (ramen) => {
  document.querySelector("#ramen-detail .detail-image").src = ramen.image;
  document.querySelector("#ramen-detail .detail-image").alt = ramen.name;
  document.querySelector("#ramen-detail .name").innerText = ramen.name;
  document.querySelector("#ramen-detail .restaurant").innerText = ramen.restaurant;
  document.getElementById("rating-display").innerText = ramen.rating;
  document.getElementById("comment-display").innerText = ramen.comment;
};

const displayRamen = (ramenItem) => {
  const ramenMenu = document.getElementById("ramen-menu");
  const ramenImg = document.createElement("img");
  ramenImg.src = ramenItem.image;
  ramenImg.alt = ramenItem.name;
  ramenImg.classList.add("image-slider");
  ramenImg.addEventListener("click", () => handleClick(ramenItem));
  ramenMenu.appendChild(ramenImg);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const newRamenItem = {
    name: form["new-name"].value,
    restaurant: form.restaurant.value,
    image: form.image.value,
    rating: form.rating.value,
    comment: form["new-comment"].value,
  };
  displayRamen(newRamenItem);
  form.reset();
};

const addSubmitListener = () => {
  document.querySelector("#new-ramen").addEventListener("submit", handleSubmit);
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      document.getElementById("ramen-menu").innerHTML = "";
      ramens.forEach(displayRamen);
    })
    .catch(console.error);
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
