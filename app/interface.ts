export interface FormData {
    'Full Name': string;
    'Email': string;
    'Gender': string;
}

export interface Field {
    id: number;
    name: string;
    fieldType: string;
    minLength?: number;
    maxLength?: number;
    defaultValue: string;
    required: boolean;
    listOfValues1?: string[];
}

export interface BaseData {
    'Full Name': string;
    'Email': string;
    'Gender': string;
}

