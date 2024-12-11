import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  if (query !== currentQuery) {
    // Оновлюємо пошуковий запит
    currentQuery = query;
    currentPage = 1;
    resetGallery();
  }

  try {
    const { hits, totalHits } = await fetchImages(query, currentPage);

    if (hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images found. Try another search query.',
        position: 'topRight',
      });
      return;
    }

    iziToast.success({
      title: 'Success',
      message: `Found ${totalHits} images!`,
      position: 'topRight',
    });

    renderGallery(hits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message || 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
}

function resetGallery() {
  gallery.innerHTML = '';
}
