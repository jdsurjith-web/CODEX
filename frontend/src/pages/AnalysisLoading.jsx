import { useEffect, useState } from "react";

import {
  Beaker,
  CheckCircle2,
  Leaf,
  Loader2,
  MapPin,
  Recycle,
  Sparkles,
  TrendingUp,
} from "lucide-react";


function AnalysisLoading({
  wasteData,
  onComplete,
}) {

  const [progress, setProgress] = useState(0);


  const steps = [
    {
      title: "Analyzing composition",
      description: "Evaluating material characteristics",
      icon: <Beaker size={18} />,
    },
    {
      title: "Evaluating pathways",
      description: "Comparing reuse, recycling and recovery",
      icon: <Recycle size={18} />,
    },
    {
      title: "Checking market demand",
      description: "Matching waste with potential users",
      icon: <TrendingUp size={18} />,
    },
    {
      title: "Evaluating logistics",
      description: "Assessing transportation feasibility",
      icon: <MapPin size={18} />,
    },
    {
      title: "Calculating impact",
      description: "Estimating environmental potential",
      icon: <Leaf size={18} />,
    },
  ];


  useEffect(() => {

    const timer = setInterval(() => {

      setProgress((previous) => {

        if (previous >= 100) {
          clearInterval(timer);
          return 100;
        }

        return previous + 2;

      });

    }, 70);


    return () => clearInterval(timer);

  }, []);


  useEffect(() => {

    if (progress >= 100) {

      const timer = setTimeout(() => {
        onComplete();
      }, 800);

      return () => clearTimeout(timer);

    }

  }, [progress, onComplete]);


  const currentStep = Math.min(
    Math.floor(progress / 20),
    steps.length - 1
  );


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-5 py-10">

        {/* AI ICON */}

        <div className="relative mb-8">

          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/10" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10">

            <Sparkles
              size={32}
              className="text-emerald-400"
            />

          </div>

        </div>


        {/* HEADER */}

        <div className="text-center">

          <p className="text-xs tracking-[0.25em] text-emerald-400">
            WASTEWISE INTELLIGENCE ENGINE
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Analyzing Waste Stream
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500">
            Evaluating material suitability, market demand,
            economics, logistics and environmental potential.
          </p>

        </div>


        {/* WASTE */}

        <div className="mt-8 w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

          <div className="flex flex-col justify-between gap-3 sm:flex-row">

            <div>

              <p className="text-xs text-slate-600">
                ANALYZING
              </p>

              <p className="mt-1 text-lg font-semibold">
                {wasteData?.wasteType || "Waste Stream"}
              </p>

            </div>


            <div className="sm:text-right">

              <p className="text-xs text-slate-600">
                INDUSTRY
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {wasteData?.industry || "Industrial"}
              </p>

            </div>

          </div>

        </div>


        {/* PROGRESS */}

        <div className="mt-6 w-full">

          <div className="mb-2 flex justify-between">

            <span className="text-xs text-slate-500">
              AI analysis progress
            </span>

            <span className="text-xs font-medium text-emerald-400">
              {progress}%
            </span>

          </div>


          <div className="h-2 overflow-hidden rounded-full bg-slate-900">

            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-100"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* STEPS */}

        <div className="mt-8 w-full space-y-3">

          {steps.map((step, index) => {

            const completed = index < currentStep;
            const active = index === currentStep;

            return (

              <div
                key={step.title}
                className={`flex items-center gap-4 rounded-xl border p-4 transition duration-500 ${
                  active
                    ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                    : "border-slate-900"
                }`}
              >

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    completed
                      ? "bg-emerald-400/10 text-emerald-400"
                      : active
                        ? "bg-slate-800 text-emerald-400"
                        : "bg-slate-900 text-slate-700"
                  }`}
                >

                  {completed ? (

                    <CheckCircle2 size={18} />

                  ) : active ? (

                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                  ) : (

                    step.icon

                  )}

                </div>


                <div>

                  <p
                    className={`text-sm font-medium ${
                      active || completed
                        ? "text-slate-200"
                        : "text-slate-700"
                    }`}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {step.description}
                  </p>

                </div>

              </div>

            );

          })}

        </div>


        <p className="mt-8 text-center text-xs text-slate-700">
          Prototype analysis • Backend intelligence engine
          will replace demo calculations
        </p>

      </main>

    </div>
  );
}


export default AnalysisLoading;