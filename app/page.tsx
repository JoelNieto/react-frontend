
import Listings from "./listings";
import { Listing } from "./types";

async function fetchListings() {
  const res = await fetch(
    "https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json"
  );
  const data = await res.json();
  return data as Listing[];
}

export default async function Home() {
  const listings = await fetchListings();

  return (
    <main className="flex min-h-screen flex-col px-12">
      <Listings items={listings} />
    </main>
  );
}
