export type Listing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
};

export interface ListingData {
  availability_365: number;
  calculated_host_listings_count: number;
  city: string;
  column_10: number;
  column_19: string;
  column_20: string;
  coordinates: Coordinates;
  host_id: number;
  id: number;
  last_review: string;
  minimum_nights: number;
  name: string;
  neighbourhood: string;
  number_of_reviews: number;
  reviews_per_month: number;
  room_type: string;
  updated_date: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
