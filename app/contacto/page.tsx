"use client"

import dynamic from "next/dynamic"
import { FooterPremium } from "@/components/footer-premium"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFaq } from "@/components/contact/contact-faq"

const DynamicIslandMenu = dynamic(() => import("@/components/dynamic-island-menu").then(mod => mod.DynamicIslandMenu), {
  ssr: false,
  loading: () => null
})

export default function ContactoPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-background">
        <DynamicIslandMenu />
        <ContactHero />
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
              <div className="lg:col-span-2">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
        <ContactFaq />
        <FooterPremium />
      </main>
    </SmoothScroll>
  )
}
