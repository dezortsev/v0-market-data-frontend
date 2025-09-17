"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface PricingProps {
  onPackageSelection: (packages: string[]) => void
  onProceedToSubscription: () => void
}

export function Pricing({ onPackageSelection, onProceedToSubscription }: PricingProps) {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null)

  const plans = [
    {
      id: "nasdaq-total",
      name: "Nasdaq Total View",
      description: "Рекомендуется как базовый пакет",
      proPricing: "$227/месяц",
      nonProPricing: "$53/месяц",
      proPrice: 227,
      nonProPrice: 53,
      features: [
        "Котировки NASDAQ в реальном времени",
        "Рыночные данные уровня 2",
        "Доступ к историческим данным",
        "API интеграция",
        "Поддержка по email",
      ],
      recommended: true,
    },
    {
      id: "cta-utp",
      name: "CTA/UTP",
      description: "Комплексные данные рынка США",
      proPricing: "$161/месяц",
      nonProPricing: "$53/месяц",
      proPrice: 161,
      nonProPrice: 53,
      features: [
        "Данные NYSE и NASDAQ",
        "Котировки в реальном времени",
        "Отчеты о сделках",
        "Доступ к API",
        "Приоритетная поддержка",
      ],
    },
    {
      id: "cboe-edgx",
      name: "CBOE EDGX Depth",
      description: "Расширенные данные глубины рынка",
      proPricing: "$108/месяц",
      nonProPricing: "$32/месяц",
      proPrice: 108,
      nonProPrice: 32,
      features: [
        "Данные глубины рынка",
        "Информация о книге заявок",
        "Обновления в реальном времени",
        "API интеграция",
        "Стандартная поддержка",
      ],
    },
  ]

  const handlePackageChange = (packageId: string, userType: string, checked: boolean) => {
    const normalizedUserType = userType === "non-professional" ? "nonprofessional" : userType
    const fullPackageId = `${packageId}-${normalizedUserType}`
    let newSelectedPackages: string[]

    if (checked) {
      if (selectedPackages.length === 0) {
        setSelectedUserType(normalizedUserType)
      }
      newSelectedPackages = [...selectedPackages, fullPackageId]
    } else {
      newSelectedPackages = selectedPackages.filter((id) => id !== fullPackageId)
      if (newSelectedPackages.length === 0) {
        setSelectedUserType(null)
      }
    }

    setSelectedPackages(newSelectedPackages)
    onPackageSelection(newSelectedPackages)
  }

  const calculateTotal = () => {
    return selectedPackages.reduce((total, packageId) => {
      const lastDashIndex = packageId.lastIndexOf("-")
      const planId = packageId.substring(0, lastDashIndex)
      const userType = packageId.substring(lastDashIndex + 1)
      const plan = plans.find((p) => p.id === planId)
      if (plan) {
        return total + (userType === "professional" ? plan.proPrice : plan.nonProPrice)
      }
      return total
    }, 0)
  }

  const renderPackageCards = (userType: string, title: string, subtitle: string) => {
    const normalizedUserType = userType === "non-professional" ? "nonprofessional" : userType
    const isDisabled = selectedUserType !== null && selectedUserType !== normalizedUserType
    const currentTypePackages = selectedPackages.filter((pkg) => {
      const lastDashIndex = pkg.lastIndexOf("-")
      const packageUserType = pkg.substring(lastDashIndex + 1)
      return packageUserType === normalizedUserType
    })

    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className={`text-2xl font-bold mb-2 ${isDisabled ? "text-muted-foreground" : ""}`}>{title}</h3>
          <p className={`text-muted-foreground ${isDisabled ? "opacity-50" : ""}`}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const fullPackageId = `${plan.id}-${normalizedUserType}`
            const isSelected = selectedPackages.includes(fullPackageId)

            return (
              <Card
                key={`${plan.id}-${normalizedUserType}`}
                className={`relative transition-all ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"
                } ${
                  plan.recommended ? "border-primary shadow-lg" : ""
                } ${isSelected ? "ring-2 ring-primary bg-primary/5" : ""}`}
                onClick={() => !isDisabled && handlePackageChange(plan.id, userType, !isSelected)}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Рекомендуется
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>

                  <div className="mt-4">
                    <div className="text-3xl font-bold text-primary">
                      {userType === "professional" ? plan.proPricing : plan.nonProPricing}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {userType === "professional" ? "Профессиональный тариф" : "Непрофессиональный тариф"}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-center pt-4 border-t">
                    <div className="flex items-center">
                      <Checkbox
                        id={fullPackageId}
                        checked={isSelected}
                        disabled={isDisabled}
                        onCheckedChange={(checked) =>
                          !isDisabled && handlePackageChange(plan.id, userType, checked as boolean)
                        }
                        className="mr-3 h-5 w-5 border-2 border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <label
                        htmlFor={fullPackageId}
                        className={`text-lg font-medium text-green-600 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      >
                        {isSelected ? "Выбрано" : "Нажмите для выбора"}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {currentTypePackages.length > 0 && selectedUserType === normalizedUserType && (
          <div className="text-center mt-8">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold mb-2">
                Выбранные {userType === "professional" ? "профессиональные" : "непрофессиональные"} пакеты
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentTypePackages.length} пакет
                {currentTypePackages.length > 1 ? (currentTypePackages.length > 4 ? "ов" : "а") : ""} выбрано
              </p>
              <div className="text-2xl font-bold text-primary mb-4">
                $
                {currentTypePackages.reduce((total, packageId) => {
                  const lastDashIndex = packageId.lastIndexOf("-")
                  const planId = packageId.substring(0, lastDashIndex)
                  const packageUserType = packageId.substring(lastDashIndex + 1)
                  const plan = plans.find((p) => p.id === planId)
                  if (plan) {
                    return total + (userType === "professional" ? plan.proPrice : plan.nonProPrice)
                  }
                  return total
                }, 0)}
                /месяц
              </div>
              <Button
                size="lg"
                className="w-full px-6 py-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onProceedToSubscription()
                  setTimeout(() => {
                    const formElement = document.getElementById("subscription-form")
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  }, 100)
                }}
              >
                Оформить подписку
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Прозрачные тарифы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите один или несколько пакетов, которые подходят для ваших торговых потребностей. Выбирайте между
            профессиональными и непрофессиональными тарифами.
          </p>
        </div>

        {renderPackageCards(
          "professional",
          "Профессиональные пакеты",
          "Для лицензированных финансовых специалистов и институтов",
        )}
        {renderPackageCards(
          "non-professional",
          "Непрофессиональные пакеты",
          "Для индивидуальных трейдеров и личного использования",
        )}
      </div>
    </section>
  )
}
