export default function AtlasCard({ country, images, sound, context }) {
  return (
    <>
      <style>{`
        .atlas-card {
          width: 100%;
          max-width: 900px;
          margin: 20px auto;
          padding: 16px;
          border-radius: 16px;
          background: #0f0f14;
          color: #fff;
          box-sizing: border-box;
        }

        .atlas-title {
          font-size: 1.8rem;
          margin-bottom: 12px;
          text-align: center;
        }

        .atlas-image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
          margin-bottom: 12px;
        }

        .atlas-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 10px;
          transition: transform 0.2s ease;
        }

        .atlas-image:hover {
          transform: scale(1.03);
        }

        .atlas-audio {
          width: 100%;
          margin: 10px 0;
        }

        .atlas-context {
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .atlas-card {
            padding: 12px;
            border-radius: 12px;
          }

          .atlas-title {
            font-size: 1.4rem;
          }

          .atlas-image {
            height: 120px;
          }

          .atlas-context {
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="atlas-card">
        <h2 className="atlas-title">{country}</h2>

        <div className="atlas-image-grid">
          {images.map((img, i) => (
            <img key={i} src={img} alt={country} className="atlas-image" />
          ))}
        </div>

        {sound && <audio className="atlas-audio" controls src={sound} />}

        <p className="atlas-context">{context}</p>
      </div>
    </>
  );
}