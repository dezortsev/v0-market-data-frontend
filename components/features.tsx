import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, Shield, Globe } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Данные в реальном времени",
      description: "Живые рыночные данные с NYSE и NASDAQ с минимальной задержкой для профессиональной торговли.",
    },
    {
      icon: Zap,
      title: "Высокая производительность",
      description: "Оптимизированная инфраструктура, обеспечивающая быструю доставку данных и надежные соединения.",
    },
    {
      icon: Shield,
      title: "Соответствие требованиям",
      description: "Полное соответствие требованиям биржи и регулятивным стандартам.",
    },
    {
      icon: Globe,
      title: "Глобальный доступ",
      description: "Доступ к рыночным данным из любой точки мира через нашу глобальную инфраструктуру.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Профессиональные решения для рыночных данных</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Все необходимое для профессиональной торговли и финансового анализа
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
