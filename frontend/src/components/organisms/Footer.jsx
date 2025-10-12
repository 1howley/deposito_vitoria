import { Phone, MapPin, Clock, Mail, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "../atoms/button";
import { Separator } from "../atoms/separator";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Depósito Vitória</h3>
            <p className="text-muted-foreground mb-4">
              Sua loja de materiais de construção de confiança em Cajuru.
              Qualidade e tradição há mais de 20 anos.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(41) 3234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>(41) 99999-8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contato@depositovitoria.com.br</span>
              </div>
            </div>
          </div>

          {/* Address & Hours */}
          <div>
            <h4 className="font-semibold mb-4">Localização</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div>
                  <p>Rua das Construções, 123</p>
                  <p>Cajuru - Curitiba, PR</p>
                  <p>CEP: 82900-000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Segunda a Sexta</p>
                  <p className="text-sm text-muted-foreground">8:00 às 18:00</p>
                </div>
              </div>
              <div className="ml-6">
                <p className="font-medium">Sábado</p>
                <p className="text-sm text-muted-foreground">8:00 às 16:00</p>
              </div>
              <div className="ml-6">
                <p className="font-medium">Domingo</p>
                <p className="text-sm text-muted-foreground">Fechado</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 Depósito Vitória Cajuru. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Entrega
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}