export async function fetchUrbanContext(country) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${country}`
    );

    const data = await res.json();
    return data.extract;
  } catch {
    return "Urban life reflects the rhythm and culture of the country.";
  }
}
