"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * React 19-safe hydration check without triggering setState in useEffect.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Subscribes to fine-pointer capability (mouse/trackpad vs touch-only).
 */
export function useIsFinePointer(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(pointer: fine)").matches
        : false,
    () => false
  );
}

/**
 * Subscribes to user's prefers-reduced-motion accessibility preference.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    () => false
  );
}
