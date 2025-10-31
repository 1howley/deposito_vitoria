import { PaymentMethod } from "../../common/enums/PaymentMethod.js";
import { PaymentStatus } from "../../common/enums/PaymentStatus.js";

export interface CreatePaymentDTO {
    orderId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
}
