import useFavorite from "@/app/Hooks/useFavorite";
import { User } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

interface HeartButtonProps {
  listingId: string;
  currentUser: User | null | undefined;
  // onWishList: boolean | undefined;
  inHeader?: boolean;
}

export const HeartButton = ({
  listingId,
  currentUser,
  // onWishList,
  inHeader,
}: HeartButtonProps) => {
  const [onTheWishList, setOnTheWishList] = useState<boolean>(false);
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
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

  if (onTheWishList) console.log("onTheWishList24heartbutton", onTheWishList);
  // console.log("onTheWishList25heartbutton", onTheWishList);
  // if (onWishList) console.log("onWishList", onWishList(listingId));

  const add = () => {
    toggleFavoriteMutation.mutate();
  };

  const remove = () => {
    toggleFavoriteMutation.mutate();
  };

  useEffect(() => {
    console.log("hasFavorited___heartbutton", hasFavorited);
  }, [hasFavorited]);

  return (
    <>
      {hasFavorited && (
        <>
          <TouchableOpacity
            style={{ position: "absolute", right: 32, top: 32 }}
            onPress={remove}
          >
            <Ionicons name="heart" size={24} color={"red"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
            onPress={remove}
          >
            <Ionicons name="heart-outline" size={28} color={"#fff"} />
          </TouchableOpacity>
        </>
      )}
      {!hasFavorited && (
        <TouchableOpacity
          style={{ position: "absolute", right: 32, top: 32 }}
          onPress={add}
        >
          <Ionicons name="heart-outline" size={24} color={"#fff"} />
        </TouchableOpacity>
      )}
    </>
  );
};
