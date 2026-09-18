import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Factory,
  Info,
  RotateCcw,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";


function WhatIfSimulator({
  result,
  wasteData,
  onBack,
}) {

  /* =====================================================
     USER-CONTROLLED VARIABLES
  ===================================================== */

  const [quantity, setQuantity] = useState(
    Number(wasteData?.quantity) || 2.5
  );

  const [contamination, setContamination] =
    useState(
      contaminationToNumber(
        wasteData?.contamination
      )
    );

  const [marketDemand, setMarketDemand] =
    useState(88);

  const [transportCost, setTransportCost] =
    useState(2000);

  const [processingCost, setProcessingCost] =
    useState(5000);


  /* =====================================================
     RESET
  ===================================================== */

  const reset = () => {

    setQuantity(
      Number(wasteData?.quantity) || 2.5
    );

    setContamination(
      contaminationToNumber(
        wasteData?.contamination
      )
    );

    setMarketDemand(88);

    setTransportCost(2000);

    setProcessingCost(5000);

  };


  /* =====================================================
     DYNAMIC DECISION ENGINE
     
     Prototype calculation.
     Person 2's backend will eventually replace this.
  ===================================================== */

  const analysis = useMemo(() => {

    const contaminationPenalty =
      contamination * 0.35;

    const transportPenalty =
      Math.min(transportCost / 1000, 30);

    const processingPenalty =
      Math.min(processingCost / 1000, 30);


    let reuse =
      74
      - contaminationPenalty
      + ((quantity - 2.5) * 1.5)
      - transportPenalty * 0.2;


    let recycling =
      78
      - contaminationPenalty * 0.65
      + (marketDemand - 88) * 0.20
      - processingPenalty * 0.15;


    let recovery =
      69
      - contaminationPenalty * 0.45
      + (quantity - 2.5) * 1.2
      + (marketDemand - 88) * 0.12;


    let disposal =
      18
      + contamination * 0.45
      + transportPenalty * 0.35
      + processingPenalty * 0.20
      - (marketDemand - 88) * 0.10;


    reuse = clamp(reuse, 5, 100);
    recycling = clamp(recycling, 5, 100);
    recovery = clamp(recovery, 5, 100);
    disposal = clamp(disposal, 5, 100);


    const pathways = {
      reuse: Math.round(reuse),
      recycling: Math.round(recycling),
      recovery: Math.round(recovery),
      disposal: Math.round(disposal),
    };


    const valorizationScores = [
      pathways.reuse,
      pathways.recycling,
      pathways.recovery,
    ];


    const bestValorization =
      Math.max(...valorizationScores);


    const recommendedPathway =
      bestValorization === pathways.reuse
        ? "Reuse"
        : bestValorization === pathways.recycling
          ? "Recycling"
          : "Recovery";


    const finalScore =
      Math.round(
        bestValorization * 0.7 +
        marketDemand * 0.2 +
        (100 - contamination) * 0.1
      );


    return {
      pathways,
      recommendedPathway,
      finalScore: clamp(
        finalScore,
        5,
        100
      ),
    };

  }, [
    quantity,
    contamination,
    marketDemand,
    transportCost,
    processingCost,
  ]);


  /* =====================================================
     CHANGE DETECTION
  ===================================================== */

  const originalScore =
    result?.score || 91;

  const scoreDifference =
    analysis.finalScore - originalScore;


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">


        {/* BACK */}

        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
        >

          <ArrowLeft size={16} />

          Back to Pathway Intelligence

        </button>


        {/* HEADER */}

        <div className="max-w-3xl">

          <div className="flex items-center gap-2">

            <Sparkles
              size={16}
              className="text-emerald-400"
            />

            <span className="text-xs tracking-[0.2em] text-emerald-400">
              SCENARIO SIMULATION
            </span>

          </div>


          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            What-If Simulator
          </h1>


          <p className="mt-3 text-sm leading-6 text-slate-500">

            Explore how changes in waste characteristics,
            market conditions and operational costs can affect
            the recommended valorization pathway.

          </p>

        </div>


        {/* CURRENT WASTE */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">

                <Factory
                  size={19}
                  className="text-emerald-400"
                />

              </div>


              <div>

                <p className="text-xs text-slate-600">
                  CURRENT WASTE STREAM
                </p>

                <p className="mt-1 font-semibold">
                  {wasteData?.wasteType || "Industrial Waste"}
                </p>

              </div>

            </div>


            <div className="flex gap-6">

              <div>

                <p className="text-[10px] text-slate-600">
                  INDUSTRY
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {wasteData?.industry || "Industrial"}
                </p>

              </div>


              <div>

                <p className="text-[10px] text-slate-600">
                  BASE SCORE
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-400">
                  {originalScore}/100
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* MAIN GRID */}

        <section className="mt-6 grid gap-6 lg:grid-cols-5">


          {/* CONTROLS */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-3">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs tracking-wider text-slate-500">
                  SCENARIO VARIABLES
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Modify conditions
                </h2>

              </div>


              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-500 transition hover:text-white"
              >

                <RotateCcw size={14} />

                Reset

              </button>

            </div>


            <div className="mt-8 space-y-8">


              {/* QUANTITY */}

              <SliderControl
                label="Waste Quantity"
                value={quantity}
                min={0.5}
                max={20}
                step={0.5}
                suffix=" tonnes/week"
                description="Higher volume may improve recovery economics."
                onChange={setQuantity}
              />


              {/* CONTAMINATION */}

              <SliderControl
                label="Contamination Level"
                value={contamination}
                min={0}
                max={100}
                step={5}
                suffix="%"
                description="Higher contamination reduces material suitability."
                onChange={setContamination}
              />


              {/* DEMAND */}

              <SliderControl
                label="Market Demand"
                value={marketDemand}
                min={0}
                max={100}
                step={5}
                suffix="%"
                description="Represents demand strength for the recovered material."
                onChange={setMarketDemand}
              />


              {/* TRANSPORT */}

              <SliderControl
                label="Transport Cost"
                value={transportCost}
                min={500}
                max={15000}
                step={500}
                suffix=" ₹"
                description="Higher transport cost reduces economic feasibility."
                onChange={setTransportCost}
              />


              {/* PROCESSING */}

              <SliderControl
                label="Processing Cost"
                value={processingCost}
                min={500}
                max={20000}
                step={500}
                suffix=" ₹"
                description="Higher processing cost reduces valorization potential."
                onChange={setProcessingCost}
              />

            </div>

          </div>


          {/* LIVE RESULT */}

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.035] p-6 lg:col-span-2">

            <p className="text-xs tracking-wider text-slate-500">
              LIVE SIMULATION
            </p>


            <h2 className="mt-2 text-xl font-semibold">
              Updated Decision
            </h2>


            {/* SCORE */}

            <div className="mt-7 flex items-center justify-center">

              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-[10px] border-emerald-400/20">

                <span className="text-4xl font-bold text-emerald-400">
                  {analysis.finalScore}
                </span>

                <span className="text-[10px] text-slate-600">
                  VALORIZATION
                </span>

              </div>

            </div>


            {/* DIFFERENCE */}

            <div className="mt-5 flex items-center justify-center gap-2">

              {scoreDifference >= 0 ? (

                <TrendingUp
                  size={16}
                  className="text-emerald-400"
                />

              ) : (

                <TrendingDown
                  size={16}
                  className="text-red-400"
                />

              )}


              <span
                className={`text-sm ${
                  scoreDifference >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >

                {scoreDifference >= 0
                  ? "+"
                  : ""}

                {scoreDifference}

                {" "}points from base scenario

              </span>

            </div>


            {/* RECOMMENDATION */}

            <div className="mt-7 rounded-xl border border-slate-800 bg-slate-950/60 p-5">

              <p className="text-xs text-slate-600">
                CURRENT RECOMMENDATION
              </p>


              <h3 className="mt-2 text-xl font-bold">
                {analysis.recommendedPathway}
              </h3>


              <p className="mt-2 text-xs leading-5 text-slate-500">

                Based on the modified scenario conditions.

              </p>

            </div>


            {/* PATHWAYS */}

            <div className="mt-6 space-y-4">

              <MiniScore
                label="Reuse"
                score={analysis.pathways.reuse}
                recommended={
                  analysis.recommendedPathway === "Reuse"
                }
              />


              <MiniScore
                label="Recycling"
                score={analysis.pathways.recycling}
                recommended={
                  analysis.recommendedPathway === "Recycling"
                }
              />


              <MiniScore
                label="Recovery"
                score={analysis.pathways.recovery}
                recommended={
                  analysis.recommendedPathway === "Recovery"
                }
              />


              <MiniScore
                label="Disposal"
                score={analysis.pathways.disposal}
                muted
              />

            </div>

          </div>

        </section>


        {/* INSIGHT */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">

              <Info
                size={18}
                className="text-emerald-400"
              />

            </div>


            <div>

              <h3 className="font-semibold">
                Scenario Insight
              </h3>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                {getInsight(
                  contamination,
                  marketDemand,
                  transportCost,
                  processingCost,
                  analysis.recommendedPathway
                )}

              </p>

            </div>

          </div>

        </section>


        {/* DEMO EXPLANATION */}

        <section className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/[0.025] p-5">

          <p className="text-xs font-medium text-amber-300">
            PROTOTYPE NOTE
          </p>


          <p className="mt-2 text-xs leading-5 text-slate-500">

            This interactive simulation currently uses a
            frontend prototype scoring model. During final
            integration, these calculations will be replaced
            by the WASTEWISE backend decision engine.

          </p>

        </section>


        {/* FOOTER */}

        <div className="mt-8 flex justify-between">

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-slate-800 px-5 py-3 text-sm text-slate-500 transition hover:text-white"
          >

            <ArrowLeft size={16} />

            Pathways

          </button>


          <div className="flex items-center gap-2 text-xs text-slate-700">

            <Truck size={14} />

            Dynamic scenario analysis

          </div>

        </div>

      </main>

    </div>

  );
}


/* =====================================================
   SLIDER
===================================================== */

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  suffix,
  description,
  onChange,
}) {

  const percentage =
    ((value - min) / (max - min)) * 100;


  return (

    <div>

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-sm font-medium text-slate-300">
            {label}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            {description}
          </p>

        </div>


        <div className="shrink-0 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-emerald-400">

          {value.toLocaleString()}
          {suffix}

        </div>

      </div>


      <div className="mt-4">

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value)
            )
          }
          className="w-full cursor-pointer accent-emerald-400"
          style={{
            background: `linear-gradient(
              to right,
              #34d399 0%,
              #34d399 ${percentage}%,
              #1e293b ${percentage}%,
              #1e293b 100%
            )`,
          }}
        />

      </div>


      <div className="mt-1 flex justify-between text-[10px] text-slate-700">

        <span>
          {min}
        </span>

        <span>
          {max}
        </span>

      </div>

    </div>

  );
}


/* =====================================================
   MINI SCORE
===================================================== */

function MiniScore({
  label,
  score,
  recommended = false,
  muted = false,
}) {

  return (

    <div>

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span className="text-xs text-slate-400">
            {label}
          </span>


          {recommended && (

            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-400">
              ACTIVE
            </span>

          )}

        </div>


        <span
          className={`text-xs font-semibold ${
            muted
              ? "text-slate-600"
              : "text-slate-300"
          }`}
        >

          {score}

        </span>

      </div>


      <div className="h-2 rounded-full bg-slate-800">

        <div
          className={`h-full rounded-full transition-all duration-300 ${
            muted
              ? "bg-slate-700"
              : "bg-emerald-400"
          }`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>

  );
}


/* =====================================================
   HELPERS
===================================================== */

function clamp(
  value,
  min,
  max
) {

  return Math.min(
    Math.max(value, min),
    max
  );

}


function contaminationToNumber(
  contamination
) {

  switch (contamination) {

    case "Low":
      return 10;

    case "Medium":
      return 40;

    case "High":
      return 75;

    case "Unknown":
      return 50;

    default:
      return 10;

  }

}


function getInsight(
  contamination,
  marketDemand,
  transportCost,
  processingCost,
  pathway
) {

  if (contamination >= 70) {

    return `High contamination is significantly reducing material suitability. ${pathway} currently remains the strongest calculated option, but additional preprocessing may be required.`;

  }


  if (marketDemand <= 30) {

    return `Weak market demand is reducing the value of valorization. The system is favoring ${pathway} under the current scenario.`;

  }


  if (transportCost >= 10000) {

    return `High transportation cost is reducing the economic feasibility of distant markets. A closer market or local reuse option could improve the scenario.`;

  }


  if (processingCost >= 15000) {

    return `High processing cost is reducing the benefit of material recovery. Lower-cost processing or direct reuse could improve the outcome.`;

  }


  return `Under the current scenario, ${pathway} provides the strongest calculated combination of material suitability, market conditions and operational feasibility.`;

}


export default WhatIfSimulator;