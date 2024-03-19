"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "./Context/store";
import { Listing } from "./types";
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Modal() {
  const { showModal, toggleModal, savedIds, listings } = useGlobalContext();
  const [saved, setSaved] = useState<Listing[]>([]);

  useEffect(
    () => setSaved(listings.filter((x) => savedIds.includes(x.Id))),
    [savedIds, listings]
  );

  return (
    showModal && (
      <div className="absolute h-screen w-screen flex backdrop-blur-sm bg-white/30 items-center justify-center">
        <div className="w-2/5 bg-white border p-6">
          <div className="flex justify-between pb-4">
            <h1 className="text-xl font-semibold">Saved listings</h1>
            <button onClick={() => toggleModal(false)}>X</button>
          </div>
          <div className="flex flex-col gap-1">
            {saved.map((item) => {
              return (
                <div
                  className="flex justify-between items-center border border-sky-600 p-4"
                  key={item.Id}
                >
                  <div className="flex flex-col">
                    <p className="text-lg text-gray-800">{item.Title}</p>
                    <p className="text-sm text-gray-400">{item.Location}</p>
                  </div>
                  <p className="text-2xl">
                    {formatCurrency(item["Sale Price"])}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
