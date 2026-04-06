import { useEffect, useState } from "react";
import GlobeView from "./components/GlobeView";
import AtlasCard from "./components/AtlasCard";
import Loader from "./components/Loader";
import Tabs from "./components/Tabs";
import Intro from "./components/Intro";
import logo from './assets/logo.png';
import { fetchImages } from "./services/unsplashService";
import { fetchUrbanContext } from "./services/wikiService";
import { fetchRadio } from "./services/radioService";

import "./App.css";

const GEO_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

function App() {
  
  const [showIntro, setShowIntro] = useState(true);

  const [activeTab, setActiveTab] = useState("home");
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(null);
  const [images, setImages] = useState([]);
  const [sound, setSound] = useState(null);
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load country list
  useEffect(() => {
    fetch(GEO_URL)
      .then(res => res.json())
      .then(data => {
        const names = data.features.map(
          feature => feature.properties.name
        );
        setCountryList(names);
      });
  }, []);

  async function loadCountry(selectedCountry, fromGlobe = false) {
    if (!selectedCountry) return;

    if (fromGlobe) {
      setActiveTab("home");
    }

    setLoading(true);
    setCountry(selectedCountry);

    try {
      const [imgData, radioData, wikiData] = await Promise.all([
        fetchImages(`${selectedCountry} city skyline`),
        fetchRadio(selectedCountry),
        fetchUrbanContext(selectedCountry),
      ]);

      setImages(imgData);
      setSound(radioData);
      setContext(wikiData);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function randomCountry() {
    if (!countryList.length) return;

    const random =
      countryList[Math.floor(Math.random() * countryList.length)];

    loadCountry(random);
  }

  useEffect(() => {
    if (countryList.length) {
      randomCountry();
    }
  }, [countryList]);

  return (
    <>
      {/* Intro Overlay */}
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      {/* Main App */}
      <div className="app">
        <img src={logo} className="logo" alt="Audio Atlas Logo" />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "home" && (
          <>
            <button className="refresh-btn" onClick={randomCountry}>
              Explore Another Country
            </button>

            {loading && <Loader />}

            {country && !loading && (
              <AtlasCard
                country={country}
                images={images}
                sound={sound}
                context={context}
              />
            )}
          </>
        )}

        {activeTab === "globe" && (
          <GlobeView onCountrySelect={loadCountry} />
        )}
      </div>
    </>
  );
}

export default App;
