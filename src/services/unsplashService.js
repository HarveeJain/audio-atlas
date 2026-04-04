export async function fetchImages(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=5&orientation=landscape&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
    );

    const data = await res.json();
    return data.results.map((img) => img.urls.regular);
  } catch (error) {
    console.error(error);
    return [];
  }
}
