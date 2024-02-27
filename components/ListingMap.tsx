import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getItem } from "expo-secure-store";
import { Listing } from "@/types/types";
import { getListings } from "@/actions/getLIstings";

interface Props {
  listings: any;
}

let latitude = 7.387222;
let longitude = 3.976224;

let coordinates = [
  {
    latitude: 7.38701,
    longitude: 3.976884,
  },
  {
    latitude: 7.328222,
    longitude: 3.976224,
  },
  {
    latitude: 7.387482,
    longitude: 3.975624,
  },
  {
    latitude: 7.387222,
    longitude: 3.976267,
  },
  {
    latitude: 7.387259,
    longitude: 3.976224,
  },
  {
    latitude: 7.387226,
    longitude: 3.9762265,
  },
];

const onMarkerPress = (listing?: any) => {
  console.log(listing);
};

export default function ListingMap() {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  // const listRef = useRef<FlatList<Listing>>(null);

  useEffect(() => {
    // console.log(category, listings.slice(0, 600).length, "listings");
    setLoading(true);
    getListings().then(setData);

    setLoading(false);
  }, []);

  return (
    <View style={styles.constainer}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
      >
        {data.map((listing: Listing, i) => {
          return (
            <Marker
              key={listing?.id}
              onPress={() => onMarkerPress(listing)}
              coordinate={{
                latitude: coordinates[i]?.latitude,
                longitude: coordinates[i]?.longitude,
              }}
            />
          );
        })}
        <Marker
          // key={listing?.properties?.id}
          onPress={() => onMarkerPress(data[4])}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
            // latitude: +listing?.latitude,
            // longitude: +listing?.longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});
