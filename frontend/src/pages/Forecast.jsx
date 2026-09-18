import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  TrendingUp,
  Factory,
  Recycle,
  Activity,
} from "lucide-react";

const historicalData = [
  { month: "Apr", generated: 37, diverted: 25 },
  { month: "May", generated: 39, diverted: 28 },
  { month: "Jun", generated: 42, diverted: 30 },
  { month: "Jul", generated: 45, diverted: 33 },
  { month: "Aug", generated: 40, diverted: 29 },
  { month: "Sep", generated: 43, diverted: 31 },
];

const monthNames = [
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

export default function Forecast({ onBack }) {
  const [forecastMonths, setForecastMonths] = useState(3);

  const forecast = useMemo(() => {
    const n = historicalData.length;

    const xMean = (n - 1) / 2;
    const yMean =
      historicalData.reduce((sum, item) => sum + item.generated, 0) / n;

    let numerator = 0;
    let denominator = 0;

    historicalData.forEach((item, index) => {
      numerator += (index - xMean) * (item.generated - yMean);
      denominator += Math.pow(index - xMean, 2);
    });

    const slope = denominator === 0 ? 0 : numerator / denominator;
    const intercept = yMean - slope * xMean;

    return Array.from({ length: forecastMonths }, (_, index) => {
      const x = n + index;
      const predicted = Math.max(0, Math.round(intercept + slope * x));

      return {
        month: monthNames[index],
        generated: predicted,
      };
    });
  }, [forecastMonths]);

  const averageGenerated = Math.round(
    historicalData.reduce((sum, item) => sum + item.generated, 0) /
      historicalData.length
  );

  const averageDiverted = Math.round(
    historicalData.reduce((sum, item) => sum + item.diverted, 0) /
      historicalData.length
  );

  const diversionRate = Math.round(
    (averageDiverted / averageGenerated) * 100
  );

  const nextMonth = forecast[0]?.generated || 0;

  return (
    <div className="min-h-screen bg-[#07100d] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07100d]/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 transition hover:bg-white/10"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
                WASTEWISE AI
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Waste Generation Forecast
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 md:flex">
            <Activity size={15} />
            Forecast Engine Active
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Intro */}
        <section>
          <p className="text-sm text-slate-400">
            Predict future industrial waste generation to support capacity,
            logistics, processing and market planning.
          </p>
        </section>

        {/* KPI Cards */}
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard
            icon={<Factory size={19} />}
            label="Avg. Monthly Waste"
            value={`${averageGenerated} t`}
            detail="Historical average"
          />

          <StatCard
            icon={<Recycle size={19} />}
            label="Avg. Diverted"
            value={`${averageDiverted} t`}
            detail="Potentially valorized"
          />

          <StatCard
            icon={<BarChart3 size={19} />}
            label="Diversion Rate"
            value={`${diversionRate}%`}
            detail="Historical estimate"
          />

          <StatCard
            icon={<TrendingUp size={19} />}
            label="Next Month"
            value={`${nextMonth} t`}
            detail="Prototype prediction"
          />
        </section>

        {/* Main chart */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold">
                Historical Waste Generation
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Monthly industrial waste stream trend
              </p>
            </div>

            <div className="flex gap-5 text-xs text-slate-400">
              <Legend label="Generated" />
              <Legend label="Diverted" />
            </div>
          </div>

          <div className="relative h-72">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[50, 40, 30, 20, 10, 0].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 text-right text-[10px] text-slate-600">
                    {value}
                  </span>

                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-10 right-2 top-0">
              <div className="flex h-full items-end justify-between gap-3">
                {historicalData.map((item) => (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 items-end justify-center gap-2"
                  >
                    <div className="relative flex h-full w-5 items-end">
                      <div
                        className="w-full rounded-t-md bg-emerald-400/70 transition-all duration-500 hover:bg-emerald-300"
                        style={{
                          height: `${(item.generated / 50) * 100}%`,
                        }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-emerald-300">
                          {item.generated}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex h-full w-5 items-end">
                      <div
                        className="w-full rounded-t-md bg-sky-400/60 transition-all duration-500 hover:bg-sky-300"
                        style={{
                          height: `${(item.diverted / 50) * 100}%`,
                        }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-sky-300">
                          {item.diverted}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between px-1 text-xs text-slate-500">
                {historicalData.map((item) => (
                  <span key={item.month}>{item.month}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Forecast section */}
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.035] p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={18}
                    className="text-emerald-400"
                  />

                  <h2 className="font-semibold">
                    Future Waste Projection
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                  Estimate future generation from historical trend.
                </p>
              </div>

              <div className="flex rounded-xl border border-white/10 bg-black/20 p-1">
                {[3, 4, 6].map((months) => (
                  <button
                    key={months}
                    onClick={() => setForecastMonths(months)}
                    className={`rounded-lg px-3 py-2 text-xs transition ${
                      forecastMonths === months
                        ? "bg-emerald-400 text-black"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {months} Months
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {forecast.map((item, index) => (
                <div
                  key={`${item.month}-${index}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-xs text-slate-500">
                    {item.month}
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    {item.generated}
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      t
                    </span>
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{
                        width: `${Math.min(
                          (item.generated / 60) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              Planning Insight
            </p>

            <h3 className="mt-3 text-lg font-semibold">
              Prepare processing capacity
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              The prototype trend indicates continued waste generation.
              WASTEWISE can use this forecast to support processing,
              transportation and potential market planning.
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-slate-500">
                Forecast interpretation
              </p>

              <p className="mt-2 text-sm text-slate-300">
                Historical generation is being used as a baseline for
                future planning.
              </p>
            </div>
          </div>
        </section>

        {/* Prototype note */}
        <section className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] px-5 py-4">
          <p className="text-xs leading-5 text-amber-200/80">
            <strong className="text-amber-300">
              Prototype note:
            </strong>{" "}
            These values are demonstration data. The final WASTEWISE
            system can replace this trend calculation with an ML
            forecasting model trained on historical industrial waste
            data.
          </p>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, detail }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20">
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-2.5 text-emerald-400">
          {icon}
        </div>

        <p className="text-sm text-slate-400">{label}</p>
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function Legend({ label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400/70" />
      {label}
    </div>
  );
}