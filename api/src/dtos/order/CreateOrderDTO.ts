import { OrderStatus } from "../../common/enums/OrderStatus.js";

export interface CreateOrderDTO {
    userId: number;
    total: number;
    status: OrderStatus;
    paymentId: number;
}
