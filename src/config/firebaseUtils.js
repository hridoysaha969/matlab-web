import { storage } from "@/config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const getImagesFromFirebase = async () => {
  const storageRef = ref(storage, "sliderImg/");
  const images = await listAll(storageRef);

  const imageUrls = await Promise.all(
    images.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );

  return imageUrls;
};
