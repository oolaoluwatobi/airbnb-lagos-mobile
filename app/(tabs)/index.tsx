import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

import listingsData from "@/assets/data/airbnb-listings.json";
// import ListingsMapData from "@/assets/data/airbnb-listings.geojson";

import ListingMap from "@/components/ListingMap";

const index = () => {
  const [category, setCategory] = useState("All");
  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    console.log(category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 140 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingMap />
    </View>
  );
};

export default index;
