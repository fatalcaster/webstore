import { images } from "@/assets/assets";
import mod from "@/helpers/modulo";
import { useState, WheelEventHandler } from "react";
import { useSwipeable } from "react-swipeable";
export interface ImageProps {
  src: string;
  bgColor: string;
}

export default function useImageSlider(images: ImageProps[]) {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const selectImage = (index: number) => {
    setSelectedImage(index);
  };
  const setPrevImage = () =>
    setSelectedImage((prev) => mod(prev - 1, images.length));
  const setNextImage = () =>
    setSelectedImage((prev) => mod(prev + 1, images.length));
  // const onWheel: WheelEventHandler<HTMLDivElement> = (e) => {
  //   e.preventDefault();
  //   if (e.deltaY < 0) setPrevImage();
  //   else if (e.deltaY > 0) setNextImage();
  // };
  const handlers = useSwipeable({
    onSwipedLeft: setPrevImage,
    onSwipedRight: setNextImage,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });
  return {
    handlers,
    setPrevImage,
    setNextImage,
    selectImage,
    selectedImage: images[selectedImage],
  };
}
