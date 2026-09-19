import React, { useState } from "react";

function WhatIfSimulator() {

  const [quantity, setQuantity] = useState(2.5);

  const [contamination, setContamination] =
    useState("Low");

  let score = 91;

  if (quantity > 5) {
    score += 3;
  }

  if (contamination === "Medium") {
    score -= 8;
  }

  if (contamination === "High") {
    score -= 20;
  }

  score = Math.max(
    0,
    Math.min(100, score)
  );

  return (
    <div>

      <div className="page-title">

        <h1>What-If Simulator</h1>

        <p>
          Explore how changing waste conditions can affect
          the valorization result.
        </p>

      </div>

      <div className="simulator">

        <div className="simulator-controls">

          <label>

            Waste Quantity

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
            />

          </label>

          <label>

            Contamination

            <select
              value={contamination}
              onChange={(e) =>
                setContamination(
                  e.target.value
                )
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </label>

        </div>

        <div className="simulation-result">

          <span>SIMULATED SCORE</span>

          <h1>
            {score}/100
          </h1>

          <p>
            Recycling remains the current demonstration
            pathway under these conditions.
          </p>

        </div>

      </div>

    </div>
  );
}

export default WhatIfSimulator;