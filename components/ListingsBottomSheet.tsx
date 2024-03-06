import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Listing, User } from "@/types/types";
// import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Listings from "./Listings";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listings: Listing[] | undefined;
  currentUser?: User | undefined;
  category: string;
}

export default function ListingsBottomSheet({
  listings,
  currentUser,
  category,
}: Props) {
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      style={styles.sheetContainer}
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      // enableBackdrop={true} // Enable backdrop
      // backdropColor={"#00000080"} // Set backdrop color with some transparency
      containerStyle={{
        // Remove or make transparent the background color
        backgroundColor: "transparent", // Or "#00000000"
        elevation: 4,
        // borderRadius: 20,
      }}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
    >
      <View style={styles.contentContainer}>
        <Listings
          listings={listings}
          currentUser={currentUser}
          refresh={refresh}
          category={category}
        />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>Map</Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
