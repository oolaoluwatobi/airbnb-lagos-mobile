import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

// import listingsData from "@/assets/data/airbnb-listings.json";
// import ListingsMapData from "@/assets/data/airbnb-listings.geojson";

import ListingMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Listing } from "@/types/types";
import { getListings } from "@/actions/api";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";

const index = () => {
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const { user, isLoaded } = useUser();

  const listingsQuery = useQuery({
    queryKey: ["listings"],
    queryFn: () => getListings(`${user?.emailAddresses[0].emailAddress}`),
  });

  console.log(user?.emailAddresses[0].emailAddress, "useremail____30index.tsx");

  const onDataChanged = (category: string) => {
    console.log(category);
    setCategory(category);
  };

  if (isLoaded === false) {
    return <Text>Loading...</Text>;
  }

  if (loading)
    console.log(
      user?.emailAddresses[0].emailAddress,
      "loading__is__trueuseremail____40index.tsx"
    );

  useEffect(() => {
    // console.log(category, listings.slice(0, 600).length, "listings");
    setLoading(true);

    setLoading(false);
  }, [user?.emailAddresses[0].emailAddress]);

  if (listingsQuery.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onCategoryChange={onDataChanged} />,
          }}
        />
        {listingsQuery.isLoading ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChanged} />,
        }}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ListingMap listings={listingsQuery.data?.listings} />
        <ListingsBottomSheet
          listings={listingsQuery.data?.listings}
          category={category}
          currentUser={listingsQuery.data?.currentUser}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default index;
