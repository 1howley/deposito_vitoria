import { Button } from "../atoms/button";
import { ArrowRight, Star, Award, Shield, MessageCircle } from "lucide-react";
import { Badge } from "../atoms/badge";

export function HeroSection({ onShopNow }) {
    const handleConsultorClick = () => {
        // Abre WhatsApp com mensagem pré-definida
        const phoneNumber = "5537998203602"; // Número do WhatsApp
        const message =
            "Olá! Gostaria de falar com um consultor sobre materiais de construção.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <section className="relative bg-gradient-to-br from-muted/30 via-background to-muted/50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <Badge className="mb-4 md:mb-6 bg-primary/10 text-primary border-primary/20 px-3 md:px-4 py-1 md:py-2 text-sm">
                        ⭐ Loja #1 em Cajuru
                    </Badge>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                        Materiais de Construção
                        <span className="block text-foreground">
                            de Qualidade
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                        Transforme sua obra com nossos materiais de construção
                        selecionados. Qualidade garantida, atendimento
                        especializado e resultados excepcionais.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
                        <Button
                            size="lg"
                            onClick={onShopNow}
                            className="group h-12 md:h-14 px-6 md:px-8 rounded-full text-base md:text-lg"
                        >
                            Explorar Catálogo
                            <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleConsultorClick}
                            className="group h-12 md:h-14 px-6 md:px-8 rounded-full text-base md:text-lg border-2 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-all duration-200"
                        >
                            <MessageCircle className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
                            Falar com Consultor
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center p-4 md:p-6 bg-white/50 rounded-2xl backdrop-blur-sm border border-border/50">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                                <Award className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2 text-sm md:text-base">
                                Qualidade Certificada
                            </h3>
                            <p className="text-muted-foreground text-xs md:text-sm text-center">
                                Produtos com certificação de qualidade
                            </p>
                        </div>

                        <div className="flex flex-col items-center p-4 md:p-6 bg-white/50 rounded-2xl backdrop-blur-sm border border-border/50">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                                <Star className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2 text-sm md:text-base">
                                Atendimento 5 Estrelas
                            </h3>
                            <p className="text-muted-foreground text-xs md:text-sm text-center">
                                Consultoria especializada para sua obra
                            </p>
                        </div>

                        <div className="flex flex-col items-center p-4 md:p-6 bg-white/50 rounded-2xl backdrop-blur-sm border border-border/50">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                                <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2 text-sm md:text-base">
                                Garantia Total
                            </h3>
                            <p className="text-muted-foreground text-xs md:text-sm text-center">
                                Garantia completa em todos os produtos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
