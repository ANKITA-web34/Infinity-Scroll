const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true 

//Unsplash API
let initialCount = 5;
// const count = 30;
const apiKey = 'OpJirE8viGQQxHwAfVN6TxD9j05UNEJGHnRbLYgvX9w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

//check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

//helper function set arribute
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
};

//create elements for links & photos, add to dom
function displayPhotos() {
  imagesLoaded = 0

  totalImages = photosArray.length;
  console.log('totalimage =', totalImages)
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });   
    //Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    //put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};


//Get photos from api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();

    if (isInitialLoad) { 
      updateAPIURLWithNewCount(30) 
      isInitialLoad = false
    }

  } catch (erroe) {}
};

//check to see the scroll near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos(); 
  }
});
//on load
getPhotos();
