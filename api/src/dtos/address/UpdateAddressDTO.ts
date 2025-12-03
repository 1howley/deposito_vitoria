import { AddressType } from "../../common/enums/AddressType.js";

export interface UpdateAddressDTO {
    zipCode?: string;
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    neighborhood?: string;
    complement?: string;
    type?: AddressType;
}
