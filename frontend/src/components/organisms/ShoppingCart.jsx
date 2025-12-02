import { Link } from "react-router-dom"; // Ajuste: Importar de react-router-dom se estiver usando Link
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../atoms/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../atoms/sheet";
import { Badge } from "../atoms/badge";
import { ImageWithFallback } from "../atoms/ImageWithFallback";

export function ShoppingCart({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
}) {
    // FUNÇÃO AUXILIAR PARA GARANTIR QUE O PREÇO É UM NÚMERO
    // Ela tenta ler 'price', se não achar lê 'basePrice', se não achar usa 0
    const getSafePrice = (item) => {
        const value = item.price || item.basePrice;
        return Number(value) || 0;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    // CORREÇÃO NO CÁLCULO DO TOTAL
    const total = cartItems.reduce(
        (sum, item) => sum + getSafePrice(item) * item.quantity,
        0
    );

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col">
                <SheetHeader className="pb-4">
                    <SheetTitle className="text-base md:text-lg">
                        Carrinho de Compras
                    </SheetTitle>
                    <Badge variant="secondary" className="text-xs w-fit mt-2">
                        {totalItems} itens
                    </Badge>
                </SheetHeader>

                <div className="flex-1 flex flex-col min-h-0">
                    {cartItems.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-center">
                            <div>
                                <div className="text-4xl md:text-6xl mb-3 md:mb-4">
                                    🛒
                                </div>
                                <h3 className="text-base md:text-lg mb-2">
                                    Seu carrinho está vazio
                                </h3>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Adicione alguns produtos para começar suas
                                    compras!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-auto space-y-3 md:space-y-4">
                                {cartItems.map((item) => {
                                    // PREPARA O PREÇO PARA ESTE ITEM ESPECÍFICO
                                    const itemPrice = getSafePrice(item);

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex gap-3 md:gap-4 p-3 md:p-4 border rounded-lg"
                                        >
                                            <ImageWithFallback
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 md:w-16 md:h-16 object-cover rounded shrink-0"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium line-clamp-2 mb-1 text-sm md:text-base">
                                                    {item.name}
                                                </h4>
                                                <Badge
                                                    variant="outline"
                                                    className="mb-2 text-xs"
                                                >
                                                    {item.category}
                                                </Badge>
                                                <div className="flex items-center justify-between">
                                                    {/* CORREÇÃO NA EXIBIÇÃO DO PREÇO */}
                                                    <span className="font-semibold text-primary text-sm md:text-base">
                                                        {formatPrice(itemPrice)}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            onRemoveItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center gap-1 md:gap-2 shrink-0">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        onUpdateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Plus className="h-3 w-3 md:h-4 md:w-4" />
                                                </Button>
                                                <span className="text-sm font-medium min-w-[24px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        onUpdateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Minus className="h-3 w-3 md:h-4 md:w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t pt-4 space-y-3 md:space-y-4 shrink-0">
                                <div className="flex justify-between items-center">
                                    <span className="text-base md:text-lg font-semibold">
                                        Total:
                                    </span>
                                    <span className="text-lg md:text-xl font-bold text-primary">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                                <Link to="/checkout">
                                    {" "}
                                    {/* Ajustei o link para minúsculo e com barra /checkout */}
                                    <Button
                                        onClick={onCheckout}
                                        className="w-full h-12"
                                    >
                                        Finalizar Compra
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="w-full h-10"
                                >
                                    Continuar Comprando
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
