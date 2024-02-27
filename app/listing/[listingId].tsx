import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
// import listingsData from "@/assets/data/airbnb-listings.json";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";

import { Listing } from "@/types/types";
import { getListings } from "@/actions/getLIstings";
import { categories } from "@/components/ExploreHeader";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
  const { listingId } = useLocalSearchParams();
  const [data, setData] = useState<Listing[] | null>(null);
  const [loading, setLoading] = useState(true);
  // const listRef = useRef<FlatList<Listing>>(null);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const listing = data?.find((item) => item.id === listingId);
  const scrollOffset = useScrollViewOffset(scrollRef);

  useEffect(() => {
    // console.log(category, listings.slice(0, 600).length, "listings");
    getListings().then(setData);

    setLoading(false);
  }, []);

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing?.title,
        url: `https://airbnb-lagos.vercel.app/listings/${listing?.id}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  let dateStr = listing?.createdAt; // ISO 8601 date string
  let dateObj = new Date(dateStr!);

  let formattedDate = dateObj.toLocaleDateString(); // "MM/DD/YYYY" format for US locale

  const getCategoryIcon = (params: string) => {
    if (listing?.category === params) {
      const icon = categories.find((item) => item.label === params);
      console.log(icon, "[listingId.tsx] 127");
      return icon;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: listing?.imageSrc }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing?.title}</Text>
          <Text style={styles.location}>
            Located in {listing?.locationValue}
          </Text>
          <Text style={styles.rooms}>
            {listing?.guestCount} guests · {listing?.bathroomCount} bedrooms ·{" "}
            {listing?.bathroomCount} bathrooms
          </Text>
          {/* <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing?.category} · {listing?.price} reviews
            </Text>
          </View> */}
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing?.imageSrc }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing?.userId}
              </Text>
              <Text>Hosted since {formattedDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={{ flexDirection: "row", gap: 8 }}>
            <MaterialCommunityIcons
              name={getCategoryIcon(listing?.category!)?.icon as any}
              // name={listing?.category as any}
              size={24}
              color={Colors.grey}
            />
            <View style={{}}>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 16,
                  color: "#000",
                }}
              >
                {getCategoryIcon(listing?.category!)?.label as string}
              </Text>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 12,
                  color: Colors.grey,
                }}
              >
                {getCategoryIcon(listing?.category!)?.description as string}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing?.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing?.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
});
