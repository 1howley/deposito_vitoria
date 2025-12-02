import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "../atoms/button";
import { toast } from "sonner";
// Importe os componentes refatorados
import { AddressForm } from "../molecules/AddressForm";
import { PaymentSelector } from "../molecules/PaymentSelector";
import { OrderSummary } from "../molecules/OrderSummary";

// Supondo que você tenha um serviço de API configurado (ex: axios)
// import api from "../../services/api";

export function CheckoutPage({ cartItems = [], onBack, onClearCart }) {
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: "",
        email: "",
        phone: "",
        document: "", // Adicionei CPF/CNPJ que é crucial para pagamentos
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

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 200 ? 0 : 25.0;
    const total = subtotal + shipping;

    const handleInputChange = (field, value) => {
        setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    const handleFinishOrder = async () => {
        // 1. Validação
        const missingFields = [];
        if (!deliveryInfo.name) missingFields.push("Nome");
        if (!deliveryInfo.document) missingFields.push("CPF"); // Validação extra
        if (!deliveryInfo.zipCode) missingFields.push("CEP");
        if (!deliveryInfo.address) missingFields.push("Endereço");
        if (!deliveryInfo.number) missingFields.push("Número");
        // ... adicione outros campos necessários

        if (missingFields.length > 0) {
            toast.error(`Preencha: ${missingFields.join(", ")}`);
            return;
        }

        setIsProcessing(true);

        try {
            // 2. Preparar Payload para o Backend (Spring Boot / Prisma)
            // Ajuste os nomes das chaves conforme seu DTO no Java
            const orderPayload = {
                customer: {
                    name: deliveryInfo.name,
                    email: deliveryInfo.email,
                    phone: deliveryInfo.phone,
                    document: deliveryInfo.document, // CPF é vital para boleto/pix
                },
                address: {
                    street: deliveryInfo.address,
                    number: deliveryInfo.number,
                    complement: deliveryInfo.complement,
                    neighborhood: deliveryInfo.neighborhood,
                    city: deliveryInfo.city,
                    state: deliveryInfo.state,
                    zipCode: deliveryInfo.zipCode,
                },
                items: cartItems.map((item) => ({
                    productId: item.id, // ID vindo do banco de dados
                    quantity: item.quantity,
                    unitPrice: item.price, // O backend deve validar isso, mas enviamos por segurança
                })),
                payment: {
                    method: paymentMethod.toUpperCase(), // 'PIX', 'CARD', 'BOLETO'
                    shippingCost: shipping,
                    subtotal: subtotal,
                    // Para gateways, muitas vezes enviamos o total em centavos (Integer)
                    totalAmountInCents: Math.round(
                        (paymentMethod === "pix"
                            ? total - subtotal * 0.05
                            : total) * 100
                    ),
                },
            };

            console.log("Enviando para API:", orderPayload);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            toast.success("Pedido criado! Redirecionando para pagamento...");

            if (onClearCart) onClearCart();
            // onBack(); ou navigate('/sucesso');
        } catch (error) {
            console.error("Erro ao processar:", error);
            toast.error("Erro ao processar pedido. Tente novamente.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            /* ... Seu código de Carrinho Vazio aqui (pode extrair para componente EmptyCart) ... */
            <div className="p-8 text-center">Carrinho Vazio</div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-10">
            <div className="border-b bg-white sticky top-0 z-10 mb-8">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Finalizar Compra
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os dados para concluir seu pedido
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <AddressForm
                            deliveryInfo={deliveryInfo}
                            onChange={handleInputChange}
                        />
                        <PaymentSelector
                            selectedMethod={paymentMethod}
                            onSelect={setPaymentMethod}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <OrderSummary
                            cartItems={cartItems}
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                            paymentMethod={paymentMethod}
                            onFinish={handleFinishOrder}
                            isProcessing={isProcessing}
                            formatPrice={formatPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
