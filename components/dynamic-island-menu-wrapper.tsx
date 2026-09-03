"use client"

import dynamic from "next/dynamic"

const DynamicIslandMenu = dynamic(
  () => import("./dynamic-island-menu").then((mod) => mod.DynamicIslandMenu),
  { ssr: false, loading: () => null }
)

export function DynamicIslandMenuWrapper() {
  return <DynamicIslandMenu />
}
