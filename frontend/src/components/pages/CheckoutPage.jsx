import { useState } from "react";
import {
    ArrowLeft,
    CreditCard,
    Truck,
    ShoppingBag,
    CheckCircle,
} from "lucide-react";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Card } from "../atoms/card";
import { Separator } from "../atoms/separator";
import { Badge } from "../atoms/badge";
import { ImageWithFallback } from "../atoms/ImageWithFallback";
import { toast } from "sonner";

export function CheckoutPage({ cartItems = [], onBack, onClearCart }) {
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: "",
        email: "",
        phone: "",
        zipCode: "",
        address: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("pix");
    const [isProcessing, setIsProcessing] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 200 ? 0 : 25.0;
    const total = subtotal + shipping;

    const handleInputChange = (field, value) => {
        setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleFinishOrder = () => {
        // Validação básica
        const missingFields = [];
        if (!deliveryInfo.name) missingFields.push("Nome");
        if (!deliveryInfo.phone) missingFields.push("Telefone");
        if (!deliveryInfo.zipCode) missingFields.push("CEP");
        if (!deliveryInfo.address) missingFields.push("Endereço");
        if (!deliveryInfo.number) missingFields.push("Número");
        if (!deliveryInfo.neighborhood) missingFields.push("Bairro");
        if (!deliveryInfo.city) missingFields.push("Cidade");
        if (!deliveryInfo.state) missingFields.push("Estado");

        if (missingFields.length > 0) {
            toast.error(
                `Por favor, preencha os campos: ${missingFields.join(", ")}`
            );
            return;
        }

        setIsProcessing(true);

        // Simular processamento
        setTimeout(() => {
            setIsProcessing(false);
            toast.success(
                "Pedido realizado com sucesso! Em breve você receberá uma confirmação."
            );

            // Limpar carrinho e voltar
            if (onClearCart) onClearCart();

            setTimeout(() => {
                onBack();
            }, 1500);
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <Button variant="ghost" onClick={onBack} className="mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>

                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <ShoppingBag className="h-20 w-20 text-muted-foreground mb-4" />
                        <h2 className="text-2xl mb-2">Carrinho Vazio</h2>
                        <p className="text-muted-foreground mb-6">
                            Adicione produtos ao carrinho para finalizar sua
                            compra
                        </p>
                        <Button onClick={onBack}>Voltar às Compras</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b bg-white sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl mb-2">
                        Finalizar Compra
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os dados para concluir seu pedido
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Formulário de Entrega e Pagamento */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Dados Pessoais */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="font-semibold text-primary">
                                        1
                                    </span>
                                </div>
                                <h2 className="text-xl">Dados Pessoais</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <Label htmlFor="name">
                                        Nome Completo *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={deliveryInfo.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Seu nome completo"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={deliveryInfo.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Telefone *</Label>
                                    <Input
                                        id="phone"
                                        value={deliveryInfo.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Endereço de Entrega */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Truck className="h-5 w-5 text-primary" />
                                </div>
                                <h2 className="text-xl">Endereço de Entrega</h2>
                            </div>

                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="md:col-span-1">
                                    <Label htmlFor="zipCode">CEP *</Label>
                                    <Input
                                        id="zipCode"
                                        value={deliveryInfo.zipCode}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "zipCode",
                                                e.target.value
                                            )
                                        }
                                        placeholder="00000-000"
                                    />
                                </div>

                                <div className="md:col-span-3">
                                    <Label htmlFor="address">Endereço *</Label>
                                    <Input
                                        id="address"
                                        value={deliveryInfo.address}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Rua, Avenida..."
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <Label htmlFor="number">Número *</Label>
                                    <Input
                                        id="number"
                                        value={deliveryInfo.number}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "number",
                                                e.target.value
                                            )
                                        }
                                        placeholder="123"
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <Label htmlFor="complement">
                                        Complemento
                                    </Label>
                                    <Input
                                        id="complement"
                                        value={deliveryInfo.complement}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "complement",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Apto, Casa..."
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="neighborhood">
                                        Bairro *
                                    </Label>
                                    <Input
                                        id="neighborhood"
                                        value={deliveryInfo.neighborhood}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "neighborhood",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nome do bairro"
                                    />
                                </div>

                                <div className="md:col-span-3">
                                    <Label htmlFor="city">Cidade *</Label>
                                    <Input
                                        id="city"
                                        value={deliveryInfo.city}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "city",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nome da cidade"
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <Label htmlFor="state">Estado *</Label>
                                    <Input
                                        id="state"
                                        value={deliveryInfo.state}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "state",
                                                e.target.value
                                            )
                                        }
                                        placeholder="UF"
                                        maxLength={2}
                                    />
                                </div>
                            </div>

                            {shipping === 0 && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span className="text-green-700">
                                        Frete grátis para compras acima de R$
                                        200,00!
                                    </span>
                                </div>
                            )}
                        </Card>

                        {/* Forma de Pagamento */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                </div>
                                <h2 className="text-xl">Forma de Pagamento</h2>
                            </div>

                            <div className="space-y-3">
                                <div
                                    onClick={() => setPaymentMethod("pix")}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        paymentMethod === "pix"
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                    paymentMethod === "pix"
                                                        ? "border-primary"
                                                        : "border-border"
                                                }`}
                                            >
                                                {paymentMethod === "pix" && (
                                                    <div className="w-3 h-3 bg-primary rounded-full" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    PIX
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Pagamento instantâneo
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">
                                            5% de desconto
                                        </Badge>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod("card")}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        paymentMethod === "card"
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                paymentMethod === "card"
                                                    ? "border-primary"
                                                    : "border-border"
                                            }`}
                                        >
                                            {paymentMethod === "card" && (
                                                <div className="w-3 h-3 bg-primary rounded-full" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                Cartão de Crédito
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Em até 12x sem juros
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod("boleto")}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        paymentMethod === "boleto"
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                paymentMethod === "boleto"
                                                    ? "border-primary"
                                                    : "border-border"
                                            }`}
                                        >
                                            {paymentMethod === "boleto" && (
                                                <div className="w-3 h-3 bg-primary rounded-full" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                Boleto Bancário
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Vencimento em 3 dias úteis
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="lg:col-span-1">
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
                                                {formatPrice(
                                                    item.price * item.quantity
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Frete
                                    </span>
                                    <span
                                        className={
                                            shipping === 0
                                                ? "text-green-600"
                                                : ""
                                        }
                                    >
                                        {shipping === 0
                                            ? "Grátis"
                                            : formatPrice(shipping)}
                                    </span>
                                </div>
                                {paymentMethod === "pix" && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Desconto PIX (5%)</span>
                                        <span>
                                            -{formatPrice(subtotal * 0.05)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-semibold">Total</span>
                                <span className="text-2xl font-bold text-primary">
                                    {paymentMethod === "pix"
                                        ? formatPrice(
                                              subtotal -
                                                  subtotal * 0.05 +
                                                  shipping
                                          )
                                        : formatPrice(total)}
                                </span>
                            </div>

                            <Button
                                onClick={handleFinishOrder}
                                className="w-full h-12"
                                disabled={isProcessing}
                            >
                                {isProcessing
                                    ? "Processando..."
                                    : "Finalizar Pedido"}
                            </Button>

                            <div className="mt-4 p-3 bg-muted rounded-lg">
                                <p className="text-xs text-center text-muted-foreground">
                                    Ao finalizar, você concorda com nossos
                                    termos e condições de compra
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
