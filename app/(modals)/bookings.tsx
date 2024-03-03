import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { places } from "@/assets/data/places";

import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const bookings = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [groups, setGroups] = useState(guestsGropus);

  const [selectedPlace, setSelectedPlace] = useState(0);
  const today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
    setGroups(guestsGropus);
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

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{ gap: 25 }}
              >
                {places.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedPlace(index)}
                    style={{ marginRight: 20 }}
                  >
                    <Image
                      source={place.img}
                      style={
                        selectedPlace === index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text
                      style={{
                        fontFamily: selectedPlace === index ? "mon-sb" : "mon",
                        fontSize: 12,
                        color:
                          selectedPlace === index ? Colors.dark : Colors.grey,
                        textAlign: "left",
                        marginTop: 4,
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
          <>
            <Animated.View>
              <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                When is your trip?
              </Animated.Text>
            </Animated.View>

            <Animated.View style={styles.cardBody}>
              <DatePicker
                current={today}
                selected={today}
                mode="calendar"
                options={{
                  defaultFont: "mon",
                  headerFont: "mon-sb",
                  selectedTextColor: "white",
                  borderColor: "transparent",
                  mainColor: Colors.primary,
                }}
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* who */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Any guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 2 && (
          <>
            <Animated.View>
              <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                Who&apos;s coming?
              </Animated.Text>
            </Animated.View>

            <Animated.View style={styles.cardBody}>
              {groups.map((group, index) => (
                <View
                  key={index}
                  style={[
                    styles.guestItems,
                    index + 1 < groups.length ? styles.itemBorder : null,
                  ]}
                >
                  <View>
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                      {group.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 14,
                        color: Colors.grey,
                      }}
                    >
                      {group.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count = Math.max(
                          0,
                          newGroups[index].count - 1
                        );
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={group.count > 0 ? Colors.grey : "#cdcdcd"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 16,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {group.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count = newGroups[index].count + 1;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={26}
                        color={Colors.grey}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
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
    paddingLeft: 20,
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
    marginBottom: 20,
    marginRight: 20,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  guestItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});

export default bookings;
