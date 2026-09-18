import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  Factory,
  FileText,
  Filter,
  Leaf,
  MapPin,
  Package,
  Play,
  Recycle,
  Search,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

const wasteStreams = [
  {
    id: 1,
    status: "ready",
    waste: "Foundry Sand",
    industry: "Foundry Manufacturing",
    quantity: "2.5 t/w",
    pathway: "Construction",
    demand: "HIGH",
    score: 91,
    compatibility: 92,
    distance: "32 km",
    environmental: 84,
    economic: 90,
    description:
      "High-silica, low-contamination material with strong potential for construction applications.",
  },
  {
    id: 2,
    status: "ready",
    waste: "Fly Ash",
    industry: "Power Generation",
    quantity: "8.2 t/w",
    pathway: "Cement Blending",
    demand: "HIGH",
    score: 87,
    compatibility: 89,
    distance: "45 km",
    environmental: 91,
    economic: 82,
    description:
      "Mineral-rich waste stream with potential for cement and construction material applications.",
  },
  {
    id: 3,
    status: "review",
    waste: "Steel Slag",
    industry: "Steel Manufacturing",
    quantity: "5.1 t/w",
    pathway: "Aggregate Recovery",
    demand: "MEDIUM",
    score: 76,
    compatibility: 78,
    distance: "61 km",
    environmental: 80,
    economic: 74,
    description:
      "Potential aggregate source requiring additional processing and quality verification.",
  },
  {
    id: 4,
    status: "review",
    waste: "Textile Waste",
    industry: "Textile Manufacturing",
    quantity: "1.8 t/w",
    pathway: "Material Recovery",
    demand: "MEDIUM",
    score: 68,
    compatibility: 71,
    distance: "24 km",
    environmental: 76,
    economic: 65,
    description:
      "Mixed textile waste requiring sorting and processing before material recovery.",
  },
  {
    id: 5,
    status: "ready",
    waste: "Rice Husk Ash",
    industry: "Agro Processing",
    quantity: "3.7 t/w",
    pathway: "Material Reuse",
    demand: "HIGH",
    score: 84,
    compatibility: 86,
    distance: "38 km",
    environmental: 88,
    economic: 79,
    description:
      "Silica-rich agricultural residue with potential applications in construction materials.",
  },
];

