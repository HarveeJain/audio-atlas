export const fetchImage = async (query) => {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch image");
  }

  const data = await res.json();
  return data.urls.regular;
};
