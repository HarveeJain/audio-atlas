export const fetchSound = async (query) => {
  const res = await fetch(
    `https://freesound.org/apiv2/search/text/?query=${query}&filter=duration:[30 TO 300]&fields=previews&token=${import.meta.env.VITE_FREESOUND_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sound");
  }

  const data = await res.json();

  if (data.results.length > 0) {
    return data.results[0].previews["preview-hq-mp3"];
  }

  return null;
};