const metrics = [
  {
    label: "Waste Processed",
    value: "42.5 t",
    trend: "+12.4%",
    description: "this month",
    icon: Package,
  },
  {
    label: "High Potential",
    value: "18",
    trend: "+4",
    description: "streams identified",
    icon: Sparkles,
  },
  {
    label: "Waste Diverted",
    value: "31.2 t",
    trend: "+18.7%",
    description: "from disposal",
    icon: Recycle,
  },
  {
    label: "Avg. Score",
    value: "86/100",
    trend: "+6.2%",
    description: "valorization potential",
    icon: TrendingUp,
  },
];

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLive, setIsLive] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const filteredStreams = useMemo(() => {
    return wasteStreams.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "high" && item.score >= 80) ||
        (filter === "review" && item.status === "review");

      const matchesSearch =
        item.waste.toLowerCase().includes(search.toLowerCase()) ||
        item.industry.toLowerCase().includes(search.toLowerCase()) ||
        item.pathway.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  function exportCSV() {
    const headers = [
      "Waste Stream",
      "Industry",
      "Quantity",
      "Pathway",
      "Demand",
      "Score",
    ];

    const rows = filteredStreams.map((item) => [
      item.waste,
      item.industry,
      item.quantity,
      item.pathway,
      item.demand,
      item.score,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "wastewise-analysis.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="app">
      {/* Background */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* TOP NAV */}
      <header className="topbar">
        <div className="brand" onClick={() => setActivePage("dashboard")}>
          <div className="brand-mark">
            <Recycle size={19} />
          </div>

          <div>
            <div className="brand-name">WASTEWISE</div>
            <div className="brand-sub">RESOURCE INTELLIGENCE</div>
          </div>
        </div>

        <nav className="nav">
          <button
            className={activePage === "dashboard" ? "nav-active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={activePage === "analysis" ? "nav-active" : ""}
            onClick={() => setActivePage("analysis")}
          >
            Analysis
          </button>

          <button
            className={activePage === "market" ? "nav-active" : ""}
            onClick={() => setActivePage("market")}
          >
            Market
          </button>

          <button
            className={activePage === "impact" ? "nav-active" : ""}
            onClick={() => setActivePage("impact")}
          >
            Impact
          </button>
        </nav>

        <div className="top-actions">
          <div className="engine-status">
            <span className="status-dot" />
            AI ENGINE ONLINE
          </div>

          <button
            className="analyze-top"
            onClick={() => setShowAnalyzer(true)}
          >
            <Sparkles size={15} />
            Analyze Waste
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            <section className="hero-row">
              <div>
                <div className="eyebrow">
                  <Activity size={14} />
                  INDUSTRIAL WASTE INTELLIGENCE
                </div>

                <h1>
                  Turn waste streams
                  <br />
                  <span>into potential value.</span>
                </h1>

                <p className="hero-description">
                  WASTEWISE evaluates industrial waste across material
                  properties, market demand, economics and environmental
                  impact to identify feasible valorization pathways.
                </p>
              </div>

              <div className="hero-action">
                <div className="live-card">
                  <div className="live-header">
                    <span className={isLive ? "live-pill" : "paused-pill"}>
                      <span />
                      {isLive ? "LIVE MONITORING" : "MONITORING PAUSED"}
                    </span>
                  </div>

                  <div className="live-value">
                    <span>05</span>
                    <small>active streams</small>
                  </div>

                  <div className="live-footer">
                    <span>AI decision engine</span>

                    <button
                      onClick={() => setIsLive(!isLive)}
                      className="icon-button"
                    >
                      {isLive ? <Clock3 size={16} /> : <Play size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* METRICS */}
            <section className="section">
              <div className="section-title-row">
                <div>
                  <h2>System Overview</h2>
                  <p>Current waste valorization activity</p>
                </div>

                <div className="section-label">
                  <span className="pulse-dot" />
                  Updated just now
                </div>
              </div>

              <div className="metrics-grid">
                {metrics.map((metric) => {
                  const Icon = metric.icon;

                  return (
                    <div className="metric-card" key={metric.label}>
                      <div className="metric-top">
                        <div className="metric-icon">
                          <Icon size={18} />
                        </div>

                        <ArrowUpRight size={15} className="trend-icon" />
                      </div>

                      <div>
                        <div className="metric-label">{metric.label}</div>
                        <div className="metric-value">{metric.value}</div>

                        <div className="metric-trend">
                          {metric.trend}
                          <span>{metric.description}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* WASTE TABLE */}
            <section className="section">
              <div className="section-title-row">
                <div>
                  <div className="title-with-badge">
                    <h2>Current Waste Streams</h2>

                    <span className="count-badge">
                      {filteredStreams.length}
                    </span>
                  </div>

                  <p>
                    AI-analyzed industrial waste and recommended pathways
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setShowAnalyzer(true)}
                >
                  <Sparkles size={16} />
                  Analyze New Stream
                </button>
              </div>

              <div className="toolbar">
                <div className="search-box">
                  <Search size={16} />
                  <input
                    placeholder="Search waste streams..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="toolbar-right">
                  <div className="filter-wrap">
                    <Filter size={15} />

                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All streams</option>
                      <option value="high">High potential</option>
                      <option value="review">Under review</option>
                    </select>
                  </div>

                  <button className="outline-button" onClick={exportCSV}>
                    <Download size={15} />
                    Export
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>STATUS</th>
                      <th>WASTE STREAM</th>
                      <th>INDUSTRY</th>
                      <th>QUANTITY</th>
                      <th>RECOMMENDED PATHWAY</th>
                      <th>MARKET</th>
                      <th>SCORE</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStreams.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedWaste(item)}
                      >
                        <td>
                          <StatusBadge status={item.status} />
                        </td>

                        <td>
                          <div className="waste-name">
                            <div className="waste-icon">
                              <Factory size={15} />
                            </div>

                            <div>
                              <strong>{item.waste}</strong>
                              <span>ID-WW-{String(item.id).padStart(3, "0")}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="muted-cell">
                            {item.industry}
                          </span>
                        </td>

                        <td>
                          <strong className="quantity">
                            {item.quantity}
                          </strong>
                        </td>

                        <td>
                          <div className="pathway-cell">
                            <Recycle size={15} />
                            {item.pathway}
                          </div>
                        </td>

                        <td>
                          <DemandBadge demand={item.demand} />
                        </td>

                        <td>
                          <Score score={item.score} />
                        </td>

                        <td>
                          <ChevronRight
                            size={17}
                            className="row-arrow"
                          />
                        </td>
                      </tr>
                    ))}

                    {filteredStreams.length === 0 && (
                      <tr>
                        <td colSpan="8">
                          <div className="empty-table">
                            No waste streams match your filter.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* BOTTOM AI VALUE */}
            <section className="value-section">
              <div className="value-copy">
                <div className="eyebrow">
                  <Zap size={14} />
                  AI-POWERED VALORIZATION
                </div>

                <h2>
                  We don't classify waste.
                  <br />
                  <span>We decide what it could become.</span>
                </h2>

                <p>
                  WASTEWISE combines material knowledge, market signals,
                  economic feasibility and environmental impact to compare
                  multiple pathways before producing a recommendation.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setShowAnalyzer(true)}
                >
                  Start Waste Analysis
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="value-cards">
                <MiniValue
                  icon={BarChart3}
                  label="Material Suitability"
                  value="92%"
                  detail="High compatibility"
                />

                <MiniValue
                  icon={TrendingUp}
                  label="Market Demand"
                  value="88%"
                  detail="Strong demand"
                />

                <MiniValue
                  icon={Sparkles}
                  label="Valorization Potential"
                  value="91"
                  detail="Overall score"
                />

                <MiniValue
                  icon={Leaf}
                  label="Environmental Benefit"
                  value="84%"
                  detail="High impact potential"
                />
              </div>
            </section>
          </>
        )}

        {/* ANALYSIS PAGE */}
        {activePage === "analysis" && (
          <AnalysisPage onAnalyze={() => setShowAnalyzer(true)} />
        )}

        {/* MARKET PAGE */}
        {activePage === "market" && <MarketPage />}

        {/* IMPACT PAGE */}
        {activePage === "impact" && <ImpactPage />}
      </main>

      {/* DETAIL SHEET */}
      {selectedWaste && (
        <DetailSheet
          waste={selectedWaste}
          onClose={() => setSelectedWaste(null)}
        />
      )}

      {/* ANALYZER MODAL */}
      {showAnalyzer && (
        <AnalyzerModal onClose={() => setShowAnalyzer(false)} />
      )}
    </div>
  );
}


