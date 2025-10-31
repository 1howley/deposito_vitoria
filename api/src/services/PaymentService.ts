import prismaClient from "../prisma/index.js";
import type { CreatePaymentDTO } from "../dtos/payment/CreatePaymentDTO.js";
import type { UpdatePaymentDTO } from "../dtos/payment/UpdatePaymentDTO.js";

export class PaymentService {
    async createPayment(paymentData: CreatePaymentDTO) {
        return prismaClient.payment.create({
            data: paymentData,
        });
    }

    async getAllPayments() {
        return prismaClient.payment.findMany();
    }

    async getPaymentById(paymentId: number) {
        return prismaClient.payment.findUnique({
            where: { paymentId },
        });
    }

    async updatePayment(paymentId: number, paymentData: UpdatePaymentDTO) {
        return prismaClient.payment.update({
            where: { paymentId },
            data: paymentData,
        });
    }

    async deletePayment(paymentId: number) {
        return prismaClient.payment.delete({
            where: { paymentId },
        });
    }
}
