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
    orderId: number;
}

export class AbacatePayService {
    private cleanNumber(value: string) {
        if (!value) return "";
        return value.replace(/\D/g, "");
    }

    async createBilling(payload: AbacateOrderPayload) {
        try {
            if (!API_KEY) {
                console.warn("⚠️ API Key não configurada. Usando Mock.");
                return {
                    paymentUrl: "https://abacatepay.com/pay/mock/" + Date.now(),
                    externalId: "mock_" + Date.now()
                };
            }

            const cleanTaxId = this.cleanNumber(payload.customer.taxId);
            const cleanPhone = this.cleanNumber(payload.customer.phone);

            if (cleanTaxId.length === 0 || cleanPhone.length === 0) {
                throw new Error("CPF ou Telefone inválidos (vazios após limpeza).");
            }

            // URL para onde o cliente volta (sucesso ou cancelamento)
            // Em produção, isso deve ser a URL real do seu site (ex: https://seu-site.com/...)
            const returnUrl = process.env.FRONTEND_URL 
                ? `${process.env.FRONTEND_URL}/profile?section=orders`
                : "http://localhost:5173/profile?section=orders";

            const body = {
                frequency: "ONE_TIME",
                // CORREÇÃO BASEADA NA DOC:
                // 1. Apenas "PIX" e "CARD" são permitidos.
                // 2. Removemos "BOLETO" e corrigimos "CREDIT_CARD" para "CARD".
                methods: ["PIX", "CARD"], 
                products: payload.items.map(item => ({
                    externalId: item.id.toString(),
                    name: `Produto ${item.id}`,
                    quantity: item.quantity,
                    price: Math.round(Number(item.unitPrice) * 100) // Centavos
                })),
                amount: payload.amount,
                customer: {
                    name: payload.customer.name,
                    email: payload.customer.email,
                    taxId: cleanTaxId,
                    cellphone: cleanPhone
                },
                metadata: {
                    orderId: payload.orderId
                },
                // CORREÇÃO: Ambos os campos são obrigatórios segundo a doc
                returnUrl: returnUrl,
                completionUrl: returnUrl
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
            console.error("❌ Erro Detalhado AbacatePay:", JSON.stringify(error.response?.data || error.message, null, 2));
            
            // Tratamento específico para erros de validação da API
            const errorData = error.response?.data;
            const errorMsg = errorData?.error || (errorData?.message ? errorData.message : "Falha na comunicação com o gateway de pagamento.");
            
            throw new Error(errorMsg);
        }
    }
}