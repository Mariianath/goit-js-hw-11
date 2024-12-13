import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) {
    console.error('Gallery element not found.');
    return;
  }

  if (!images || images.length === 0) {
    gallery.innerHTML = '<p class="no-results">No images to display.</p>';
    return;
  }

  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
          <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </div>
      `;
    })
    .join('');

  gallery.innerHTML += markup;

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
