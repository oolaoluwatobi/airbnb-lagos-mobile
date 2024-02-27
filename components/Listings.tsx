import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ListRenderItem,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getListings } from "@/actions/getLIstings";
import { Listing } from "@/types/types";
import Colors from "@/constants/Colors";

import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listings: Listing[];
  category: string;
}

const Listings = ({ listings, category }: Props) => {
  const [data, setData] = useState<Listing[] | null>(null);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<FlatList<Listing>>(null);

  useEffect(() => {
    // console.log(category, listings.slice(0, 600).length, "listings");
    getListings().then(setData);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  // console.log(data, "listings___listings.tsx 38");

  // console.log(data, "listingsData___listings.tsx 39");

  const renderRow: ListRenderItem<Listing> = ({ item }) =>
    data && (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image
              source={{
                uri: item.imageSrc,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", right: 32, top: 32 }}
            >
              <Ionicons name="heart" size={20} color={"red"} />
            </TouchableOpacity>

            <View style={{ flexDirection: "column", gap: 4, marginTop: 10 }}>
              <Text style={{ fontSize: 18 }}>
                {item.title}, located at {item.locationValue}
              </Text>
              <Text style={{ color: "rgb(115 115 115)" }}>{item.category}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  $ {item.price}
                </Text>
                <Text style={{ marginTop: "auto" }}> night</Text>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Listings;
