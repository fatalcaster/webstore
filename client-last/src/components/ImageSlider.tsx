import Image from "next/image";

import useImageSlider, { ImageProps } from "@/hooks/useImageSlider";
import { ArrowIcon } from "./Icons";
import { useEffect, useRef, useState } from "react";

interface ImageSliderProps {
  images: ImageProps[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const { handlers, selectedImage, selectImage, setNextImage, setPrevImage } =
    useImageSlider(images);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      style={{ backgroundColor: selectedImage.bgColor }}
      {...handlers}
      className="flex flex-col justify-center items-center w-full relative"
    >
      <Image
        ref={imgRef}
        priority
        className="max-h-[60vh] min-h-[300px]  w-auto select-none"
        alt="/product.webp"
        width={500}
        height={500}
        src={selectedImage.src}
      />
      <button
        className="touch:hidden absolute my-auto left-0 "
        onClick={setPrevImage}
      >
        <ArrowIcon orientation="left" />
      </button>
      <button
        className="touch:hidden absolute my-auto right-0"
        onClick={setNextImage}
      >
        <ArrowIcon orientation="right" />
      </button>
      <ul className="m-0 p-0 absolute top-4 left-4">
        {images.map((e, index) => (
          <li key={index}>
            <button
              className={`${
                selectedImage === e ? "w-4" : "w-2"
              } bg-black opacity-20 h-2 rounded-full mr-1`}
              onClick={() => selectImage(index)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
