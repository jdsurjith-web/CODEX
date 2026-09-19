import React, { useState } from "react";

import Dashboard from "./pages/Dashboard";
import AnalyzeWaste from "./pages/AnalyzeWaste";
import PathwayIntelligence from "./pages/PathwayIntelligence";
import MarketMatching from "./pages/MarketMatching";
import Forecast from "./pages/Forecast";
import WhatIfSimulator from "./pages/WhatIfSimulator";

const modules = [
  "Dashboard",
  "Waste Analysis",
  "Pathway Intelligence",
  "Market Matching",
  "Generation Forecast",
  "What-If Simulator",
];

function App() {
  const [activeModule, setActiveModule] = useState("Dashboard");

  function renderPage() {
    switch (activeModule) {
      case "Dashboard":
        return <Dashboard />;

      case "Waste Analysis":
        return <AnalyzeWaste />;

      case "Pathway Intelligence":
        return <PathwayIntelligence />;

      case "Market Matching":
        return <MarketMatching />;

      case "Generation Forecast":
        return <Forecast />;

      case "What-If Simulator":
        return <WhatIfSimulator />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">
          <h1>WASTEWISE</h1>
          <p>AI VALORIZATION</p>
        </div>

        <nav>

          {modules.map((module) => (
            <button
              key={module}
              className={
                activeModule === module
                  ? "nav-button active"
                  : "nav-button"
              }
              onClick={() => setActiveModule(module)}
            >
              {module}
            </button>
          ))}

        </nav>

        <div className="engine-status">
          <span className="status-dot"></span>
          AI Engine Ready
        </div>

      </aside>

      <main className="main">

        <header className="header">

          <div>
            <h2>{activeModule}</h2>

            <p>
              Industrial Waste Valorization Decision Support
            </p>
          </div>

          <div className="system-status">
            ● System Online
          </div>

        </header>

        <section className="content">
          {renderPage()}
        </section>

      </main>

    </div>
  );
}

export default App;