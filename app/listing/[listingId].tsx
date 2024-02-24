import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { listingId } = useLocalSearchParams();

  return (
    <View>
      <Text>Page: {listingId}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
