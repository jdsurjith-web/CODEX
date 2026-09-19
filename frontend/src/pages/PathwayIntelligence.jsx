import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Factory,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";


function PathwayIntelligence({
  result,
  onBack,
  onWhatIf,
}) {

  const pathways = [
    {
      name: "Reuse",
      score: result?.pathways?.reuse || 74,
      description:
        "Use the waste directly with minimal processing.",
      feasibility: "Medium",
      icon: <Recycle size={20} />,
    },

    {
      name: "Recycling",
      score: result?.pathways?.recycling || 78,
      description:
        "Recover useful material through processing.",
      feasibility: "High",
      icon: <Recycle size={20} />,
    },

    {
      name: "Recovery",
      score: result?.pathways?.recovery || 69,
      description:
        "Recover material or energy from the waste stream.",
      feasibility: "Medium",
      icon: <Factory size={20} />,
    },

    {
      name: "Disposal",
      score: result?.pathways?.disposal || 18,
      description:
        "Dispose safely when valorization is not feasible.",
      feasibility: "Fallback",
      icon: <TriangleAlert size={20} />,
    },
  ];


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* BACK */}

        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </button>


        {/* HEADER */}

        <div className="max-w-3xl">

          <div className="flex items-center gap-2 text-emerald-400">

            <Sparkles size={15} />

            <span className="text-xs tracking-[0.2em]">
              DECISION INTELLIGENCE
            </span>

          </div>


          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Pathway Intelligence
          </h1>


          <p className="mt-3 text-sm leading-6 text-slate-500">
            WASTEWISE does not simply identify the waste.
            It compares possible end-of-life pathways and
            determines which option provides the strongest
            combination of technical feasibility, market
            compatibility and economic potential.
          </p>

        </div>


        {/* DECISION CARD */}

        <section className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.035] p-6 sm:p-8">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div>

              <p className="text-xs tracking-wider text-slate-500">
                CURRENT RECOMMENDATION
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Construction Application
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                The current waste profile shows strong compatibility
                with construction-related applications.
              </p>

            </div>


            <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 border-emerald-400/20">

              <span className="text-3xl font-bold text-emerald-400">
                {result?.score || 91}
              </span>

              <span className="text-[10px] text-slate-600">
                VALORIZATION
              </span>

            </div>

          </div>

        </section>


        {/* PATHWAY GRID */}

        <section className="mt-6">

          <div className="mb-5">

            <p className="text-xs tracking-wider text-slate-500">
              ALTERNATIVE PATHWAYS
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Compare possible outcomes
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {pathways.map((pathway, index) => (

              <PathwayCard
                key={pathway.name}
                pathway={pathway}
                recommended={index === 1}
              />

            ))}

          </div>

        </section>


        {/* DECISION FACTORS */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">

              <ShieldCheck
                size={19}
                className="text-emerald-400"
              />

            </div>


            <div>

              <h2 className="font-semibold">
                How the decision is formed
              </h2>

              <p className="text-xs text-slate-600">
                Multiple factors contribute to pathway scoring.
              </p>

            </div>

          </div>


          <div className="mt-7 grid gap-5 md:grid-cols-4">

            <Factor
              title="Material"
              value="92%"
              description="Composition compatibility"
            />

            <Factor
              title="Market"
              value="88%"
              description="Nearby demand"
            />

            <Factor
              title="Economics"
              value="90%"
              description="Potential net value"
            />

            <Factor
              title="Logistics"
              value="86%"
              description="Transport feasibility"
            />

          </div>

        </section>


        {/* REASONING */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <div className="flex items-center gap-3">

              <Leaf
                size={19}
                className="text-emerald-400"
              />

              <h2 className="font-semibold">
                Environmental consideration
              </h2>

            </div>


            <div className="mt-5 space-y-3">

              <Reason
                text="Potential waste diversion from disposal"
              />

              <Reason
                text="Potential recovery of usable material"
              />

              <Reason
                text="Potential reduction in virgin material demand"
              />

            </div>

          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={19}
                className="text-emerald-400"
              />

              <h2 className="font-semibold">
                Economic consideration
              </h2>

            </div>


            <div className="mt-5 space-y-3">

              <Reason
                text="Nearby market identified"
              />

              <Reason
                text="Processing requirement considered"
              />

              <Reason
                text="Transportation cost considered"
              />

            </div>

          </div>

        </section>


        {/* WHAT IF */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

              <div>

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={17}
                    className="text-emerald-400"
                  />

                  <span className="text-xs tracking-wider text-emerald-400">
                    WHAT-IF SIMULATOR
                  </span>

                </div>


                <h2 className="mt-2 text-xl font-semibold">
                  What happens if conditions change?
                </h2>


                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Test changes in contamination, demand,
                  transportation cost or processing cost and
                  observe how the recommended pathway changes.
                </p>

              </div>


              <button
                onClick={onWhatIf}
                className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300"
              >
                Open Simulator
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </section>


        <p className="mt-8 text-center text-xs text-slate-700">
          Prototype decision model • Final scoring will be supplied
          by the backend intelligence engine.
        </p>

      </main>

    </div>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function PathwayCard({
  pathway,
  recommended,
}) {

  return (
    <div
      className={`rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
        recommended
          ? "border-emerald-400/20 bg-emerald-400/[0.035]"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
            {pathway.icon}
          </div>

          <div>

            <h3 className="font-semibold">
              {pathway.name}
            </h3>

            <p className="mt-1 text-xs text-slate-600">
              {pathway.feasibility}
            </p>

          </div>

        </div>


        {recommended && (

          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-400">
            RECOMMENDED
          </span>

        )}

      </div>


      <p className="mt-5 text-sm leading-6 text-slate-500">
        {pathway.description}
      </p>


      <div className="mt-6 flex items-end justify-between">

        <div>

          <p className="text-xs text-slate-600">
            PATHWAY SCORE
          </p>

          <p className="mt-1 text-3xl font-bold text-emerald-400">
            {pathway.score}
          </p>

        </div>


        <span className="text-xs text-slate-600">
          / 100
        </span>

      </div>


      <div className="mt-4 h-2 rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
          style={{
            width: `${pathway.score}%`,
          }}
        />

      </div>

    </div>
  );
}


function Factor({
  title,
  value,
  description,
}) {

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-emerald-400">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>

    </div>
  );
}


function Reason({
  text,
}) {

  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={16}
        className="shrink-0 text-emerald-400"
      />

      <span className="text-sm text-slate-400">
        {text}
      </span>

    </div>
  );
}


export default PathwayIntelligence;