export interface PaymentMethods {
    id:             number;
    payment_method: string;
    bank:           string;
    phone:          string;
    account:          string;
    email:          string;
    identification: string;
    dojoId:         number;
}

export interface MonthlyPayments {
    id: number;
    amount: number;
    description?: string;
    dojoId: number;
}

export interface MonthlyPaymentBody {
    amount: number;
    description?: string;
}


//Body

export interface PaymentMethodBody {
    payment_method: string;
    bank: string;
    identification: string;

    account: string;
    phone: string;
    email: string;
}