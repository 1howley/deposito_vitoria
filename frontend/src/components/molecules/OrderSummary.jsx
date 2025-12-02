import { Card } from "../atoms/card";
import { Separator } from "../atoms/separator";
import { Button } from "../atoms/button";
import { ImageWithFallback } from "../atoms/ImageWithFallback";

export function OrderSummary({
    cartItems,
    subtotal,
    shipping,
    total,
    paymentMethod,
    onFinish,
    isProcessing,
    formatPrice,
}) {
    const discountPix = paymentMethod === "pix" ? subtotal * 0.05 : 0;
    const finalTotal = subtotal - discountPix + shipping;

    return (
        <Card className="p-6 sticky top-24">
            <h2 className="text-xl mb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                        <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm line-clamp-2 mb-1">
                                {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Qtd: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-primary">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                    </span>
                </div>
                {paymentMethod === "pix" && (
                    <div className="flex justify-between text-green-600">
                        <span>Desconto PIX (5%)</span>
                        <span>-{formatPrice(discountPix)}</span>
                    </div>
                )}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                    {formatPrice(finalTotal)}
                </span>
            </div>

            <Button
                onClick={onFinish}
                className="w-full h-12"
                disabled={isProcessing}
            >
                {isProcessing ? "Processando..." : "Finalizar Pedido"}
            </Button>
        </Card>
    );
}
