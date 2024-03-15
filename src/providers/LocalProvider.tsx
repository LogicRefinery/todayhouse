"use client";

import useSetServerData from "@/app/(todayhouse)/_util/useSetServerData";
import React, { useEffect } from "react";

export default function LocalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSetServerData();
  return <>{children}</>;
}
