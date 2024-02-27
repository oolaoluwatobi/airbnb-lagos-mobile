import { Listing } from "@/types/types";

export async function getListings(): Promise<Listing[]> {
  const response = await fetch("https://airbnb-lagos.vercel.app/api/listings");
  console.log(response, "response");
  const data = await response.json();
  return data;
}
