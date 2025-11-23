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

    return (
        <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white rounded-2xl">
            <CardContent className="p-0">
                <div className="relative overflow-hidden">
                    <ImageWithFallback
                        src={product.image} // This will be undefined for API products, triggering fallback
                        fallbackSrc="src/assets/loguinho.jpg" // Specific fallback image
                        alt={product.name}
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                            <Badge
                                variant="destructive"
                                className="text-sm md:text-lg px-3 md:px-4 py-1 md:py-2"
                            >
                                Indisponível
                            </Badge>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 md:p-6">
                    <Badge variant="outline" className="mb-2 md:mb-3 text-xs">
                        {product.category || "Sem Categoria"}
                    </Badge>

                    <h3 className="font-bold mb-2 md:mb-3 line-clamp-2 text-base md:text-lg group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="text-lg md:text-2xl font-bold text-primary">
                            {formatPrice(product.basePrice)}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 md:p-6 pt-0">
                <Button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full h-10 md:h-12 rounded-xl font-semibold group-hover:scale-105 transition-transform text-sm md:text-base"
                    size="lg"
                >
                    <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="hidden sm:inline">
                        {product.stock > 0
                            ? "Adicionar ao Carrinho"
                            : "Indisponível"}
                    </span>
                    <span className="sm:hidden">
                        {product.stock > 0 ? "Adicionar" : "Indisponível"}
                    </span>
                </Button>
            </CardFooter>
        </Card>
    );
}
