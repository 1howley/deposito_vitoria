import { PaymentStatus } from "../../common/enums/PaymentStatus.js";

export interface UpdatePaymentDTO {
    status?: PaymentStatus;
}
