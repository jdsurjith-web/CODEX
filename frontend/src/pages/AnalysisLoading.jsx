import React from "react";

function PathwayIntelligence() {

  const pathways = [
    {
      name: "Reuse",
      score: 82,
      description:
        "Direct utilization with minimal processing.",
    },
    {
      name: "Recycling",
      score: 91,
      description:
        "Recover material and process it for another application.",
    },
    {
      name: "Recovery",
      score: 74,
      description:
        "Recover useful materials or resources.",
    },
    {
      name: "Disposal",
      score: 18,
      description:
        "Fallback option when valorization is not feasible.",
    },
  ];

  return (
    <div>

      <div className="page-title">
        <h1>Pathway Intelligence</h1>
        <p>
          Compare possible routes for industrial waste.
        </p>
      </div>

      <div className="pathway-list">

        {pathways.map((item) => (

          <div className="large-pathway" key={item.name}>

            <div>

              <h2>{item.name}</h2>

              <p>{item.description}</p>

            </div>

            <strong>
              {item.score}/100
            </strong>

            <div className="progress">
              <div
                style={{
                  width: `${item.score}%`,
                }}
              />
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PathwayIntelligence;