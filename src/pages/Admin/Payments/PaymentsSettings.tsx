import { Building2, CreditCard, Mail, Phone, Plus, UserCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyPaymentBody, MonthlyPayments, PaymentMethodBody, PaymentMethods } from "@/services/dojos/payments.interface";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BankData, methods } from "./payments.data";

interface PaymentsSettingsProps {
    monthlyPayments: MonthlyPayments[];
    paymentMethods: PaymentMethods[];
    isMonthlyPaymentsLoading: boolean;
    isPaymentMethodsLoading: boolean;
    onCreateMonthlyPayment?: (data: MonthlyPaymentBody) => void | Promise<void>;
    onCreatePaymentMethod?: (data: PaymentMethodBody) => void | Promise<void>;
}

export const PaymentsSettings = ({
    monthlyPayments,
    paymentMethods,
    isMonthlyPaymentsLoading,
    isPaymentMethodsLoading,
    onCreateMonthlyPayment,
    onCreatePaymentMethod,
}: PaymentsSettingsProps) => {
    const [monthlyFormOpen, setMonthlyFormOpen] = useState(false);
    const [paymentMethodFormOpen, setPaymentMethodFormOpen] = useState(false);


    const openMonthlyForm = () => {
        setMonthlyFormOpen(true);
    }

    const openPaymentMethodForm = () => {
        setPaymentMethodFormOpen(true);
    }

    const handleCreateMonthlyPayment = async (data: MonthlyPaymentBody) => {
        await onCreateMonthlyPayment?.(data);
        setMonthlyFormOpen(false);
    }

    const handleCreatePaymentMethod = async (data: PaymentMethodBody) => {
        await onCreatePaymentMethod?.(data);
        setPaymentMethodFormOpen(false);
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Planes del Dojo</CardTitle>
                        <CardDescription>
                            Información que verán los alumnos para realizar sus pagos.
                        </CardDescription>
                    </div>
                    <Button size="sm" onClick={openMonthlyForm} >
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Mensualidad
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {monthlyFormOpen && (
                    <MonthlyPaymentForm
                        onCancel={() => setMonthlyFormOpen(false)}
                        onSubmit={handleCreateMonthlyPayment}
                    />
                )}
                {isMonthlyPaymentsLoading ? (
                    <div className="space-y-3">
                        <div className="h-16 w-full rounded-md bg-gray-200 animate-pulse" />
                        <div className="h-16 w-full rounded-md bg-gray-200 animate-pulse" />
                    </div>
                ) : monthlyPayments.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay métodos de pago registrados.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {monthlyPayments.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="space-y-2 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-yellow-600" />
                                            <p className="font-semibold text-gray-900">Mensualidad</p>
                                        </div>
                                        <span className="text-gray-700 text-xs">{item.description}</span>
                                    </div>

                                    <div className="text-sm text-gray-700 space-y-2">
                                        <p className="font-semibold text-gray-900 text-xl">{item.amount}$</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Métodos de Pago del Dojo</CardTitle>
                        <CardDescription>
                            Información que verán los alumnos para realizar sus pagos.
                        </CardDescription>
                    </div>
                    <Button size="sm" onClick={openPaymentMethodForm}>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Método de Pago
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {paymentMethodFormOpen && (
                    <PaymentMethodForm
                        onCancel={() => setPaymentMethodFormOpen(false)}
                        onSubmit={handleCreatePaymentMethod}
                    />
                )}

                {isPaymentMethodsLoading ? (
                    <div className="space-y-3">
                        <div className="h-16 w-full rounded-md bg-gray-200 animate-pulse" />
                        <div className="h-16 w-full rounded-md bg-gray-200 animate-pulse" />
                    </div>
                ) : paymentMethods.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay métodos de pago registrados.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                            <Card key={method.id}>
                                <CardContent className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-yellow-600" />
                                        <p className="font-semibold text-gray-900">{method.payment_method}</p>
                                    </div>

                                    <div className="text-sm text-gray-700 space-y-2">
                                        {method.bank && (
                                            <p className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-gray-500" />
                                                {method.bank}
                                            </p>
                                        )}
                                        {method.identification && (
                                            <p className="flex items-center gap-2">
                                                <UserCircle className="h-4 w-4 text-gray-500" />
                                                {method.identification}
                                            </p>
                                        )}
                                        {method.phone !== "" && (
                                            <p className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                {method.phone}
                                            </p>
                                        )}
                                        {method.email !== "" && (
                                            <p className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                {method.email}
                                            </p>
                                        )}
                                        {method.account !== "" && (
                                            <p className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                {method.account}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


interface MonthlyPaymentFormProps {
    onSubmit: (data: MonthlyPaymentBody) => void | Promise<void>;
    onCancel: () => void;
}

const MonthlyPaymentForm = ({ onSubmit, onCancel }: MonthlyPaymentFormProps) => {
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!amount) return;

        await onSubmit({
            amount: Number(amount),
            description,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4 mb-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="monthly-amount">Precio</Label>
                <Input
                    id="monthly-amount"
                    type="number"
                    min={0}
                    step={0.01}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ej. 25"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="monthly-description">Descripción</Label>
                <Textarea
                    id="monthly-description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el plan mensual"
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">
                    Guardar mensualidad
                </Button>
            </div>
        </form>
    )
}


interface PaymentMethodFormProps {
    onSubmit: (data: PaymentMethodBody) => void | Promise<void>;
    onCancel: () => void;
}

const PaymentMethodForm = ({ onSubmit, onCancel }: PaymentMethodFormProps) => {
    const [formData, setFormData] = useState<PaymentMethodBody>({
        payment_method: "",
        bank: "",
        identification: "",
        account: "",
        phone: "",
        email: "",
    });

    const updateField = <K extends keyof PaymentMethodBody>(field: K, value: PaymentMethodBody[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4 mb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Método de pago</Label>
                    <Select
                        value={formData.payment_method}
                        onValueChange={(value) => updateField("payment_method", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un método" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {methods.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Banco</Label>
                    <Select
                        value={formData.bank}
                        onValueChange={(value) => updateField("bank", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un banco" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {BankData.map((item) => (
                                    <SelectItem key={item.bank} value={item.bank}>{item.bank}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="payment-identification">Identificación</Label>
                    <Input
                        id="payment-identification"
                        value={formData.identification}
                        onChange={(e) => updateField("identification", e.target.value)}
                        placeholder="Ej. V-12345678"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="payment-account">Cuenta</Label>
                    <Input
                        id="payment-account"
                        value={formData.account}
                        onChange={(e) => updateField("account", e.target.value)}
                        placeholder="Número de cuenta"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="payment-phone">Teléfono</Label>
                    <Input
                        id="payment-phone"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Ej. 0412xxxxxxx"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="payment-email">Email</Label>
                    <Input
                        id="payment-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="correo@dominio.com"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={!formData.payment_method || !formData.bank}>
                    Guardar método
                </Button>
            </div>
        </form>
    )
}