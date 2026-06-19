import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const countriesGeoJson =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

export default function GlobeView({ onCountrySelect }) {
  const globeRef = useRef();
  const containerRef = useRef();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(countriesGeoJson)
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <>
      <style>{`
        .globe-wrapper {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #050510;
        }

        .globe-container {
          width: min(90vw, 900px);
          height: min(90vw, 900px);
          max-height: 90vh;
          position: relative;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .globe-container {
            width: 85vw;
            height: 85vw;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .globe-container {
            width: 95vw;
            height: 95vw;
          }

          .globe-wrapper {
            height: 80vh;
          }
        }
      `}</style>

      <div className="globe-wrapper">
        <div className="globe-container" ref={containerRef}>
          <Globe
            ref={globeRef}
            width={containerRef.current?.clientWidth}
            height={containerRef.current?.clientHeight}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            polygonsData={countries}
            polygonCapColor={() => "rgba(30,144,255,0.6)"}
            polygonSideColor={() => "rgba(0,100,255,0.15)"}
            polygonStrokeColor={() => "#111"}
            polygonLabel={({ properties: d }) => `${d.name}`}
            onPolygonClick={({ properties: d }) => {
              onCountrySelect(d.name, true);
            }}
          />
        </div>
      </div>
    </>
  );
}