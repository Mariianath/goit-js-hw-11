import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const loader = document.getElementById('loader');
let currentPage = 1;
let query = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = form.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ message: 'Please enter a search query.' });
    return;
  }

  currentPage = 1;
  clearGallery();
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, currentPage);
    if (data.hits.length === 0) {
      iziToast.warning({ message: 'No images found.' });
    } else {
      renderGallery(data.hits);
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images.' });
  } finally {
    loader.classList.add('hidden');
  }
});
