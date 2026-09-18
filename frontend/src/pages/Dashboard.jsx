import React from "react";

function Dashboard() {

  const metrics = [
    ["Valorization Score", "91/100"],
    ["Market Demand", "88%"],
    ["Economic Potential", "₹42K"],
    ["Environmental Benefit", "84%"],
  ];

  const pathways = [
    ["Reuse", 82],
    ["Recycling", 91],
    ["Recovery", 74],
    ["Disposal", 18],
  ];

  return (
    <div>

      <div className="hero">

        <div>
          <span className="badge">
            AI DECISION SUPPORT
          </span>

          <h1>
            Turn Industrial Waste
            <br />
            <strong>Into Value.</strong>
          </h1>

          <p>
            Analyze industrial waste and discover potential
            reuse, recycling and recovery opportunities.
          </p>
        </div>

      </div>

      <div className="metrics">

        {metrics.map(([title, value]) => (
          <div className="metric-card" key={title}>

            <p>{title}</p>

            <h2>{value}</h2>

            <span>Demonstration value</span>

          </div>
        ))}

      </div>

      <div className="dashboard-grid">

        <div className="panel">

          <h2>Valorization Pathways</h2>

          <p className="muted">
            Comparative pathway suitability
          </p>

          {pathways.map(([name, score]) => (
            <div className="pathway" key={name}>

              <div className="pathway-title">
                <span>{name}</span>
                <strong>{score}</strong>
              </div>

              <div className="progress">
                <div
                  style={{ width: `${score}%` }}
                />
              </div>

            </div>
          ))}

        </div>

        <div className="recommendation">

          <span>AI RECOMMENDATION</span>

          <h2>Recycling</h2>

          <div className="confidence">
            91% confidence
          </div>

          <p>
            The demonstration scenario indicates strong
            material compatibility and market potential
            for recycling.
          </p>

          <ul>
            <li>High material suitability</li>
            <li>Strong market compatibility</li>
            <li>Lower disposal dependency</li>
          </ul>

        </div>

      </div>

      <div className="three-cards">

        <InfoCard
          title="Market Matching"
          value="High Demand"
        />

        <InfoCard
          title="Economic Analysis"
          value="₹42K/week"
        />

        <InfoCard
          title="Environmental Impact"
          value="84% Benefit"
        />

      </div>

    </div>
  );
}

function InfoCard({ title, value }) {

  return (
    <div className="info-card">

      <p>{title}</p>

      <h2>{value}</h2>

      <span>
        Analysis module available
      </span>

    </div>
  );
}

export default Dashboard;