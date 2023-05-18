import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryEl = document.querySelector('.gallery');
const imagesMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}" onclick="event.preventDefault()">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
    </li>
    `;
  })
    .join('');
};

function onGalleryItemClick(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  };
  function onEscape(event) {
    if (event.code == "Escape") {
      originalPicture.close();
    }
  };  
  const originalPicture = basicLightbox.create(`<img src="${e.target.dataset.source}">`, {
    onShow: () => {
      document.addEventListener("keydown", onEscape);
    },
    onClose: () => {
      document.removeEventListener("keydown", onEscape);
    }
  });
  originalPicture.show();
}

galleryEl.insertAdjacentHTML('beforeend', imagesMarkup);
galleryEl.addEventListener('click', onGalleryItemClick);
