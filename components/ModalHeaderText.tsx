import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function ModalHeaderText() {
  const [active, setActive] = useState(0);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 0 ? "#000" : Colors.grey,
            textDecorationLine: active === 0 ? "underline" : "none",
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text style={{ fontFamily: "mon-sb", fontSize: 18 }}>Experiences</Text>
      </TouchableOpacity>
    </View>
  );
}
