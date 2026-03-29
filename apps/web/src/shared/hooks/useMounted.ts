"use client";

import { useEffect, useState } from "react";

/** SSR과 첫 클라이언트 페인트를 맞추기 위해, 마운트 이후에만 true */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
