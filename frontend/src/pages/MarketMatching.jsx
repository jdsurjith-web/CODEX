import React from "react";

function MarketMatching() {

  const markets = [
    ["Construction", 90, "High"],
    ["Cement", 88, "High"],
    ["Road Infrastructure", 82, "High"],
    ["Steel", 85, "High"],
  ];

  return (
    <div>

      <div className="page-title">

        <h1>Market Matching</h1>

        <p>
          Identify potential markets for recovered materials.
        </p>

      </div>

      <div className="market-grid">

        {markets.map(
          ([market, demand, level]) => (

            <div
              className="market-card"
              key={market}
            >

              <p>Potential Market</p>

              <h2>{market}</h2>

              <div className="market-demand">
                <span>Demand</span>

                <strong>
                  {demand}%
                </strong>
              </div>

              <div className="progress">
                <div
                  style={{
                    width: `${demand}%`,
                  }}
                />
              </div>

              <span className="demand-label">
                {level} demand
              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default MarketMatching;