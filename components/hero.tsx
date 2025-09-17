import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Профессиональные рыночные данные
          <span className="text-primary"> NYSE и NASDAQ</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Котировки в реальном времени и рыночные данные для профессиональных трейдеров и финансовых институтов.
          Надежно, быстро и в соответствии с требованиями биржи.
        </p>

        <div className="flex justify-center mb-12">
          <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700" asChild>
            <a href="#pricing">Посмотреть тарифы</a>
          </Button>
        </div>

        <Card className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Гарантия работы</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{"<1мс"}</div>
              <div className="text-sm text-muted-foreground">Задержка</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Поддержка</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
