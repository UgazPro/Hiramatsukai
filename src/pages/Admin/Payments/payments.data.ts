export interface IBank {
    bank: string
}

export const BankData: IBank[] = [
    { bank: '100 % Banco' },
    { bank: 'BANFANB' },
    { bank: 'Bancaribe' },
    { bank: 'Bancrecer' },
    { bank: 'Banesco' },
    { bank: 'Banco de Venezuela' },
    { bank: 'Banco del Tesoro' },
    { bank: 'Banco Fondo Común' },
    { bank: 'Banco Nacional de Crédito' },
    { bank: 'Banco Plaza' },
    { bank: 'Banco Venezolano de Crédito' },
    { bank: 'Banplus' },
    { bank: 'BBVA Provincial ' },
    { bank: 'Bicentenario' },
    { bank: 'Exterior' },
    { bank: 'Mercantil' }
];

export const methods = [
    { name: 'Transferencia', value: 'transferencia' },
    { name: 'Pago Móvil', value: 'pago_movil' },
    { name: 'Efectivo', value: 'efectivo' },
    { name: 'Zelle', value: 'zelle' },
]