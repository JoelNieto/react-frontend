"use client";

import { useGlobalContext } from "@/app/Context/store";
import { Listing } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(date)
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function ListingPage({ params }: any) {
  const { listings } = useGlobalContext();
  const [details, setDetails] = useState<Listing>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");

  const sendContactInfo = (event) => {
    toast.success('Message sent successfully')

    event.preventDefault();
    console.log({ name, email, phone, comments });
  };

  useEffect(
    () => setDetails(listings.find((x) => x.Id === Number(params.id))),
    [listings, params.id]
  );

  return (
    details && (
      <div className="flex gap-8">
        <div className="w-1/2">
          <div className="flex w-full justify-between">
            <div>
              <h1 className="text-2xl">{details.Title}</h1>
              <h3 className="text-sm">{details.Location}</h3>
            </div>
            <div>
              <p className="text-xl">{formatCurrency(details["Sale Price"])}</p>
              <p className="text-xs text-gray-400">
                Date listed: {formatDate(details.DateListed)}{" "}
              </p>
            </div>
          </div>
          <Image
            className=""
            src={details.PictureURL!}
            alt={details.Title!}
            width={400}
            height={400}
          />
          <div className="flex justify-around *:flex *:flex-col *:text-center mt-2 border border-gray-300 p-2">
            <div>
              <span>{details?.Bedrooms}</span>
              BED
            </div>
            <div>
              <span>{details?.Bathrooms}</span>
              BATH
            </div>
            <div>
              <span>{details?.Parking}</span>
              PARKING
            </div>
            <div>
              <span>{details?.Sqft}</span>
              SQFT
            </div>
            <div>
              <span>{details?.YearBuilt}</span>
              YEAR BUILT
            </div>
          </div>
          <p className="text-sm">{details?.Description}</p>
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <div className="w-full flex justify-end">
            <button className="bg-sky-700 text-white px-4 py-2">
              Save Listing
            </button>
          </div>
          <div className="bg-gray-200 p-6">
            <h3 className="text-xl mb-4">Contact Agent</h3>
            <form className="flex flex-col gap-3" onSubmit={sendContactInfo}>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Full name *"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email *"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <textarea
                name="comments"
                id="comments"
                rows={5}
                value={comments}
                placeholder="Comments *"
                required
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
              <button type="submit" className="px-4 py-2 bg-sky-400 text-white">
                Contact now
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
