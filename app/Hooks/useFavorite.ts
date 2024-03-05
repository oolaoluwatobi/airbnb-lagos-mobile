import { User } from "@/types/types";
import axios from "axios";
import { useRouter } from "expo-router";
// import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineHeart } from "react-icons/ai";

// import { User } from "@prisma/client";

// import useLoginModal from './useLoginModal'

interface IUserFavorite {
  listingId: string;
  currentUser?: User | null | undefined;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    console.log(currentUser, "currentUser______useFavorite 23.tsx");
    if (!currentUser) {
      return false;
    }

    const list = currentUser.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async () => {
    console.log(
      currentUser,
      "currentUser______useFavorite toggle__favorite 34.tsx"
    );

    if (!currentUser) {
      return router.push("/login");
    }

    try {
      if (hasFavorited) {
        await axios.delete(
          `${process.env.EXPO_PUBLIC_API_URL}/favorites/${listingId}/user/${currentUser.id}`
        );
        console.log(
          "removed from favorites",
          currentUser.favoriteIds.includes(listingId),
          "!in favorites"
        );
        // toast.success("removed from favorites");
      } else {
        await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/favorites/${listingId}`,
          { data: currentUser }
        );
        console.log(
          "added to favorites",
          currentUser.favoriteIds.includes(listingId),
          "in favorites"
        );
        // toast.success('added to favorites');
      }
      router.navigate(".");
    } catch (error) {
      console.error(error);
      // toast.error("failed");
    }

    router.navigate(".");
  }, [currentUser, hasFavorited, listingId, router]);

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
