"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { SubscriptionForm } from "@/components/subscription-form"
import { Footer } from "@/components/footer"

export default function Home() {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false)

  const handlePackageSelection = (packages: string[]) => {
    setSelectedPackages(packages)
    if (showSubscriptionForm) {
      setShowSubscriptionForm(false)
    }
  }

  const handleProceedToSubscription = () => {
    setShowSubscriptionForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing onPackageSelection={handlePackageSelection} onProceedToSubscription={handleProceedToSubscription} />
        </div>
        <div id="subscribe">
          <SubscriptionForm selectedPackages={selectedPackages} showForm={showSubscriptionForm} />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  )
}
