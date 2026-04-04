export async function fetchRadio(country) {
  try {
    const res = await fetch(
      `https://de1.api.radio-browser.info/json/stations/bycountry/${country}`
    );

    const data = await res.json();

    const valid = data.filter(
      (s) => s.url_resolved && s.url_resolved.startsWith("https")
    );

    if (!valid.length) return null;

    const random =
      valid[Math.floor(Math.random() * valid.length)];

    return random.url_resolved;
  } catch {
    return null;
  }
}
