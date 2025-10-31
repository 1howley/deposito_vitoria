import { AddressType } from "../../common/enums/AddressType.js";

export interface UpdateAddressDTO {
    zipCode?: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    complement?: string;
    type?: AddressType;
}
