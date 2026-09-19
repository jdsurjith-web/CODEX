import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Factory,
  Gauge,
  MapPinned,
  Navigation,
  Recycle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { analyzeWaste, getForecast, getMarketMatches, runWhatIf } from "./services/api";
import "./App.css";

const demoAnalysis = {
  recommended_pathway: "Construction Application",
  valorization_score: 91,
  pathways: {
    reuse: 91,
    recycling: 78,
    recovery: 69,
    disposal: 18,
  },
  market_match: {
    potential_user: "Prototype Construction Materials User",
    compatibility: 92,
    demand: "High",
    distance_km: 32,
  },
  economic: {
    revenue: 24000,
    processing_cost: 5000,
    transport_cost: 2000,
    avoided_disposal_cost: 7000,
    net_value: 24000,
  },
  environmental: {
    waste_diverted_tonnes: 10,
    demo_estimate: true,
  },
  reasons: [
    "High material compatibility",
    "Strong nearby demand",
    "Low contamination",
    "Practical transport distance",
  ],
  limitations: [
    "Market values are prototype estimates",
    "Environmental factors require verified data",
  ],
  factor_breakdown: {
    material_compatibility: 94,
    market_demand: 92,
    contamination: 90,
    logistics: 88,
    quantity_fit: 83,
    economic_feasibility: 87,
    environmental_benefit: 85,
  },
};

const demoMarket = {
  prototype_market_users: [
    { name: "Construction Materials Co.", industry: "Construction", demand: "High", required_quantity: 12, distance_km: 32, compatibility: 92 },
    { name: "Eco Aggregate Works", industry: "Aggregate", demand: "High", required_quantity: 8, distance_km: 47, compatibility: 87 },
    { name: "GreenBuild Industries", industry: "Building Materials", demand: "Medium", required_quantity: 5, distance_km: 61, compatibility: 79 },
  ],
};

const demoForecast = {
  average_monthly_tonnes: 68,
  next_month_tonnes: 96,
  projected_value_inr: 280000,
  planning_window_days: 30,
  model_type: "LinearRegression",
  prototype: true,
  historical: [
    { month: "Jan", value: 52 },
    { month: "Feb", value: 57 },
    { month: "Mar", value: 59 },
    { month: "Apr", value: 64 },
    { month: "May", value: 67 },
    { month: "Jun", value: 71 },
    { month: "Jul", value: 74 },
    { month: "Aug", value: 77 },
    { month: "Sep", value: 80 },
    { month: "Oct", value: 84 },
    { month: "Nov", value: 90 },
    { month: "Dec", value: 93 },
    { month: "Jan+", value: 96 },
  ],
};

const demoWhatIf = {
  prototype_scenario_model: true,
  recommended_pathway: "Construction Application",
  pathways: {
    reuse: 91,
    recycling: 78,
    recovery: 69,
    disposal: 18,
  },
  factor_breakdown: {
    material_compatibility: 94,
    market_demand: 88,
    contamination: 78,
    logistics: 84,
    quantity_fit: 85,
    economic_feasibility: 81,
    environmental_benefit: 82,
  },
};

const trendData = [
  { name: "Jan", value: 68 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 74 },
  { name: "Apr", value: 81 },
  { name: "May", value: 88 },
  { name: "Jun", value: 92 },
  { name: "Jul", value: 96 },
];

const pathwayColors = {
  reuse: "#5eead4",
  recycling: "#34d399",
  recovery: "#10b981",
  disposal: "#f59e0b",
};

const defaultForm = {
  industry: "Foundry",
  waste_type: "Foundry Sand",
  quantity: 2.5,
  generation_frequency: "Weekly",
  composition: { silica: 82, moisture: 4, other: 14 },
  contamination: "Low",
  location: "Coimbatore",
};

