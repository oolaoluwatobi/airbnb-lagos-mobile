import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const Page = () => {
  const { signOut, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user) return;

    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.emailAddresses[0].emailAddress);

    const onGetToken = async () => {
      try {
        const token = await getToken();
        if (token) setToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    onGetToken();
  }, [user]);

  console.log(token, "TOKEN_____PROFILE.tsx 46");

  const onSaveUser = async () => {
    try {
      if (!firstName || !lastName) return;

      await user?.update({
        firstName,
        lastName,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
      user?.setProfileImage({ file: base64 });
      // setImageUri(result.uri);
      // await user?.update({
      //   imageUrl: result.uri,
      // });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => onCaptureImage()}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 8 }}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="First name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: "mon-b", fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && <Button title="Log out" onPress={() => signOut()} />}

      {isSignedIn ? (
        <Text>You are signed in</Text>
      ) : (
        <Text>You are not signed in</Text>
      )}

      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title="Login" color={Colors.dark} />
        </Link>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontFamily: "mon-b",
    fontSize: 24,
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 2 },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default Page;
