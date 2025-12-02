export interface CreateOrderDTO {
    // Dados do Cliente (Necessário para AbacatePay emitir nota/boleto)
    customer: {
        name: string;
        email: string;
        taxId: string; // CPF ou CNPJ
        phone: string;
    };

    // Endereço de Entrega/Cobrança
    billingAddress: {
        zipCode: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        complement?: string;
    };

    // Lista de Itens (Para validar estoque e preço no backend)
    items: {
        id: number; // productId
        quantity: number;
        unitPrice?: number; // Opcional, o backend deve pegar o preço real do banco por segurança
    }[];

    // Metadados do Pagamento
    amount: number; // Total em centavos (Opcional, backend calcula, mas bom pra validar)
    paymentMethod: "PIX" | "BOLETO" | "CREDIT_CARD"; // Ajuste conforme os enums da AbacatePay
}