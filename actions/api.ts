import { Listing, User } from "@/types/types";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface IListingsData {
  listings: Listing[];
  currentUser: User;
}

export async function getListings(userEmail?: string): Promise<IListingsData> {
  const response = await axios.get(`${API_URL}/listings?email=${userEmail}`);
  const data = await response.data;
  // console.log(response, "response");
  // console.log(data, "data_____listings____currentUser");
  return data;
}

interface SingleListingData {
  listing: Listing & { user: User };
  currentUser: User;
}

export async function getListingById({
  listingId,
  userEmail,
}: {
  listingId: string | string[] | undefined;
  userEmail: string | undefined;
}): Promise<SingleListingData> {
  // console.log(userEmail, "userEmail");
  // const response = await fetch(`${API_URL}/listings`);
  const response = await axios.get(
    `${API_URL}/listings/${listingId}?email=${userEmail}`
  );
  const data = await response.data;
  // console.log(response, "response");
  // console.log(data, userEmail, "singlelistingdata");
  return data;
}
