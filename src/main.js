import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
const perPage = 12;
let observer = null;

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) {
    showWarning('Please enter a search query.');
    return;
  }
  if (query !== currentQuery) {
    resetGallery();
    currentPage = 1;
  }
  currentQuery = query;
  try {
    toggleLoader(true);
    const { hits, totalHits } = await fetchImages(query, currentPage, perPage);
    if (!hits || hits.length === 0) {
      showWarning('No images found for your query. Try again!');
      return;
    }
    if (currentPage === 1) showSuccess(`Found ${totalHits} images!`);
    renderGallery(hits);
    setupInfiniteScroll(totalHits);
  } catch (error) {
    showError(error.message || 'Something went wrong. Please try again later.');
  } finally {
    toggleLoader(false);
  }
}

function resetGallery() {
  gallery.innerHTML = '';
  removeSentinel();
}

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function showWarning(message) {
  iziToast.warning({ title: 'Warning', message, position: 'topRight' });
}

function showSuccess(message) {
  iziToast.success({ title: 'Success', message, position: 'topRight' });
}

function showError(message) {
  iziToast.error({ title: 'Error', message, position: 'topRight' });
}

function setupInfiniteScroll(totalHits) {
  if (observer) observer.disconnect();
  const sentinel = createSentinel();
  observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      if (currentPage * perPage >= totalHits) {
        showWarning('You have reached the end of the results.');
        observer.disconnect();
        return;
      }
      currentPage++;
      toggleLoader(true);
      try {
        const { hits } = await fetchImages(currentQuery, currentPage, perPage);
        renderGallery(hits);
      } catch (error) {
        showError('Error loading more images.');
      } finally {
        toggleLoader(false);
      }
    }
  }, { threshold: 1.0 });
  observer.observe(sentinel);
}

function createSentinel() {
  let sentinel = document.querySelector('.sentinel');
  if (!sentinel) {
    sentinel = document.createElement('div');
    sentinel.classList.add('sentinel');
    gallery.after(sentinel);
  }
  return sentinel;
}

function removeSentinel() {
  const sentinel = document.querySelector('.sentinel');
  if (sentinel) sentinel.remove();
}
