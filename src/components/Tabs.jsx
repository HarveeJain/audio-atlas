export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <div className="tabs-inner">
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          Discover
        </button>

        <button
          className={activeTab === "globe" ? "active" : ""}
          onClick={() => setActiveTab("globe")}
        >
          Globe
        </button>
      </div>
    </div>
  );
}
