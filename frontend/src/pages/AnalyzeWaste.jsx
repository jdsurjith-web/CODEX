import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Factory,
  MapPin,
  Recycle,
  Sparkles,
} from "lucide-react";


function AnalyzeWaste({
  initialData,
  onBack,
  onAnalyze,
}) {

  const [data, setData] = useState(
    initialData || {
      industry: "",
      wasteType: "",
      quantity: "",
      generationPattern: "Weekly",
      primaryMaterial: "",
      moisture: "",
      contamination: "Low",
      location: "",
      transport: "",
    }
  );

  const [error, setError] = useState("");


  const update = (field, value) => {

    setData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };


  const submit = () => {

    if (!data.industry.trim()) {
      setError("Please enter the industry.");
      return;
    }

    if (!data.wasteType.trim()) {
      setError("Please enter the waste type.");
      return;
    }

    if (!data.quantity.trim()) {
      setError("Please enter the waste quantity.");
      return;
    }

    const quantity = Number(data.quantity);

    if (Number.isNaN(quantity) || quantity <= 0) {
      setError(
        "Quantity must be a number greater than 0."
      );
      return;
    }

    if (!data.primaryMaterial.trim()) {
      setError("Please enter the primary material.");
      return;
    }

    if (!data.moisture.trim()) {
      setError("Please enter the moisture percentage.");
      return;
    }

    const moisture = Number(data.moisture);

    if (
      Number.isNaN(moisture) ||
      moisture < 0 ||
      moisture > 100
    ) {
      setError(
        "Moisture must be between 0 and 100%."
      );
      return;
    }

    if (!data.location.trim()) {
      setError(
        "Please enter the industrial location."
      );
      return;
    }

    if (!data.transport.trim()) {
      setError(
        "Please enter the available transport."
      );
      return;
    }

    onAnalyze(data);
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">

        <button
          onClick={onBack}
          className="mb-7 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>


        {/* HEADER */}

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">

            <Recycle
              size={21}
              className="text-emerald-400"
            />

          </div>


          <div>

            <p className="text-xs tracking-[0.2em] text-emerald-400">
              WASTE ANALYSIS
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Analyze Waste Stream
            </h1>

          </div>

        </div>


        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
          Provide the characteristics of your industrial waste.
          WASTEWISE will evaluate potential reuse, recycling,
          recovery and disposal pathways.
        </p>


        {/* STEPS */}

        <div className="my-8 flex items-center gap-3">

          <Step
            number="01"
            label="Waste Details"
            active
          />

          <div className="h-px flex-1 bg-slate-800" />

          <Step
            number="02"
            label="AI Analysis"
          />

          <div className="h-px flex-1 bg-slate-800" />

          <Step
            number="03"
            label="Recommendation"
          />

        </div>


        {/* WASTE DETAILS */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <SectionHeader
            icon={<Factory size={18} />}
            title="Waste Stream Information"
            description="Identify the industrial waste being analyzed."
          />


          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <Input
              label="Industry"
              placeholder="e.g. Foundry"
              value={data.industry}
              onChange={(value) =>
                update("industry", value)
              }
            />

            <Input
              label="Waste Type"
              placeholder="e.g. Foundry Sand"
              value={data.wasteType}
              onChange={(value) =>
                update("wasteType", value)
              }
            />

            <Input
              label="Quantity"
              placeholder="e.g. 2.5"
              suffix="tonnes / week"
              value={data.quantity}
              onChange={(value) =>
                update("quantity", value)
              }
            />

            <Select
              label="Generation Pattern"
              value={data.generationPattern}
              options={[
                "Daily",
                "Weekly",
                "Monthly",
                "Irregular",
              ]}
              onChange={(value) =>
                update(
                  "generationPattern",
                  value
                )
              }
            />

          </div>

        </section>


        {/* COMPOSITION */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <SectionHeader
            icon={<Beaker size={18} />}
            title="Waste Composition"
            description="Enter known physical or chemical characteristics."
          />


          <div className="mt-6 grid gap-5 md:grid-cols-3">

            <Input
              label="Primary Material"
              placeholder="e.g. Silica"
              value={data.primaryMaterial}
              onChange={(value) =>
                update(
                  "primaryMaterial",
                  value
                )
              }
            />

            <Input
              label="Moisture"
              placeholder="e.g. 4"
              suffix="%"
              value={data.moisture}
              onChange={(value) =>
                update("moisture", value)
              }
            />

            <Select
              label="Contamination Level"
              value={data.contamination}
              options={[
                "Low",
                "Medium",
                "High",
                "Unknown",
              ]}
              onChange={(value) =>
                update(
                  "contamination",
                  value
                )
              }
            />

          </div>

        </section>


        {/* LOCATION */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <SectionHeader
            icon={<MapPin size={18} />}
            title="Location & Logistics"
            description="Used to evaluate transport feasibility and market proximity."
          />


          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <Input
              label="Industrial Location"
              placeholder="e.g. Coimbatore"
              value={data.location}
              onChange={(value) =>
                update(
                  "location",
                  value
                )
              }
            />

            <Input
              label="Available Transport"
              placeholder="e.g. Truck"
              value={data.transport}
              onChange={(value) =>
                update(
                  "transport",
                  value
                )
              }
            />

          </div>

        </section>


        {/* AI PREVIEW */}

        <section className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">

              <Sparkles
                size={18}
                className="text-emerald-400"
              />

            </div>


            <div>

              <p className="text-sm font-medium">
                WASTEWISE will evaluate
              </p>


              <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">

                <span>✓ Material compatibility</span>
                <span>✓ Market demand</span>
                <span>✓ Processing feasibility</span>
                <span>✓ Logistics feasibility</span>
                <span>✓ Economic potential</span>
                <span>✓ Environmental potential</span>

              </div>

            </div>

          </div>

        </section>


        {/* ERROR */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/[0.04] p-4">

            <p className="text-sm font-medium text-red-300">
              Cannot start analysis
            </p>

            <p className="mt-1 text-xs text-red-400/70">
              {error}
            </p>

          </div>

        )}


        {/* BUTTON */}

        <div className="mt-6 flex justify-end">

          <button
            onClick={submit}
            className="group flex items-center gap-3 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300"
          >

            <Sparkles size={17} />

            Analyze Waste

            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />

          </button>

        </div>

      </main>

    </div>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function Step({
  number,
  label,
  active = false,
}) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
          active
            ? "bg-emerald-400 text-slate-950"
            : "bg-slate-900 text-slate-600"
        }`}
      >
        {number}
      </div>

      <span
        className={`hidden text-xs sm:block ${
          active
            ? "text-slate-200"
            : "text-slate-600"
        }`}
      >
        {label}
      </span>

    </div>
  );
}


function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-emerald-400">
        {icon}
      </div>

      <div>

        <h2 className="text-base font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}


function Input({
  label,
  placeholder,
  suffix,
  value,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <div className="relative">

        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-emerald-400/50"
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-600">
            {suffix}
          </span>
        )}

      </div>

    </label>
  );
}


function Select({
  label,
  options,
  value,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-emerald-400/50"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </label>
  );
}


export default AnalyzeWaste;