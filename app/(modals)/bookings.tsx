import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { places } from "@/assets/data/places";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const bookings = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I&apos;m flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons name="search" size={20} style={styles.searchIcon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search for a place"
                  placeholderTextColor={Colors.grey}
                />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {places.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedPlace(index)}
                    style={{
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      backgroundColor:
                        selectedPlace == index ? Colors.primary : "white",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "mon-sb",
                        color: selectedPlace == index ? "white" : Colors.dark,
                      }}
                    >
                      {place.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </>
        )}
      </View>

      {/* when */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 1 && (
          <Animated.View>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              When is your trip?
            </Animated.Text>
          </Animated.View>
        )}
      </View>

      {/* who */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>Who&apos;s coming?</Text>
            <Text style={styles.previewDate}>Any guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 2 && (
          <Animated.View>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Who?
            </Animated.Text>
          </Animated.View>
        )}
      </View>

      {/* footer */}
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
          <TouchableOpacity
            onPress={onClearAll}
            style={{ justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 18,
                color: Colors.grey,
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    margin: 10,
    // padding: 20,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    gap: 20,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 18,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.dark,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-sb",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 16,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
});

export default bookings;
