const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const demoAnalysis = {
  recommended_pathway: "Construction Application",
  valorization_score: 91,
  pathways: { reuse: 91, recycling: 78, recovery: 69, disposal: 18 },
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
  environmental: { waste_diverted_tonnes: 10, demo_estimate: true },
  reasons: [
    "High material compatibility",
    "Strong nearby demand",
    "Low contamination",
    "Potential economic value",
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

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.warn(`Using demo mode due to API error: ${error.message}`);
    return null;
  }
}

export async function analyzeWaste(payload) {
  const data = await request("/api/analyze", { method: "POST", body: JSON.stringify(payload) });
  return data || demoAnalysis;
}

export async function getMarketMatches() {
  const data = await request("/api/market");
  return data || { prototype_market_users: [
    { name: "Construction Materials Co.", industry: "Construction", demand: "High", required_quantity: 12, distance_km: 32, compatibility: 92 },
    { name: "Eco Aggregate Works", industry: "Aggregate", demand: "High", required_quantity: 8, distance_km: 47, compatibility: 87 },
    { name: "GreenBuild Industries", industry: "Building Materials", demand: "Medium", required_quantity: 5, distance_km: 61, compatibility: 79 },
  ] };
}

export async function getForecast() {
  const data = await request("/api/forecast");
  return data || {
    average_monthly_tonnes: 68,
    next_month_tonnes: 96,
    projected_value_inr: 280000,
    planning_window_days: 30,
    model_type: "LinearRegression",
    prototype: true,
  };
}

export async function runWhatIf(payload) {
  const data = await request("/api/what-if", { method: "POST", body: JSON.stringify(payload) });
  return data || {
    prototype_scenario_model: true,
    recommended_pathway: "Construction Application",
    pathways: { reuse: 91, recycling: 78, recovery: 69, disposal: 18 },
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
}
