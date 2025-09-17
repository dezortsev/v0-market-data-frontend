"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SubscriptionFormProps {
  selectedPackages: string[]
  showForm: boolean
}

export function SubscriptionForm({ selectedPackages, showForm }: SubscriptionFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    paymentMethod: "",
    subscriptionPeriod: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    paymentMethod: false,
    subscriptionPeriod: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = {
      paymentMethod: !formData.paymentMethod,
      subscriptionPeriod: !formData.subscriptionPeriod,
    }

    setValidationErrors(errors)

    // Check if there are any validation errors
    if (errors.paymentMethod || errors.subscriptionPeriod) {
      return // Don't submit if validation fails
    }

    console.log("Form submitted:", { ...formData, selectedPackages })
    setIsSubmitted(true)
  }

  const handleNewApplication = () => {
    setIsSubmitted(false)
    setFormData({
      email: "",
      paymentMethod: "",
      subscriptionPeriod: "",
    })
    setValidationErrors({
      paymentMethod: false,
      subscriptionPeriod: false,
    })
  }

  const packageNames = {
    "nasdaq-total": "Nasdaq Total View",
    "cta-utp": "CTA/UTP",
    "cboe-edgx": "CBOE EDGX Depth",
  }

  const plans = [
    {
      id: "nasdaq-total",
      name: "Nasdaq Total View",
      proPrice: 227,
      nonProPrice: 53,
    },
    {
      id: "cta-utp",
      name: "CTA/UTP",
      proPrice: 161,
      nonProPrice: 53,
    },
    {
      id: "cboe-edgx",
      name: "CBOE EDGX Depth",
      proPrice: 108,
      nonProPrice: 32,
    },
  ]

  const getPackageDetails = () => {
    return selectedPackages
      .map((packageId) => {
        const lastDashIndex = packageId.lastIndexOf("-")
        const userType = packageId.substring(lastDashIndex + 1)
        const planId = packageId.substring(0, lastDashIndex)

        const plan = plans.find((p) => p.id === planId)
        if (plan) {
          const price = userType === "professional" ? plan.proPrice : plan.nonProPrice
          return {
            name: plan.name,
            userType: userType === "professional" ? "Professional" : "Non-Professional",
            price: price,
          }
        }
        return null
      })
      .filter(Boolean)
  }

  const calculateTotal = () => {
    const monthlyTotal = getPackageDetails().reduce((total, pkg) => total + (pkg?.price || 0), 0)
    const period = Number.parseInt(formData.subscriptionPeriod) || 1
    return monthlyTotal * period
  }

  const calculateMonthlyTotal = () => {
    return getPackageDetails().reduce((total, pkg) => total + (pkg?.price || 0), 0)
  }

  if (!showForm || selectedPackages.length === 0) {
    return null
  }

  if (isSubmitted) {
    return (
      <section id="subscription-form" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">Ваша заявка принята!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Спасибо за вашу заявку. С вами свяжутся по указанной электронной почте.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  После отправки заявки ожидайте письмо с деталями координации оплаты. Данные для входа будут отправлены
                  после подтверждения оплаты.
                </p>
                <Button onClick={handleNewApplication} className="mt-4">
                  Подать новую заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="subscription-form" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Оформление подписки</h2>
          <p className="text-xl text-muted-foreground">Завершите оформление подписки на выбранные пакеты</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Детали подписки</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Примечание: email с доменом .ru не принимаются</p>
              </div>

              <div className="space-y-3">
                <Label>Способ оплаты *</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => {
                    setFormData({ ...formData, paymentMethod: value })
                    setValidationErrors({ ...validationErrors, paymentMethod: false })
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ru-card" id="ru-card" />
                    <Label htmlFor="ru-card">Карта РФ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="foreign-card" id="foreign-card" />
                    <Label htmlFor="foreign-card">Зарубежная банковская карта (требуется координация валюты)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto">Криптовалюта (только USDT)</Label>
                  </div>
                </RadioGroup>
                {validationErrors.paymentMethod && (
                  <p className="text-sm text-red-500">Пожалуйста, выберите способ оплаты</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Период подписки *</Label>
                <Select
                  value={formData.subscriptionPeriod}
                  onValueChange={(value) => {
                    setFormData({ ...formData, subscriptionPeriod: value })
                    setValidationErrors({ ...validationErrors, subscriptionPeriod: false })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите период подписки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 месяц</SelectItem>
                    <SelectItem value="2">2 месяца</SelectItem>
                    <SelectItem value="3">3 месяца</SelectItem>
                    <SelectItem value="4">4 месяца</SelectItem>
                    <SelectItem value="5">5 месяцев</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.subscriptionPeriod && (
                  <p className="text-sm text-red-500">Пожалуйста, выберите период подписки</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Рекомендуем более длительные периоды, так как продления обрабатываются вручную и могут занять время.
                </p>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Выбранные пакеты:</h3>
                <div className="space-y-2">
                  {getPackageDetails().map((pkg, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">{pkg?.name}</span>
                        <span className="text-muted-foreground ml-2">({pkg?.userType})</span>
                      </div>
                      <span className="font-medium">${pkg?.price}/month</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Месячная стоимость:</span>
                      <span>${calculateMonthlyTotal()}/month</span>
                    </div>
                    {formData.subscriptionPeriod && Number.parseInt(formData.subscriptionPeriod) > 1 && (
                      <div className="flex justify-between items-center text-sm">
                        <span>Период подписки:</span>
                        <span>{formData.subscriptionPeriod} мес.</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center font-bold text-lg mt-2">
                      <span>Итого к оплате:</span>
                      <span className="text-primary">${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Отправить заявку на подписку
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                После отправки заявки ожидайте письмо с деталями координации оплаты. Данные для входа будут отправлены
                после подтверждения оплаты.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
