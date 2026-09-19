import React, { useState } from "react";
import { analyzeWaste } from "../api";

function AnalyzeWaste() {

  const [form, setForm] = useState({
    industry: "Foundry Manufacturing",
    waste_type: "Foundry Sand",
    quantity: 2.5,
    unit: "tonnes/week",
    silica: 82,
    moisture: 4,
    contamination: "Low",
    generation_pattern: "Weekly",
    location: "Industrial Zone",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function update(field, value) {

    setForm({
      ...form,
      [field]: value,
    });

  }

  async function handleAnalyze(e) {

    e.preventDefault();

    setLoading(true);

    setError("");

    setResult(null);

    try {

      const data = await analyzeWaste({
        industry: form.industry,

        waste_type: form.waste_type,

        quantity: Number(form.quantity),

        unit: form.unit,

        composition: {
          silica: Number(form.silica),
          moisture: Number(form.moisture),
        },

        contamination: form.contamination,

        generation_pattern:
          form.generation_pattern,

        location: form.location,
      });

      setResult(data);

    } catch (err) {

      setError(
        "Backend connection failed. Make sure FastAPI is running on port 8000."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div>

      <div className="page-title">

        <h1>Analyze Waste</h1>

        <p>
          Enter the characteristics of an industrial
          waste stream for valorization analysis.
        </p>

      </div>

      <form
        className="analysis-form"
        onSubmit={handleAnalyze}
      >

        <Input
          label="Industry"
          value={form.industry}
          onChange={(v) => update("industry", v)}
        />

        <Input
          label="Waste Type"
          value={form.waste_type}
          onChange={(v) => update("waste_type", v)}
        />

        <Input
          label="Quantity"
          type="number"
          value={form.quantity}
          onChange={(v) => update("quantity", v)}
        />

        <Input
          label="Silica (%)"
          type="number"
          value={form.silica}
          onChange={(v) => update("silica", v)}
        />

        <Input
          label="Moisture (%)"
          type="number"
          value={form.moisture}
          onChange={(v) => update("moisture", v)}
        />

        <Input
          label="Location"
          value={form.location}
          onChange={(v) => update("location", v)}
        />

        <label>
          Contamination

          <select
            value={form.contamination}
            onChange={(e) =>
              update(
                "contamination",
                e.target.value
              )
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </label>

        <label>
          Generation Pattern

          <select
            value={form.generation_pattern}
            onChange={(e) =>
              update(
                "generation_pattern",
                e.target.value
              )
            }
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

        </label>

        <button
          className="primary-button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze Waste"}
        </button>

      </form>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {result?.success && (
        <Result result={result} />
      )}

    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}) {

  return (
    <label>

      {label}

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </label>
  );
}

function Result({ result }) {

  return (
    <div className="result">

      <div className="result-header">

        <div>

          <span>AI RECOMMENDATION</span>

          <h1>
            {result.recommendation}
          </h1>

        </div>

        <div className="score">
          {result.score}/100
        </div>

      </div>

      <div className="result-metrics">

        <ResultMetric
          title="Material Suitability"
          value={
            result.metrics.material_suitability
          }
        />

        <ResultMetric
          title="Market Demand"
          value={
            result.metrics.market_demand
          }
        />

        <ResultMetric
          title="Economic Potential"
          value={
            `₹${result.metrics.economic_potential}`
          }
        />

        <ResultMetric
          title="Environmental Benefit"
          value={
            result.metrics.environmental_benefit
          }
        />

      </div>

      <div className="reasoning">

        <h2>Why this pathway?</h2>

        {result.reasoning.map(
          (reason, index) => (
            <p key={index}>
              ✓ {reason}
            </p>
          )
        )}

      </div>

      <div className="pathway-results">

        <h2>Pathway Comparison</h2>

        {Object.entries(result.pathways).map(
          ([name, score]) => (
            <div key={name}>

              <div className="pathway-title">
                <span>
                  {name}
                </span>

                <strong>
                  {score}
                </strong>
              </div>

              <div className="progress">
                <div
                  style={{
                    width: `${score}%`,
                  }}
                />
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

function ResultMetric({ title, value }) {

  return (
    <div className="result-metric">

      <p>{title}</p>

      <h2>{value}</h2>

    </div>
  );
}

export default AnalyzeWaste;