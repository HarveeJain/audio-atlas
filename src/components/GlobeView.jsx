import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const countriesGeoJson =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

export default function GlobeView({ onCountrySelect }) {
  const globeRef = useRef();
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
    <div className="globe-container">
      <Globe
        ref={globeRef}
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
  );
}
