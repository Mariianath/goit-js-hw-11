import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Search field cannot be empty!' });
    return;
  }

  clearGallery();
  loader.classList.remove('hidden');
  currentQuery = query;
  currentPage = 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({ title: 'No results', message: 'Try another search term.' });
      return;
    }

    renderGallery(data.hits);
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images.' });
  } finally {
    loader.classList.add('hidden');
  }
});
