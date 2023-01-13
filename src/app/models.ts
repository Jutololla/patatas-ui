export interface Technician{
    id: number;
    full_name: string;
    id_number: number;
    phone_number: string;
    email_address: string;
    positon_name: string;
    resources?: Resource[];
}

export interface Resource{
    id: string,
    type: ResourceType,
    details:string,
    userIdAssigned:string
}

export enum ResourceType{
    Computer, Cellphone, Money, Chair, Desk, Headset
}