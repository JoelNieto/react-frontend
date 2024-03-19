"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "./Context/store";
import { Listing } from "./types";

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
        <div className="w-96 bg-white border p-6">
          <div className="flex justify-between pb-4">
            <h1 className="text-xl font-semibold">Saved listings</h1>
            <button onClick={() => toggleModal(false)}>X</button>
          </div>
          <div className="flex flex-col gap-1">
          {saved.map((item) => {
            return <div className="flex border border-sky-600 p-4" key={item.Id}>{item.Title}</div>;
          })}
          </div>
         
        </div>
      </div>
    )
  );
}
