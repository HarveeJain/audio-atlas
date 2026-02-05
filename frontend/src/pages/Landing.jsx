import { useState } from "react";
import CountryCard from "../components/CountryCard";

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

      <section style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </section>
    </main>
  );
}
