import axios from "axios";

const ABACATE_API_URL = "https://api.abacatepay.com/v1"; // Verifique a URL correta na doc deles
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
    // Adicione outros campos necessários
}

export class AbacatePayService {
    async createBilling(payload: AbacateOrderPayload) {
        try {
            const response = await axios.post(
                `${ABACATE_API_URL}/billing/create`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            
            // Retorna a URL de pagamento e o ID da transação deles
            return {
                paymentUrl: response.data.data.url, // Ajuste conforme resposta real da API
                externalId: response.data.data.id
            };
        } catch (error: any) {
            console.error("Erro AbacatePay:", error.response?.data || error.message);
            throw new Error("Falha ao comunicar com gateway de pagamento");
        }
    }
}