import { View, Text, StyleSheet } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { getItem } from "expo-secure-store";
import { Listing } from "@/types/types";
import { getListings } from "@/actions/getLIstings";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

interface Props {
  listings: any[];
}

let coordinates = [
  {
    latitude: 6.73231,
    longitude: 3.34432,
  },
  {
    latitude: 7.389644,
    longitude: 3.921577,
  },
  {
    latitude: 7.421527,
    longitude: 3.908095,
  },
  {
    latitude: 6.666662,
    longitude: 3.431077,
  },
  {
    latitude: 7.392901,
    longitude: 3.887006,
  },
  {
    latitude: 7.364251,
    longitude: 3.857299,
  },
];

const ListingsMap = memo(({ listings }: Props) => {
  const onMarkerPress = (listing?: any) => {
    console.log(listing);
    router.push(`/listing/${listing?.id}`);
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        // animationEnabled={false}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        clusterColor="#fff"
        clusterTextColor={Colors.primary}
        clusterFontFamily="mon-sb"
        initialRegion={{
          latitude: 7.374216,
          longitude: 3.972916,
          latitudeDelta: 0.922,
          longitudeDelta: 0.421,
        }}
      >
        {listings.map((listing: Listing, i) => {
          return (
            <Marker
              key={listing?.id}
              onPress={() => onMarkerPress(listing)}
              coordinate={{
                latitude: coordinates[i]?.latitude,
                longitude: coordinates[i]?.longitude,
              }}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>₦ {listing?.price}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ListingsMap;
