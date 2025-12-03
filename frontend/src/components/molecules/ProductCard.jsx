import { ShoppingCart, Star } from "lucide-react";
import { Button } from "../atoms/button";
import { Card, CardContent, CardFooter } from "../atoms/card";
import { Badge } from "../atoms/badge";
// O caminho foi ajustado para a nova estrutura de atoms
import { ImageWithFallback } from "../atoms/ImageWithFallback";

export function ProductCard({ product, onAddToCart }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    // Substitua o return do seu ProductCard por este:
    return (
        <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white rounded-2xl flex flex-col h-full">
            <CardContent className="p-0 flex-1">
                <div className="relative overflow-hidden">
                    <ImageWithFallback
                        src={product.image}
                        fallbackSrc="src/assets/loguinho.jpg"
                        alt={product.name}
                        // Mudança: height ajustada para mobile para não ocupar a tela toda
                        className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-700 md:group-hover:scale-110"
                    />

                    {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                            <Badge
                                variant="destructive"
                                className="text-xs md:text-lg px-2 py-1 md:px-4 md:py-2"
                            >
                                Indisponível
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="p-3 md:p-6 flex flex-col gap-2">
                    <Badge
                        variant="outline"
                        className="w-fit text-[10px] md:text-xs"
                    >
                        {product.category || "Sem Categoria"}
                    </Badge>

                    <h3 className="font-bold text-sm md:text-lg line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                        {product.name}
                    </h3>

                    {/* Descrição escondida em telas muito pequenas para limpar o layout */}
                    <p className="hidden xs:block text-muted-foreground text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-auto pt-2">
                        <span className="text-base md:text-2xl font-bold text-primary">
                            {formatPrice(product.basePrice)}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-3 md:p-6 pt-0">
                <Button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full h-9 md:h-12 rounded-xl font-semibold md:group-hover:scale-105 transition-transform text-xs md:text-base"
                    size="default" // Mudado de 'lg' fixo para se adaptar
                >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {/* Texto visível também no mobile se houver espaço, ou apenas 'Comprar' */}
                    <span className="inline">
                        {product.stock > 0 ? "Comprar" : "Indisponível"}
                    </span>
                </Button>
            </CardFooter>
        </Card>
    );
}
