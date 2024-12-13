const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.hits || !data.totalHits) {
      throw new Error('Invalid response format from API.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
