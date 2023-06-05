import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const onResize = () =>
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return windowSize;
}
