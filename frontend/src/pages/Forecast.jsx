import React from "react";

function Forecast() {

  const data = [
    ["Week 1", 2.5],
    ["Week 2", 3.1],
    ["Week 3", 2.8],
    ["Week 4", 3.6],
    ["Week 5", 3.4],
    ["Week 6", 4.0],
  ];

  return (
    <div>

      <div className="page-title">

        <h1>Generation Forecast</h1>

        <p>
          Monitor and estimate future waste generation patterns.
        </p>

      </div>

      <div className="forecast-card">

        <h2>Waste Generation Trend</h2>

        <p className="muted">
          Demonstration forecast
        </p>

        <div className="chart">

          {data.map(([week, value]) => (

            <div className="bar-container" key={week}>

              <div
                className="bar"
                style={{
                  height: `${value * 45}px`,
                }}
              />

              <span>{week}</span>

              <small>
                {value} t
              </small>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Forecast;