function App() {
  const [analysis, setAnalysis] = useState(demoAnalysis);
  const [market, setMarket] = useState(demoMarket);
  const [forecast, setForecast] = useState(demoForecast);
  const [whatIf, setWhatIf] = useState(demoWhatIf);
  const [loading, setLoading] = useState(false);
  const [apiMode, setApiMode] = useState("DEMO MODE");

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      try {
        const result = await getForecast();
        if (active && result) {
          setForecast({ ...demoForecast, ...result, historical: trendData });
          setApiMode("LIVE DATA");
        }
      } catch {
        setApiMode("DEMO MODE");
      }
    };
    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <TopNav />
        <div className="status-banner">
          <span className="dot" />
          {apiMode} • AI ENGINE ONLINE
        </div>
        <Routes>
          <Route path="/" element={<Dashboard analysis={analysis} forecast={forecast} />} />
          <Route path="/analyze" element={<AnalyzePage setAnalysis={setAnalysis} setLoading={setLoading} loading={loading} apiMode={apiMode} />} />
          <Route path="/results" element={<ResultsPage analysis={analysis} />} />
          <Route path="/pathways" element={<PathwaysPage analysis={analysis} />} />
          <Route path="/what-if" element={<WhatIfPage analysis={analysis} setAnalysis={setAnalysis} whatIf={whatIf} setWhatIf={setWhatIf} />} />
          <Route path="/market" element={<MarketPage market={market} />} />
          <Route path="/forecast" element={<ForecastPage forecast={forecast} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function TopNav() {
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Analyze", path: "/analyze" },
    { label: "Intelligence", path: "/pathways" },
    { label: "What-If", path: "/what-if" },
    { label: "Market", path: "/market" },
    { label: "Forecast", path: "/forecast" },
  ];

  return (
    <header className="topbar glass-panel">
      <div className="brand-wrap">
        <div className="brand-mark">W</div>
        <div>
          <div className="brand-title">WASTEWISE AI</div>
        </div>
      </div>
      <nav className="nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="live-pill">
        <span className="dot small" />
        AI ENGINE ONLINE
      </div>
    </header>
  );
}

