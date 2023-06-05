import { RefObject, useEffect, useRef } from "react";

export default function useOutsideClick(
  callback: () => void
  //   parent?: RefObject<any>
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callback]);

  return ref;
}
