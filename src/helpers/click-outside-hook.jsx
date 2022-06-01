import { useEffect } from "react";

export const useClickOutsideHook = (fnToBeExecuted, clickRef, outsideRef) => {
  useEffect(() => {
    const closeSideNavHandler = (e) => {
      if (!clickRef.current?.contains(e.target)) {
        fnToBeExecuted();
      }
    };
    outsideRef.current?.addEventListener("mousedown", closeSideNavHandler);
  }, [fnToBeExecuted]);
};