/* ---------------- COMPONENTS ---------------- */

function StatusBadge({ status }) {
  const ready = status === "ready";

  return (
    <span className={ready ? "status-badge ready" : "status-badge review"}>
      <span />
      {ready ? "Ready" : "Review"}
    </span>
  );
}

function DemandBadge({ demand }) {
  return (
    <span
      className={
        demand === "HIGH"
          ? "demand high"
          : "demand medium"
      }
    >
      {demand}
    </span>
  );
}

function Score({ score }) {
  return (
    <div className="score">
      <div className="score-number">{score}</div>

      <div className="score-bar">
        <span style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function MiniValue({ icon: Icon, label, value, detail }) {
  return (
    <div className="mini-value">
      <div className="mini-icon">
        <Icon size={18} />
      </div>

      <div className="mini-content">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}


/* ---------------- ANALYSIS ---------------- */

function AnalysisPage({ onAnalyze }) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            DECISION ENGINE
          </div>

          <h1>Waste Analysis</h1>

          <p>
            Evaluate a waste stream and compare potential valorization
            pathways.
          </p>
        </div>

        <button className="primary-button" onClick={onAnalyze}>
          <Sparkles size={16} />
          Analyze Waste
        </button>
      </div>

      <div className="analysis-placeholder">
        <div className="large-ai-icon">
          <Sparkles size={30} />
        </div>

        <h2>Ready to analyze a waste stream</h2>

        <p>
          Enter composition, quantity, generation pattern and location
          to generate an AI-assisted valorization assessment.
        </p>

        <button className="primary-button" onClick={onAnalyze}>
          Begin Analysis
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}


/* ---------------- MARKET ---------------- */

function MarketPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <TrendingUp size={14} />
            MARKET INTELLIGENCE
          </div>

          <h1>Market Matching</h1>

          <p>
            Match waste characteristics with potential applications
            and demand.
          </p>
        </div>
      </div>

      <div className="market-grid">
        <MarketCard
          title="Construction Materials"
          demand="HIGH"
          compatibility="92%"
          distance="32 km"
        />

        <MarketCard
          title="Cement Blending"
          demand="HIGH"
          compatibility="87%"
          distance="45 km"
        />

        <MarketCard
          title="Aggregate Recovery"
          demand="MEDIUM"
          compatibility="78%"
          distance="61 km"
        />
      </div>
    </div>
  );
}

