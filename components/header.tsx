"use client"

import { Button } from "@/components/ui/button"

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary"></div>
          <span className="text-xl font-bold">Lime Prime</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Возможности
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Тарифы
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Вопросы
          </button>
        </nav>

        <Button onClick={() => scrollToSection("pricing")} className="bg-green-600 hover:bg-green-700">
          Начать
        </Button>
      </div>
    </header>
  )
}
