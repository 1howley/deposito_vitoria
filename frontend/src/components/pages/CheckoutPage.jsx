import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../atoms/button";
import { toast } from "sonner";
import { useOutletContext, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth"; // Importante para o Token

import { AddressForm } from "../molecules/AddressForm";
import { PaymentSelector } from "../molecules/PaymentSelector";
import { OrderSummary } from "../molecules/OrderSummary";
import { api } from "../../services";

export function CheckoutPage() {
    const navigate = useNavigate();
    const { firebaseUser } = useAuth(); // Pega o usuário logado

    const context = useOutletContext();
    const rawCartItems = context?.cartItems || [];
    const clearCart = context?.clearCart || (() => {});

    // 1. Normaliza os itens (Garante que preço seja número e não NaN)
    const cartItems = rawCartItems.map((item) => {
        const realPrice = Number(item.price) || Number(item.basePrice) || 0;
        return { ...item, price: realPrice };
    });

    const [deliveryInfo, setDeliveryInfo] = useState({
        name: "", email: "", phone: "", document: "",
        zipCode: "", address: "", number: "", complement: "",
        neighborhood: "", city: "", state: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("pix");
    const [isProcessing, setIsProcessing] = useState(false);

    // Cálculos
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 25.0;
    const total = subtotal + shipping;

    const handleInputChange = (field, value) => {
        setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
    };

    const handleFinishOrder = async () => {
        // Validações
        if (!deliveryInfo.name || !deliveryInfo.document || !deliveryInfo.address) {
            toast.error("Preencha os campos obrigatórios (Nome, CPF, Endereço).");
            return;
        }

        if (!firebaseUser) {
            toast.error("Você precisa estar logado.");
            navigate("/login");
            return;
        }

        setIsProcessing(true);

        try {
            // Pega o token atualizado do Firebase
            const token = await firebaseUser.getIdToken();

            // 2. Monta o objeto de dados (Payload)
            const orderPayload = {
                customer: {
                    name: deliveryInfo.name,
                    email: deliveryInfo.email,
                    phone: deliveryInfo.phone,
                    taxId: deliveryInfo.document,
                },
                billingAddress: {
                    street: deliveryInfo.address,
                    number: deliveryInfo.number,
                    complement: deliveryInfo.complement,
                    neighborhood: deliveryInfo.neighborhood,
                    city: deliveryInfo.city,
                    state: deliveryInfo.state,
                    zipCode: deliveryInfo.zipCode,
                },
                items: cartItems.map((item) => ({
                    id: item.productId || item.id,
                    quantity: item.quantity,
                    unitPrice: item.price
                })),
                amount: Math.round((paymentMethod === "pix" ? total - subtotal * 0.05 : total) * 100),
                paymentMethod: paymentMethod.toUpperCase() === "CARD" ? "CREDIT_CARD" : paymentMethod.toUpperCase(),
            }; // <--- O OBJETO TERMINA AQUI. PONTO E VÍRGULA IMPORTANTE!

            // 3. Envia para o Backend (AGORA FORA DO OBJETO)
            const response = await api.post("/orders", orderPayload, {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token para o backend saber quem é
                }
            });

            const { paymentUrl } = response.data;

            toast.success("Pedido realizado! Redirecionando...");
            clearCart();

            // 4. Redireciona para o pagamento
            if (paymentUrl) {
                window.location.href = paymentUrl;
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Erro ao processar:", error);
            const msg = error.response?.data?.message || "Erro ao processar pedido.";
            toast.error(msg);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
                <h2 className="text-2xl font-bold text-muted-foreground mb-4">Seu carrinho está vazio</h2>
                <Button onClick={() => navigate('/')}>Voltar para a Loja</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-10">
            <div className="border-b bg-white sticky top-0 z-10 mb-8">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
                    <p className="text-muted-foreground">Confira seus itens e dados de entrega</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <AddressForm deliveryInfo={deliveryInfo} onChange={handleInputChange} />
                        <PaymentSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
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