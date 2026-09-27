"use client";

import { useSyncExternalStore } from "react";

let current: number | null = null;

function subscribe(callback: () => void) {
  current = Date.now();
  const id = setInterval(() => {
    current = Date.now();
    callback();
  }, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return current;
}

function getServerSnapshot() {
  return null;
}

export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
