import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

import listingsData from "@/assets/data/airbnb-listings.json";
// import ListingsMapData from "@/assets/data/airbnb-listings.geojson";

import ListingMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Listing } from "@/types/types";
import { getListings } from "@/actions/getLIstings";

const index = () => {
  const [category, setCategory] = useState("All");
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    console.log(category);
    setCategory(category);
  };

  useEffect(() => {
    // console.log(category, listings.slice(0, 600).length, "listings");
    setLoading(true);
    getListings().then(setData);

    setLoading(false);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChanged} />,
        }}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ListingMap listings={data} />
        <ListingsBottomSheet listings={data} category={category} />
      </GestureHandlerRootView>
    </View>
  );
};

export default index;
