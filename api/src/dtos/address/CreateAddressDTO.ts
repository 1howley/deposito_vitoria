import { AddressType } from "../../common/enums/AddressType.js";

export interface CreateAddressDTO {
    clientId: string;
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    complement?: string;
    type: AddressType;
}
