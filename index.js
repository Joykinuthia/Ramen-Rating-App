
document.addEventListener('DOMContentLoaded', () => {
  const ramenMenu = document.getElementById('ramen-menu');
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  const ramenName = document.querySelector('#ramen-detail .ramen-name');
  const restaurant = document.querySelector('#ramen-detail .restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');
  const newRamenForm = document.getElementById('new-ramen-form');
  const newImageInput = document.getElementById('new-image');

  const fetchRamens = () => {
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(data => data.forEach(displayRamen))
      .catch(error => console.error('Error fetching ramens:', error));
  };

  const displayRamen = (ramen) => {
    const ramenImg = document.createElement('img');
    ramenImg.src = ramen.image;
    ramenImg.alt = ramen.name;
    ramenImg.classList.add('image-slider');
    ramenImg.addEventListener('click', () => {
      handleClick(ramen);
      newImageInput.value = ramen.image; // Auto-fill the image URL input
    });
    ramenMenu.appendChild(ramenImg);
  };

  const handleClick = (ramen) => {
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    ramenName.innerText = ramen.name;
    restaurant.innerText = ramen.restaurant;
    ratingDisplay.innerText = ramen.rating;
    commentDisplay.innerText = ramen.comment;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value,
    };

    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRamen),
    })
      .then(response => response.json())
      .then(displayRamen)
      .catch(error => console.error('Error adding new ramen:', error));

    event.target.reset();
  };

  newRamenForm.addEventListener('submit', handleSubmit);
  fetchRamens();
});