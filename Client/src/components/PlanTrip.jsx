import React from "react";
import { Link } from "react-router-dom";
import "../styles/PlanTrip.css"

const PLAN_TILES = [
  { id: "mini", label: "1N 2D" },
  { id: "short", label: "2N 3D" },
  { id: "classic", label: "3N 4D" },
  { id: "long", label: "4N 5D" },
  { id: "weekend", label: "Weekend" },
  { id: "relaxed", label: "Relaxed" },
];

export default function PlanTrip() {
  return (
    <main className="main-content px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-black plan-title">
            Choose your duration
          </h1>
          <p className="mt-2 text-sm sm:text-base plan-subtitle">
            Pick a package to start building your plan.
          </p>
        </header>

        {/* 2 per row on mobile, 3 per row on md+ */}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {PLAN_TILES.map((tile) => (
            <li key={tile.id} className="list-none">
              <Link
                to={`/plan-trip/${tile.id}`}
                data-id={tile.id}
                aria-label={`Select ${tile.label}`}
                className={[
                  "plan-tile",
                  tile.accent,
                  "h-full",
                  "block rounded-3xl overflow-hidden",
                  "focus:outline-none focus:ring-2 focus:ring-[rgba(11,163,127,0.35)]",
                ].join(" ")}
              >
                <div className="plan-tile__bg" aria-hidden="true" />
                <div className="relative p-6 h-full grid place-items-center">
                  <span className="plan-tile__label">{tile.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
