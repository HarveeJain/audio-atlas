import { useState } from "react";

export default function Landing() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCountry(e) {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setCountries([]);

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${query}`
      );

      if (!res.ok) {
        throw new Error("Country not found");
      }

      const data = await res.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Find a destination you vibe with</h1>

      <form onSubmit={searchCountry}>
        <input
          type="text"
          placeholder="Search your dream destination"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <section>
        {countries.map((country) => (
          <div key={country.cca3}>
            <h3>{country.name.common}</h3>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.[0]}</p>
            <img
              src={country.flags.svg}
              alt={country.name.common}
              width="150"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
