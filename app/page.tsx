"use client"

import { DynamicIslandMenu } from "@/components/dynamic-island-menu"
import { HeroPremium } from "@/components/hero-premium"
import { ProductsShowcase } from "@/components/products-showcase"
import { FeaturesSection } from "@/components/features-section"
import { CtaPremium } from "@/components/cta-premium"
import { FooterPremium } from "@/components/footer-premium"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function Page() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-background">
        <DynamicIslandMenu />
        <HeroPremium />
        <ProductsShowcase />
        <FeaturesSection />
        <CtaPremium />
        <FooterPremium />
      </main>
    </SmoothScroll>
  )
}
