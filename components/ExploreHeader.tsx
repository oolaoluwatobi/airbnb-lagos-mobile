import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as haptics from "expo-haptics";

export const categories = [
  {
    label: "Beach",
    icon: "waves",
    description: "This property is close to the beach!",
  },
  // {
  //   label: "Windmills",
  //   icon: "barn",
  //   description: "This property has windmills!",
  // },
  {
    label: "Modern",
    icon: "city",
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: "home-outline",
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: "pool",
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: "island",
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: "water",
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: "snowflake",
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: "castle",
    description: "This property is in a castle!",
  },
  {
    label: "Arctic",
    icon: "snowflake",
    description: "This property has winter activities!",
  },
  {
    label: "Camping",
    icon: "tent",
    description: "This property has camping activities!",
  },
  {
    label: "Barn",
    icon: "barn",
    description: "This property is oo=n a farm!",
  },
  // {
  //   label: "Cave",
  //   icon: "rock",
  //   description: "This property is in a cave!",
  // },
  {
    label: "Desert",
    icon: "cactus",
    description: "This property is in a desert!",
  },
  {
    label: "Lux",
    icon: "diamond-outline",
    description: "This property is luxurious!",
  },
];

interface ExploreHeaderProps {
  onCategoryChange: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChange }: ExploreHeaderProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];

    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(categories[index].label);
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/bookings"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <MaterialIcons name="search" size={24} color={Colors.primary} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text style={{ fontFamily: "mon-sb", color: Colors.grey }}>
                  Anywhere • Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={{ padding: 20 }}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              onPress={() => selectCategory(index)}
              style={
                index === activeIndex
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
              }
            >
              <MaterialCommunityIcons
                name={category.icon as any}
                size={24}
                color={index === activeIndex ? "#000" : Colors.grey}
              />
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 12,
                  color: index === activeIndex ? "#000" : Colors.grey,
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 140,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    columnGap: 20,
    // gap: 20,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 24,
    gap: 10,
    alignItems: "center",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: "mon-sb",
  },
  categoryBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});

export default ExploreHeader;
