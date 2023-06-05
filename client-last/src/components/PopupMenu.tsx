import useOutsideClick from "@/hooks/useClickOutside";
import { PopupProps } from "@/hooks/usePopupManager";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext } from "react";

export const PopupMenuContext = createContext<PopupProps>({
  CurrentLayout: () => <></>,
  isVisible: false,
  next: () => {},
  prev: () => {},
  setIsVisible: () => {},
  isStart: false,
});

export function PopupMenu() {
  const { isVisible, setIsVisible, CurrentLayout } =
    useContext(PopupMenuContext);

  const ref = useOutsideClick(() => {
    setIsVisible(false);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="modal"
          className="bg-[rgba(0,0,0,0.4)] w-screen h-screen top-0 left-0 fixed overflow-hidden flex justify-center items-end shrink-0"
        >
          <div className="flex justify-center max-w-[95%] w-[90vw]">
            <motion.div
              key="popup-layout"
              ref={ref}
              transition={{ type: "tween" }}
              initial={{ y: "200vh" }}
              animate={{ y: 0 }}
              exit={{ y: "200vh" }}
              className="max-h-[85vh] max-w-[450px] w-full bg-white rounded-t-3xl p-8 flex flex-col overflow-hidden relative pb-0 safari-only "
            >
              <CurrentLayout />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
