export default function AtlasCard({ country, images, sound, context }) {
  return (
    <div className="card">
      <h2>{country}</h2>

      <div className="image-grid">
        {images.map((img, i) => (
          <img key={i} src={img} alt={country} />
        ))}
      </div>

      {sound && <audio controls autoPlay src={sound}></audio>}

      <p className="context">{context}</p>
    </div>
  );
}
