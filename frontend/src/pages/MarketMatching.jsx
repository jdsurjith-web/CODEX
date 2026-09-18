import {
  ArrowLeft,
  CheckCircle2,
  Factory,
  MapPin,
  Package,
  Sparkles,
  Truck,
  TrendingUp,
} from "lucide-react";


function MarketMatching({
  result,
  wasteData,
  onBack,
}) {

  const markets = [
    {
      name: "Construction Materials Company",
      type: "Construction",
      compatibility: 92,
      demand: "High",
      distance: 32,
      quantity: 8,
      status: "Strong Match",
    },
    {
      name: "Eco Aggregate Industries",
      type: "Aggregate Manufacturing",
      compatibility: 86,
      demand: "High",
      distance: 48,
      quantity: 12,
      status: "Compatible",
    },
    {
      name: "Green Infrastructure Works",
      type: "Infrastructure",
      compatibility: 79,
      demand: "Medium",
      distance: 61,
      quantity: 6,
      status: "Potential",
    },
  ];


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">


        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>


        <div>

          <div className="flex items-center gap-2">

            <Sparkles
              size={15}
              className="text-emerald-400"
            />

            <span className="text-xs tracking-[0.2em] text-emerald-400">
              MARKET INTELLIGENCE
            </span>

          </div>


          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Market Matching
          </h1>


          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">

            Match the analyzed waste stream with potential
            industrial users based on material compatibility,
            demand, quantity requirements and logistics.

          </p>

        </div>


        {/* WASTE SUMMARY */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <div className="grid gap-5 md:grid-cols-4">

            <Summary
              icon={<Factory size={17} />}
              label="Waste"
              value={
                wasteData?.wasteType ||
                "Foundry Sand"
              }
            />

            <Summary
              icon={<Package size={17} />}
              label="Quantity"
              value={`${wasteData?.quantity || "2.5"} t/week`}
            />

            <Summary
              icon={<TrendingUp size={17} />}
              label="Market Demand"
              value="High"
            />

            <Summary
              icon={<Truck size={17} />}
              label="Logistics"
              value="Feasible"
            />

          </div>

        </section>


        {/* MARKET NETWORK */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <p className="text-xs tracking-wider text-slate-500">
            POTENTIAL USERS
          </p>


          <h2 className="mt-2 text-xl font-semibold">
            Waste-to-market network
          </h2>


          <div className="mt-6 space-y-4">

            {markets.map((market, index) => (

              <MarketCard
                key={market.name}
                market={market}
                recommended={index === 0}
              />

            ))}

          </div>

        </section>


        {/* MATCH LOGIC */}

        <section className="mt-6 grid gap-6 md:grid-cols-3">

          <LogicCard
            title="Material"
            value="92%"
            text="Composition compatibility"
          />

          <LogicCard
            title="Demand"
            value="High"
            text="Current market requirement"
          />

          <LogicCard
            title="Logistics"
            value="32 km"
            text="Estimated transport distance"
          />

        </section>


        <section className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/[0.025] p-5">

          <p className="text-xs font-medium text-amber-300">
            PROTOTYPE DATA
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">

            Market organizations and distances shown here are
            demonstration data. In the integrated system,
            verified market data can be connected to the backend.

          </p>

        </section>

      </main>

    </div>

  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function Summary({
  icon,
  label,
  value,
}) {

  return (

    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">

        {icon}

      </div>

      <div>

        <p className="text-[10px] text-slate-600">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>

      </div>

    </div>

  );

}


function MarketCard({
  market,
  recommended,
}) {

  return (

    <div
      className={`rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
        recommended
          ? "border-emerald-400/20 bg-emerald-400/[0.03]"
          : "border-slate-800 bg-slate-950/40"
      }`}
    >

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">


        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800">

            <Factory
              size={19}
              className="text-emerald-400"
            />

          </div>


          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-semibold">
                {market.name}
              </h3>


              {recommended && (

                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] text-emerald-400">
                  RECOMMENDED
                </span>

              )}

            </div>


            <p className="mt-1 text-xs text-slate-600">
              {market.type}
            </p>

          </div>

        </div>


        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">


          <MarketMetric
            label="Compatibility"
            value={`${market.compatibility}%`}
          />


          <MarketMetric
            label="Demand"
            value={market.demand}
          />


          <MarketMetric
            label="Distance"
            value={`${market.distance} km`}
          />


          <MarketMetric
            label="Required"
            value={`${market.quantity} t`}
          />

        </div>


        <div className="flex items-center gap-2 text-xs text-emerald-400">

          <CheckCircle2 size={15} />

          {market.status}

        </div>

      </div>


      <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">

        <MapPin size={13} />

        Potential nearby market

      </div>

    </div>

  );

}


function MarketMetric({
  label,
  value,
}) {

  return (

    <div>

      <p className="text-[9px] text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-300">
        {value}
      </p>

    </div>

  );

}


function LogicCard({
  title,
  value,
  text,
}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-emerald-400">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-600">
        {text}
      </p>

    </div>

  );

}


export default MarketMatching;