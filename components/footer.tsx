export function Footer() {
  return (
    <footer id="contact" className="bg-muted/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-primary"></div>
              <span className="text-xl font-bold">Lime Prime</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Профессиональные решения для рыночных данных NYSE и NASDAQ. Надежно, быстро и в соответствии с
              требованиями биржи.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-xs">
                <strong>Адрес:</strong> Unit A2-33, 3/F., Hang Fung Industrial Building, Phase 2, 2G Hok Yuen Street,
                Hunghom, Hong Kong
              </p>
              <p className="text-xs">
                <strong>Регистрационный номер:</strong> 3142741
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Поддержка:</strong> support@lime-prime.com
              </p>
              <p className="text-sm text-muted-foreground">Доступна 24/7 для технической помощи</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Рыночные данные в реальном времени</li>
              <li>Исторические данные</li>
              <li>API интеграция</li>
              <li>Техническая поддержка</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://drive.google.com/uc?export=download&id=1ZWK_HlE6SoeUCD1a165B__J-ur7V9iGL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Условия использования
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/uc?export=download&id=1rwmcK2kl9wz6EvO62N20QnbeaNdZhVmw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Политика конфиденциальности
                </a>
              </li>
              <li>Соглашение о данных</li>
              <li>Соглашение о неразглашении</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Lime Prime. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