function MarketCard({ title, demand, compatibility, distance }) {
  return (
    <div className="market-card">
      <div className="market-card-top">
        <div className="market-icon">
          <Factory size={19} />
        </div>

        <DemandBadge demand={demand} />
      </div>

      <h3>{title}</h3>

      <div className="market-stats">
        <div>
          <span>Compatibility</span>
          <strong>{compatibility}</strong>
        </div>

        <div>
          <span>Distance</span>
          <strong>{distance}</strong>
        </div>
      </div>

      <div className="market-progress">
        <span style={{ width: compatibility }} />
      </div>
    </div>
  );
}


/* ---------------- IMPACT ---------------- */

function ImpactPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <Leaf size={14} />
            ENVIRONMENTAL INTELLIGENCE
          </div>

          <h1>Environmental Impact</h1>

          <p>
            Track potential waste diversion and material recovery.
          </p>
        </div>
      </div>

      <div className="impact-grid">
        <ImpactCard
          icon={Recycle}
          value="31.2 t"
          label="Waste Diverted"
          detail="Potential monthly diversion"
        />

        <ImpactCard
          icon={Leaf}
          value="8.2 t"
          label="Material Reused"
          detail="Estimated reusable material"
        />

        <ImpactCard
          icon={Factory}
          value="HIGH"
          label="Impact Potential"
          detail="Across analyzed streams"
        />
      </div>
    </div>
  );
}

function ImpactCard({ icon: Icon, value, label, detail }) {
  return (
    <div className="impact-card">
      <div className="impact-icon">
        <Icon size={21} />
      </div>

      <div className="impact-value">{value}</div>
      <h3>{label}</h3>
      <p>{detail}</p>
    </div>
  );
}


/* ---------------- DETAIL SHEET ---------------- */

function DetailSheet({ waste, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="detail-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-header">
          <div>
            <div className="eyebrow">
              <Sparkles size={13} />
              AI ANALYSIS
            </div>

            <h2>{waste.waste}</h2>
          </div>

          <button className="close-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="sheet-score">
          <div className="big-score">{waste.score}</div>

          <div>
            <span>Valorization Score</span>
            <strong>High potential</strong>
          </div>
        </div>

        <div className="recommendation">
          <div className="recommendation-icon">
            <Recycle size={20} />
          </div>

          <div>
            <small>RECOMMENDED PATHWAY</small>
            <h3>{waste.pathway}</h3>
          </div>
        </div>

        <div className="sheet-section">
          <h3>Decision Factors</h3>

          <Factor
            label="Material Suitability"
            value={waste.compatibility}
          />

          <Factor
            label="Market Demand"
            value={waste.demand === "HIGH" ? 88 : 72}
          />

          <Factor
            label="Economic Potential"
            value={waste.economic}
          />

          <Factor
            label="Environmental Benefit"
            value={waste.environmental}
          />
        </div>

        <div className="sheet-section">
          <h3>Market Match</h3>

          <div className="info-row">
            <span>Potential application</span>
            <strong>{waste.pathway}</strong>
          </div>

          <div className="info-row">
            <span>Estimated distance</span>
            <strong>{waste.distance}</strong>
          </div>

          <div className="info-row">
            <span>Demand</span>
            <DemandBadge demand={waste.demand} />
          </div>
        </div>

        <div className="sheet-section">
          <h3>AI Reasoning</h3>

          <p className="reasoning">
            {waste.description}
          </p>
        </div>
      </aside>
    </div>
  );
}

