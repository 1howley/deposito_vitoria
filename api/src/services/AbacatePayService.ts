import axios from "axios";

const ABACATE_API_URL = "https://api.abacatepay.com/v1";
const API_KEY = process.env.ABACATE_PAY_API_KEY;

interface AbacateOrderPayload {
    amount: number;
    customer: {
        name: string;
        email: string;
        taxId: string;
        phone: string;
    };
    items: any[];
    orderId: number; // ADICIONADO: Precisamos saber qual é o pedido
}

export class AbacatePayService {
    async createBilling(payload: AbacateOrderPayload) {
        try {
            if (!API_KEY) {
                console.warn("⚠️ API Key não configurada. Usando Mock.");
                return {
                    paymentUrl: "https://abacatepay.com/pay/mock/" + Date.now(),
                    externalId: "mock_" + Date.now()
                };
            }

            const body = {
                frequency: "ONE_TIME",
                methods: ["PIX", "CREDIT_CARD", "BOLETO"],
                products: payload.items.map(item => ({
                    externalId: item.id.toString(),
                    name: `Produto ${item.id}`,
                    quantity: item.quantity,
                    price: Math.round(Number(item.unitPrice) * 100)
                })),
                amount: payload.amount,
                customer: {
                    name: payload.customer.name,
                    email: payload.customer.email,
                    taxId: payload.customer.taxId,
                    cellphone: payload.customer.phone // Abacate usa 'cellphone' ou 'phone'? Verifique doc, geralmente cellphone
                },
                // IMPORTANTE: Envia o ID do pedido no metadata para recuperarmos no webhook
                metadata: {
                    orderId: payload.orderId
                },
                urlCompletion: "http://localhost:5173/profile?section=orders" // Redirecionamento após pagto
            };

            const response = await axios.post(
                `${ABACATE_API_URL}/billing/create`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            
            return {
                paymentUrl: response.data.data.url,
                externalId: response.data.data.id
            };
        } catch (error: any) {
            console.error("Erro AbacatePay:", error.response?.data || error.message);
            throw new Error("Erro no gateway de pagamento");
        }
    }
}