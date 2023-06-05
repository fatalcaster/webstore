import { useEffect } from "react";

export default function useOnWindowResize(
  cb: () => void,
  callOnMount?: boolean
) {
  useEffect(() => {
    if (callOnMount) cb();
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);
}
