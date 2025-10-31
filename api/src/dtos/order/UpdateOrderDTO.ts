import { OrderStatus } from "../../common/enums/OrderStatus.js";

export interface UpdateOrderDTO {
    status?: OrderStatus;
}
