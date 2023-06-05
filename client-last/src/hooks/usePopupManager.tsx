import { Layouts, EPopupLayouts } from "@/components/PopupLayouts";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
export interface PopupProps {
  prev: () => void;
  next: () => void;
  setIsVisible: (visibility: boolean) => void;
  isVisible: boolean;
  CurrentLayout: () => JSX.Element;
  isStart: boolean;
}

interface LayoutHistory {
  prev: EPopupLayouts;
  current: EPopupLayouts;
}
export default function usePopupManager(layoutOrder: EPopupLayouts[]) {
  const [popupLayout, setPopupLayout] = useState<LayoutHistory>({
    prev: layoutOrder[0],
    current: layoutOrder[0],
  });
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setPopupLayout((p) => ({ current: layoutOrder[index], prev: p.current }));
  }, [index]);
  useEffect(() => {
    if (isVisible) {
      anchorLayout();
      document.body.classList.add("overflow-lock");
      document.documentElement.classList.add("overflow-lock");
      return () => {
        document.body.classList.remove("overflow-lock");
        document.documentElement.classList.remove("overflow-lock");
      };
    }
  }, [isVisible]);
  useEffect(() => {
    anchorLayout();

    if (isVisible) {
      document.body.classList.add("overflow-lock");
      document.documentElement.classList.add("overflow-lock");
      return () => {
        document.body.classList.remove("overflow-lock");
        document.documentElement.classList.remove("overflow-lock");
      };
    }
  }, [isVisible]);
  const next = () => {
    setIndex((p) => Math.min(layoutOrder.length - 1, p + 1));
  };
  const prev = () => {
    setIndex((p) => Math.max(0, p - 1));
  };
  const anchorLayout = () => {
    setPopupLayout((p) => ({ current: p.current, prev: p.current }));
  };
  const CurrentLayout = useCallback(() => {
    const firstTimeVisible = popupLayout.prev === popupLayout.current;
    return (
      <>
        {(Object.keys(Layouts) as EPopupLayouts[]).map((value) => {
          return (
            <AnimatePresence key={value}>
              {value === popupLayout.current && (
                <motion.div
                  exit={{ x: "200vw" }}
                  key={value}
                  {...(!firstTimeVisible && {
                    animate: { x: 0 },
                    initial: { x: "200vw" },
                  })}
                  transition={{ type: "tween" }}
                  className="flex flex-col  overflow-hidden"
                >
                  {Layouts[value]()}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </>
    );
  }, [popupLayout]);
  return {
    prev,
    next,
    setIsVisible,
    isVisible,
    CurrentLayout,
    isStart: popupLayout.current === layoutOrder[0],
  };
}
