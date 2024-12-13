import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); // Елемент для індикатора завантаження

let currentPage = 1;
let currentQuery = '';
const perPage = 12; // Кількість зображень на сторінку

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    showWarning('Please enter a search query.');
    return;
  }

  if (query !== currentQuery) {
    resetGallery(); // Очистити галерею, якщо пошуковий запит змінився
    currentPage = 1; // Скинути номер сторінки
  }
  currentQuery = query;

  try {
    toggleLoader(true); // Показати індикатор завантаження

    const { hits, totalHits } = await fetchImages(query, currentPage, perPage);
    if (!hits || hits.length === 0) {
      showWarning('No images found for your query. Try again!');
      return;
    }

    if (currentPage === 1) {
      showSuccess(`Found ${totalHits} images!`);
    }

    renderGallery(hits);
    addInfiniteScroll(totalHits); // Додати нескінченний скролл
  } catch (error) {
    showError(error.message || 'Something went wrong. Please try again later.');
  } finally {
    toggleLoader(false); // Сховати індикатор завантаження
  }
}

function resetGallery() {
  gallery.innerHTML = '';
}

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message,
    position: 'topRight',
  });
}

function showSuccess(message) {
  iziToast.success({
    title: 'Success',
    message,
    position: 'topRight',
  });
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}

// Нескінченний скролл
function addInfiniteScroll(totalHits) {
  const observer = new IntersectionObserver(async (entries) => {
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

  const sentinel = document.querySelector('.sentinel');
  if (sentinel) observer.observe(sentinel);
}
