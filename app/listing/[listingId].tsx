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
// import listingsData from "@/assets/data/.listingairbnb-listings.json";
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
import { getListingById, getListings } from "@/actions/api";
import { categories } from "@/components/ExploreHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import { HeartButton } from "./components/HeartButton";
import useFavorite from "../Hooks/useFavorite";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
  const { listingId } = useLocalSearchParams();
  const { user } = useUser();

  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const singleListingQuery = useQuery({
    queryKey: ["singleListing"],
    queryFn: () =>
      getListingById({
        listingId,
        userEmail: user?.emailAddresses[0].emailAddress,
      }),
  });

  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId: listingId as string,
    currentUser: singleListingQuery.data?.currentUser,
  });

  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["listings", "singleListing"],
      });
    },
  });

  // if (onTheWishList) console.log("onTheWishList24heartbutton", onTheWishList);
  // console.log("onTheWishList25heartbutton", onTheWishList);
  // if (onWishList) console.log("onWishList", onWishList(listingId));

  const add = () => {
    toggleFavoriteMutation.mutate();
  };

  const remove = () => {
    toggleFavoriteMutation.mutate();
  };

  const scrollOffset = useScrollViewOffset(scrollRef);

  const onWishList = singleListingQuery.data?.currentUser.favoriteIds.includes(
    listingId as string
  );

  // const onWishList = singleListingQuery.data?.currentUser.favoriteIds.includes(
  //   listingId as string
  // );

  // console.log(
  //   listingId,
  //   singleListingQuery.data?.listing.user.favoriteIds,
  //   onWishList,
  //   "[listingId.tsx] 46"
  // );

  const shareListing = async () => {
    try {
      await Share.share({
        title: singleListingQuery.data?.listing.title,
        url: `https://airbnb-lagos.vercel.app/listings/${singleListingQuery.data?.listing.id}`,
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
          {hasFavorited ? (
            <TouchableOpacity style={styles.roundButton} onPress={remove}>
              <Ionicons name="heart" size={22} color={Colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.roundButton} onPress={add}>
              <Ionicons name="heart-outline" size={22} color={"#000"} />
            </TouchableOpacity>
          )}
          <HeartButton
            listingId={listingId as string}
            currentUser={singleListingQuery.data?.currentUser}
            inHeader
          />
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
  }, [onWishList, HeartButton]);

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

  let dateStr = singleListingQuery.data?.listing.createdAt; // ISO 8601 date string
  let dateObj = new Date(dateStr!);

  let formattedDate = dateObj.toLocaleDateString(); // "MM/DD/YYYY" format for US locale

  const getCategoryIcon = (params: string) => {
    if (singleListingQuery.data?.listing.category === params) {
      const icon = categories.find((item) => item.label === params);
      // console.log(icon, "[listingId.tsx] 127");
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
          source={{ uri: singleListingQuery.data?.listing.imageSrc }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {singleListingQuery.data?.listing.title}
          </Text>
          <Text style={styles.location}>
            Located in {singleListingQuery.data?.listing.locationValue}
          </Text>
          <Text style={styles.rooms}>
            {singleListingQuery.data?.listing.guestCount} guests ·{" "}
            {singleListingQuery.data?.listing.bathroomCount} bedrooms ·{" "}
            {singleListingQuery.data?.listing.bathroomCount} bathrooms
          </Text>
          <HeartButton
            listingId={listingId as string}
            currentUser={singleListingQuery.data?.currentUser}
            // inHeader
          />
          <View style={styles.divider} />

          <View style={styles.hostView}>
            {singleListingQuery.data?.listing.user.image ? (
              <Image
                source={{ uri: singleListingQuery.data?.listing.user.image }}
                style={styles.host}
              />
            ) : (
              <Ionicons
                name="person-circle"
                // style={styles.host}
                size={50}
                color={Colors.grey}
              />
            )}

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {singleListingQuery.data?.listing.user.name}
              </Text>
              <Text>Hosted since {formattedDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={{ flexDirection: "row", gap: 8 }}>
            <MaterialCommunityIcons
              name={
                getCategoryIcon(singleListingQuery.data?.listing.category!)
                  ?.icon as any
              }
              // name={singleListingQuery.data?.listing.category as any}
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
                {
                  getCategoryIcon(singleListingQuery.data?.listing.category!)
                    ?.label as string
                }
              </Text>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 12,
                  color: Colors.grey,
                }}
              >
                {
                  getCategoryIcon(singleListingQuery.data?.listing.category!)
                    ?.description as string
                }
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>
            {singleListingQuery.data?.listing.description}
          </Text>
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
            <Text style={styles.footerPrice}>
              €{singleListingQuery.data?.listing.price}
            </Text>
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