function Dashboard({ analysis, forecast }) {
  const trendMetric = useMemo(() => [
    { name: "Waste Streams", value: 248 },
    { name: "Material Diverted", value: "1,284 T" },
    { name: "Value Recovered", value: "₹18.6L" },
    { name: "CO₂ Avoided", value: "426 T" },
  ], []);

  return (
    <main className="page-shell">
      <section className="hero panel glass-panel">
        <div className="hero-copy">
          <div className="eyebrow">Industrial Waste Intelligence</div>
          <h1>Turn waste into opportunity.</h1>
          <p>
            WASTEWISE AI analyzes industrial waste and determines the most valuable pathway — from reuse and recycling to recovery and market matching.
          </p>
          <div className="cta-row">
            <NavLink to="/analyze" className="primary-btn">Analyze Waste</NavLink>
            <NavLink to="/pathways" className="secondary-btn">Explore Intelligence</NavLink>
          </div>
          <div className="floating-chips">
            <span>REUSE</span>
            <span>MARKET</span>
            <span>IMPACT</span>
          </div>
        </div>
        <div className="orb-wrap">
          <div className="orb-core">
            <div className="orb-ring ring-one" />
            <div className="orb-ring ring-two" />
            <div className="orb-center">
              <span>Waste</span>
              <span className="arrow">→</span>
              <span>AI</span>
              <span className="arrow">→</span>
              <span>Market</span>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        {trendMetric.map((card) => (
          <div key={card.name} className="metric-card glass-panel">
            <div className="metric-label">{card.name}</div>
            <div className="metric-value">{card.value}</div>
            <div className="metric-note">Prototype estimate</div>
          </div>
        ))}
      </section>

      <section className="content-grid two-up">
        <div className="glass-panel panel">
          <SectionHeader title="Material diversion trend" icon={<TrendingUp size={18} />} />
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="diversionGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#34d399" fill="url(#diversionGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel panel latest-card">
          <SectionHeader title="Latest AI decision" icon={<Sparkles size={18} />} />
          <div className="decision-meta">
            <div><span>Waste</span><strong>Foundry Sand</strong></div>
            <div><span>Quantity</span><strong>2.5 T/week</strong></div>
            <div><span>Recommended pathway</span><strong>{analysis.recommended_pathway}</strong></div>
            <div><span>Valorization Score</span><strong>{analysis.valorization_score}/100</strong></div>
            <div><span>Market compatibility</span><strong>{analysis.market_match.compatibility}%</strong></div>
            <div><span>Demand</span><strong>{analysis.market_match.demand}</strong></div>
            <div><span>Distance</span><strong>{analysis.market_match.distance_km} km</strong></div>
          </div>
        </div>
      </section>

      <section className="panel glass-panel summary-panel">
        <SectionHeader title="Forecast insight" icon={<BarChart3 size={18} />} />
        <div className="summary-grid">
          <div>
            <div className="summary-label">Average monthly</div>
            <div className="summary-value">{forecast.average_monthly_tonnes} T</div>
          </div>
          <div>
            <div className="summary-label">Next month</div>
            <div className="summary-value">{forecast.next_month_tonnes} T</div>
          </div>
          <div>
            <div className="summary-label">Projected value</div>
            <div className="summary-value">₹{(forecast.projected_value_inr / 100000).toFixed(1)}L</div>
          </div>
          <div>
            <div className="summary-label">Planning window</div>
            <div className="summary-value">{forecast.planning_window_days} days</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AnalyzePage({ setAnalysis, setLoading, loading, apiMode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);

  const handleChange = (field, value) => {
    if (field === "silica" || field === "moisture" || field === "other") {
      setForm((prev) => ({
        ...prev,
        composition: { ...prev.composition, [field]: Number(value) },
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const payload = {
      industry: form.industry,
      waste_type: form.waste_type,
      quantity: Number(form.quantity),
      generation_frequency: form.generation_frequency,
      composition: {
        silica: Number(form.composition.silica),
        moisture: Number(form.composition.moisture),
        other: Number(form.composition.other),
      },
      contamination: form.contamination,
      location: form.location,
    };

    try {
      const result = await analyzeWaste(payload);
      setAnalysis(result);
      setTimeout(() => {
        setLoading(false);
        navigate("/results");
      }, 2200);
    } catch {
      setAnalysis(demoAnalysis);
      setTimeout(() => {
        setLoading(false);
        navigate("/results");
      }, 2200);
    }
  };

  return (
    <main className="page-shell narrow-shell">
      <section className="panel glass-panel form-panel">
        <div className="panel-head">
          <div>
            <div className="eyebrow">Waste Analysis</div>
            <h2>Analyze industrial waste profile</h2>
          </div>
          <div className="badge-chip">{apiMode}</div>
        </div>

        <form className="analysis-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Industry
              <input value={form.industry} onChange={(e) => handleChange("industry", e.target.value)} />
            </label>
            <label>
              Waste Type
              <input value={form.waste_type} onChange={(e) => handleChange("waste_type", e.target.value)} />
            </label>
            <label>
              Quantity
              <input type="number" step="0.1" value={form.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
            </label>
            <label>
              Generation Frequency
              <select value={form.generation_frequency} onChange={(e) => handleChange("generation_frequency", e.target.value)}>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </label>
            <label>
              Silica
              <input type="range" min="0" max="100" value={form.composition.silica} onChange={(e) => handleChange("silica", e.target.value)} />
              <span>{form.composition.silica}%</span>
            </label>
            <label>
              Moisture
              <input type="range" min="0" max="50" value={form.composition.moisture} onChange={(e) => handleChange("moisture", e.target.value)} />
              <span>{form.composition.moisture}%</span>
            </label>
            <label>
              Contamination
              <select value={form.contamination} onChange={(e) => handleChange("contamination", e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label>
              Location
              <input value={form.location} onChange={(e) => handleChange("location", e.target.value)} />
            </label>
          </div>

          {loading ? (
            <div className="loader-panel">
              <div className="loader-header">Running AI valorization analysis</div>
              <div className="pipeline">
                {[
                  "01 Material Analysis",
                  "02 Pathway Evaluation",
                  "03 Market Matching",
                  "04 Economic Evaluation",
                  "05 Environmental Evaluation",
                ].map((step, index) => (
                  <div key={step} className={`pipeline-step ${index === 0 ? "active" : ""}`}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <button className="primary-btn submit-btn" type="submit">RUN AI VALORIZATION ANALYSIS</button>
          )}
        </form>
      </section>
    </main>
  );
}

function ResultsPage({ analysis }) {
  const chartData = [
    { name: "Material compatibility", value: analysis.factor_breakdown.material_compatibility },
    { name: "Market demand", value: analysis.factor_breakdown.market_demand },
    { name: "Logistics", value: analysis.factor_breakdown.logistics },
  ];

  return (
    <main className="page-shell">
      <section className="results-hero panel glass-panel">
        <div>
          <div className="eyebrow">Decision result</div>
          <h2>{analysis.valorization_score} / 100</h2>
          <div className="result-pathway">Recommended pathway: {analysis.recommended_pathway}</div>
          <p>
            This recommendation is based on material compatibility, nearby demand, contamination profile, and practical transport feasibility. The pathway is not a generic classification; it is a decision outcome grounded in the specific waste characteristics and market conditions.
          </p>
        </div>
        <div className="score-ring">
          <span>{analysis.valorization_score}</span>
        </div>
      </section>

      <section className="content-grid two-up">
        <div className="glass-panel panel">
          <SectionHeader title="Why this pathway" icon={<ShieldCheck size={18} />} />
          <ul className="reason-list">
            {analysis.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <div className="stats-list">
            <div><span>Market Match</span><strong>{analysis.market_match.compatibility}%</strong></div>
            <div><span>Demand</span><strong>{analysis.market_match.demand}</strong></div>
            <div><span>Distance</span><strong>{analysis.market_match.distance_km} km</strong></div>
          </div>
        </div>

        <div className="glass-panel panel">
          <SectionHeader title="Decision factors" icon={<Gauge size={18} />} />
          <div className="bar-stack">
            {Object.entries(analysis.factor_breakdown).slice(0, 5).map(([key, value]) => (
              <div key={key} className="bar-row">
                <div className="bar-label">{key.replace(/_/g, " ")}</div>
                <div className="bar-track"><span style={{ width: `${value}%` }} /></div>
                <div className="bar-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <NavLink className="primary-btn" to="/pathways">Explore Pathways</NavLink>
        <NavLink className="secondary-btn" to="/what-if">Test What-If Scenario</NavLink>
        <NavLink className="secondary-btn" to="/market">Find Market Match</NavLink>
      </section>

      <section className="glass-panel panel">
        <SectionHeader title="Economic analysis" icon={<Zap size={18} />} />
        <div className="economic-grid">
          <div><span>Potential revenue</span><strong>₹{analysis.economic.revenue.toLocaleString()}</strong></div>
          <div><span>Processing cost</span><strong>₹{analysis.economic.processing_cost.toLocaleString()}</strong></div>
          <div><span>Transport cost</span><strong>₹{analysis.economic.transport_cost.toLocaleString()}</strong></div>
          <div><span>Avoided disposal</span><strong>₹{analysis.economic.avoided_disposal_cost.toLocaleString()}</strong></div>
          <div><span>Net value</span><strong>₹{analysis.economic.net_value.toLocaleString()}</strong></div>
        </div>
        <p className="note">Prototype values require real market validation before broader commercialization decisions.</p>
      </section>

      <section className="glass-panel panel">
        <SectionHeader title="Environmental impact" icon={<Recycle size={18} />} />
        <div className="economic-grid">
          <div><span>Waste diverted</span><strong>{analysis.environmental.waste_diverted_tonnes} tonnes</strong></div>
          <div><span>CO₂ avoided</span><strong>Prototype estimate</strong></div>
          <div><span>Landfill reduction</span><strong>Demo estimate</strong></div>
          <div><span>Material recovery</span><strong>Illustrative value</strong></div>
        </div>
      </section>
    </main>
  );
}

function PathwaysPage({ analysis }) {
  const cards = [
    { id: "reuse", label: "Construction Application", score: analysis.pathways.reuse, explanation: "Best fit for silica-rich material with nearby demand and low contamination.", factors: ["High compatibility", "Strong market pull", "Low processing burden"] },
    { id: "recycling", label: "Recycling", score: analysis.pathways.recycling, explanation: "Viable when the waste requires controlled processing and quality standardization.", factors: ["Moderate processing", "Demand meets reuse potential", "Transport feasible"] },
    { id: "recovery", label: "Recovery / Treatment", score: analysis.pathways.recovery, explanation: "Preferred if contamination or composition changes reduce direct material reuse.", factors: ["Energy recovery", "Treatment required", "Higher handling complexity"] },
    { id: "disposal", label: "Disposal", score: analysis.pathways.disposal, explanation: "Least preferred path under the current conditions.", factors: ["Low value", "Higher long-term burden", "Weak circularity"] },
  ];

  return (
    <main className="page-shell">
      <section className="panel glass-panel">
        <SectionHeader title="Pathway intelligence" icon={<Navigation size={18} />} />
        <div className="pathway-grid">
          {cards.map((item) => (
            <div key={item.id} className={`pathway-card ${analysis.recommended_pathway === item.label ? "highlight" : ""}`}>
              <div className="pathway-score">{item.score}</div>
              <div className="pathway-name">{item.label}</div>
              <p>{item.explanation}</p>
              <ul>
                {item.factors.map((factor) => <li key={factor}>{factor}</li>)}
              </ul>
              <div className="mini-bar"><span style={{ width: `${item.score}%`, background: pathwayColors[item.id] || "#5eead4" }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel glass-panel decision-flow-card">
        <SectionHeader title="Decision flow" icon={<Factory size={18} />} />
        <div className="decision-flow">
          {[
            "Waste Profile",
            "AI Scoring",
            "Market Demand",
            "Economic Feasibility",
            "Environmental Impact",
            "Recommended Pathway",
          ].map((step, index) => (
            <div key={step} className="flow-step">
              <span>{step}</span>
              {index < 5 && <ArrowRight size={16} />}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function WhatIfPage({ analysis, setAnalysis, whatIf, setWhatIf }) {
  const [scenario, setScenario] = useState({
    contamination: 15,
    demand: 80,
    transport_distance: 25,
    quantity: 2.5,
    processing_cost: 5000,
    transport_cost: 2000,
  });

  useEffect(() => {
    const endpoint = async () => {
      try {
        const result = await runWhatIf(scenario);
        setWhatIf(result);
        setAnalysis((prev) => ({ ...prev, recommended_pathway: result.recommended_pathway, pathways: result.pathways, factor_breakdown: result.factor_breakdown }));
      } catch {
        const fallback = {
          ...demoWhatIf,
          recommended_pathway: scenario.contamination > 45 ? "Recovery / Treatment" : scenario.demand < 45 ? "Recycling" : "Construction Application",
        };
        setWhatIf(fallback);
      }
    };
    endpoint();
  }, [scenario, setAnalysis, setWhatIf]);

  return (
    <main className="page-shell">
      <section className="two-up-grid">
        <div className="panel glass-panel">
          <SectionHeader title="What-If simulator" icon={<Gauge size={18} />} />
          <div className="slider-stack">
            {[
              ["Contamination", "contamination", 0, 100, 15],
              ["Market Demand", "demand", 0, 100, 80],
              ["Transport Distance", "transport_distance", 0, 200, 25],
              ["Waste Quantity", "quantity", 0.5, 10, 2.5],
              ["Processing Cost", "processing_cost", 1000, 15000, 5000],
              ["Transport Cost", "transport_cost", 500, 12000, 2000],
            ].map(([label, key, min, max, initial]) => (
              <label key={key} className="slider-row">
                <div className="slider-header">
                  <span>{label}</span>
                  <strong>{scenario[key]}{key === "quantity" ? " T/week" : key.includes("Cost") ? " ₹" : "%"}</strong>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={key === "quantity" ? 0.1 : 1}
                  value={scenario[key]}
                  onChange={(e) => setScenario((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="panel glass-panel">
          <SectionHeader title="Scenario result" icon={<Sparkles size={18} />} />
          <div className="scenario-result">
            <div className="score-pill">Current Valorization Score: {analysis.valorization_score}</div>
            <h3>{whatIf.recommended_pathway || "Construction Application"}</h3>
            <div className="mini-bar"><span style={{ width: `${analysis.valorization_score}%` }} /></div>
            <div className="factor-list">
              {Object.entries(whatIf.factor_breakdown || analysis.factor_breakdown).map(([key, value]) => (
                <div key={key} className="factor-item">
                  <span>{key.replace(/_/g, " ")}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MarketPage({ market }) {
  const chartData = market.prototype_market_users.map((user) => ({
    name: user.name.split(" ")[0],
    compatibility: user.compatibility,
  }));

  return (
    <main className="page-shell">
      <section className="panel glass-panel">
        <SectionHeader title="Market intelligence" icon={<Building2 size={18} />} />
        <div className="market-summary">Prototype market users</div>
        <div className="market-grid">
          {market.prototype_market_users.map((user) => (
            <div key={user.name} className="market-card glass-panel">
              <div className="market-header">
                <strong>{user.name}</strong>
                <span>{user.industry}</span>
              </div>
              <div className="market-row"><span>Demand</span><strong>{user.demand}</strong></div>
              <div className="market-row"><span>Required quantity</span><strong>{user.required_quantity} T/week</strong></div>
              <div className="market-row"><span>Distance</span><strong>{user.distance_km} km</strong></div>
              <div className="market-row"><span>Compatibility</span><strong>{user.compatibility}%</strong></div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel glass-panel chart-panel">
        <SectionHeader title="Compatibility comparison" icon={<MapPinned size={18} />} />
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="compatibility" radius={[10, 10, 0, 0]} fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}

function ForecastPage({ forecast }) {
  const historyData = forecast.historical || trendData;
  const comparison = [
    ...historyData.map((entry) => ({ ...entry, type: "historical" })),
    { month: "Next", value: forecast.next_month_tonnes, type: "forecast" },
  ];

  return (
    <main className="page-shell">
      <section className="grid-three">
        <div className="glass-panel panel metric-card compact">
          <div className="metric-label">Average monthly</div>
          <div className="metric-value">{forecast.average_monthly_tonnes} T</div>
        </div>
        <div className="glass-panel panel metric-card compact">
          <div className="metric-label">Next month</div>
          <div className="metric-value">{forecast.next_month_tonnes} T</div>
        </div>
        <div className="glass-panel panel metric-card compact">
          <div className="metric-label">Projected value</div>
          <div className="metric-value">₹{(forecast.projected_value_inr / 100000).toFixed(1)}L</div>
        </div>
      </section>

      <section className="panel glass-panel chart-panel">
        <SectionHeader title="Historical vs forecast" icon={<TrendingUp size={18} />} />
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={comparison}>
            <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line dataKey="value" stroke="#5eead4" strokeWidth={3} dot={{ fill: "#5eead4" }} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <div className="section-header">
      <div className="icon-box">{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

export default App;