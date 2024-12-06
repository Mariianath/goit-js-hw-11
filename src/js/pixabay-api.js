const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'ВАШ_КЛЮЧ';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
