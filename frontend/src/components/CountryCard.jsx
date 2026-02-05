export default function CountryCard({ country }) {
  return (
    <div style={cardStyle}>
      <img
        src={country.flags.svg}
        alt={country.name.common}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{country.name.common}</h3>
      <p>{country.region}</p>
    </div>
  );
}

const cardStyle = {
  width: "200px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "10px",
};
