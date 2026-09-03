"use client"

import dynamic from "next/dynamic"
import { FooterPremium } from "@/components/footer-premium"
import { SmoothScroll } from "@/components/smooth-scroll"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutValues } from "@/components/about/about-values"
import { AboutStats } from "@/components/about/about-stats"

const DynamicIslandMenu = dynamic(() => import("@/components/dynamic-island-menu").then(mod => mod.DynamicIslandMenu), {
  ssr: false,
  loading: () => null
})

export default function NosotrosPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-background">
        <DynamicIslandMenu />
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutStats />
        <FooterPremium />
      </main>
    </SmoothScroll>
  )
}