function Factor({ label, value }) {
  return (
    <div className="factor">
      <div className="factor-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="factor-bar">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}


/* ---------------- ANALYZER ---------------- */

function AnalyzerModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const [form, setForm] = useState({
    industry: "Foundry Manufacturing",
    waste: "Foundry Sand",
    quantity: "2.5",
    silica: "82",
    moisture: "4",
    contamination: "Low",
    generation: "Weekly",
    location: "Industrial Zone",
  });

  function update(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function analyze() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2200);
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="analyzer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="analyzer-header">
          <div>
            <div className="eyebrow">
              <Sparkles size={13} />
              WASTEWISE DECISION ENGINE
            </div>

            <h2>Analyze Waste Stream</h2>
          </div>

          <button className="close-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!analyzed ? (
          <>
            <div className="form-grid">
              <Input
                label="Industry"
                value={form.industry}
                onChange={(v) => update("industry", v)}
              />

              <Input
                label="Waste Type"
                value={form.waste}
                onChange={(v) => update("waste", v)}
              />

              <Input
                label="Quantity (tonnes/week)"
                value={form.quantity}
                onChange={(v) => update("quantity", v)}
              />

              <Input
                label="Generation Pattern"
                value={form.generation}
                onChange={(v) => update("generation", v)}
              />

              <Input
                label="Silica (%)"
                value={form.silica}
                onChange={(v) => update("silica", v)}
              />

              <Input
                label="Moisture (%)"
                value={form.moisture}
                onChange={(v) => update("moisture", v)}
              />

              <Input
                label="Contamination"
                value={form.contamination}
                onChange={(v) => update("contamination", v)}
              />

              <Input
                label="Location"
                value={form.location}
                onChange={(v) => update("location", v)}
              />
            </div>

            <div className="analysis-note">
              <Sparkles size={16} />

              <span>
                WASTEWISE will compare reuse, recycling, recovery and
                disposal pathways before generating a recommendation.
              </span>
            </div>

            <button
              className="analyze-button"
              onClick={analyze}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Analyzing Waste Stream...
                </>
              ) : (
                <>
                  Analyze Waste
                  <ArrowUpRight size={17} />
                </>
              )}
            </button>
          </>
        ) : (
          <AnalysisResult form={form} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="input-field">
      <span>{label}</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}


/* ---------------- RESULT ---------------- */

function AnalysisResult({ form, onClose }) {
  return (
    <div className="analysis-result">
      <div className="result-top">
        <div className="result-score">
          <div className="result-circle">
            <strong>91</strong>
            <span>/100</span>
          </div>

          <div>
            <small>VALORIZATION SCORE</small>
            <h3>High Potential</h3>
            <p>{form.waste}</p>
          </div>
        </div>

        <div className="result-status">
          <CheckCircle2 size={17} />
          Analysis Complete
        </div>
      </div>

      <div className="recommendation-large">
        <div className="recommendation-icon">
          <Recycle size={24} />
        </div>

        <div>
          <small>RECOMMENDED PATHWAY</small>
          <h2>Construction Application</h2>
          <p>
            High material compatibility, strong market demand and
            manageable logistics.
          </p>
        </div>

        <strong>91%</strong>
      </div>

      <div className="result-grid">
        <ResultMetric
          label="Material Suitability"
          value="92%"
        />

        <ResultMetric
          label="Market Demand"
          value="88%"
        />

        <ResultMetric
          label="Economic Potential"
          value="90%"
        />

        <ResultMetric
          label="Environmental Benefit"
          value="84%"
        />
      </div>

      <div className="pathway-section">
        <h3>Pathway Comparison</h3>

        <Pathway name="Reuse" score={74} />
        <Pathway name="Recycling" score={78} />
        <Pathway name="Recovery" score={69} />
        <Pathway name="Disposal" score={18} />
      </div>

      <div className="result-footer">
        <button className="outline-button" onClick={onClose}>
          Close
        </button>

        <button className="primary-button">
          <FileText size={15} />
          View Full Analysis
        </button>
      </div>
    </div>
  );
}

function ResultMetric({ label, value }) {
  return (
    <div className="result-metric">
      <span>{label}</span>
      <strong>{value}</strong>

      <div className="result-progress">
        <span style={{ width: value }} />
      </div>
    </div>
  );
}

function Pathway({ name, score }) {
  return (
    <div className="pathway">
      <div className="pathway-name">
        <span>{name}</span>
        <strong>{score}</strong>
      </div>

      <div className="pathway-bar">
        <span style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}