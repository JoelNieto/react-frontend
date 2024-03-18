"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Listing } from "./types";
import Image from "next/image";
import { useGlobalContext } from "./Context/store";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Listings({ items }: { items: Listing[] }) {
  const { setListings, listings } = useGlobalContext();
  useEffect(() => setListings(items));
  const [beds, setBeds] = useState<number>(0);
  const [baths, setBaths] = useState<number>(0);
  const [parking, setParking] = useState<number>(0);
  const [price, setPrice] = useState<number>(1_000_000);
  const [filteredListings, filterListing] = useState(items);

  const _filterListings = () => {
    let filtered = listings;
    if (beds > 0) {
      filtered = filtered.filter((x) => x.Bedrooms === beds);
    }
    if (baths > 0) {
      filtered = filtered.filter((x) => x.Bathrooms === baths);
    }
    if (parking > 0) {
      filtered = filtered.filter((x) => x.Parking === parking);
    }

    filterListing(filtered.filter((x) => x["Sale Price"] <= price));
  };

  return (
    <div>
      <h2 className="text-5xl text-slate-800 font-semibold">Listings</h2>
      <div className="flex-col gap-4 md:flex-row flex md:justify-between mt-4">
        <div className="flex gap-2 items-center">
          Bedrooms:
          <select
            onChange={(e) => setBeds(Number(e.target.value))}
            value={beds?.toString()}
          >
            <option value={0}>--All--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          Bathrooms:
          <select
            onChange={(e) => setBaths(Number(e.target.value))}
            value={baths?.toString()}
          >
            <option value={0}>--All--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          Parking:
          <select
            onChange={(e) => setParking(Number(e.target.value))}
            value={parking?.toString()}
          >
            <option value={0}>--All--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>4</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          Price Range:
          <input
            type="range"
            min={100_000}
            max={1_000_000}
            step={50_000}
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
          <span>
            {"< "}
            {formatCurrency(price)}
          </span>
        </div>
        <button
          className="px-4 py-2 bg-sky-600 text-white"
          onClick={() => _filterListings()}
        >
          Search
        </button>
      </div>
      <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredListings.map((item) => {
          return <ListingItem key={item.Id} item={item} />;
        })}
      </div>
    </div>
  );
}

function ListingItem({ item }: any) {
  return (
    <div className="shadow">
      <Image
        src={item.ThumbnailURL}
        alt={item.Title}
        width={350}
        height={350}
      />
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{item.Title}</h3>
        <h4 className="text-sm text-gray-500">{item.Location}</h4>
        <p className="text-sm text-gray-400">
          {item.Bedrooms} beds | {item.Bathrooms} baths
        </p>
        <p className="text-lg">{formatCurrency(item["Sale Price"])}</p>
        <div className="mt-2">
          <Link
            className="px-4 py-2  bg-sky-800 text-white"
            href={`/listings/${item.Id}`}
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
