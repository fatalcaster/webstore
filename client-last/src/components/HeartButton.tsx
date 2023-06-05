import { useState } from "react";
import { HeartIcon } from "./Icons";

export default function HeartButton() {
  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => {
    setIsFilled((prev) => !prev);
  };
  return (
    <button
      onClick={toggleHeart}
      className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center pclick"
    >
      <HeartIcon fill={isFilled} className="text-pink-500 clickable" />
    </button>
  );
}
