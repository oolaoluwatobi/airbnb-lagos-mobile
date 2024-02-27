import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />
      {isSignedIn ? (
        <Text>You are signed in</Text>
      ) : (
        <Text>You are not signed in</Text>
      )}
      <Link href={"/(modals)/login"}>
        <Text>Log in</Text>
      </Link>
    </View>
  );
};

export default Page;
