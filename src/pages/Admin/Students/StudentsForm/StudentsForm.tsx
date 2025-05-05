import { SelectComponent } from "@/components/form/SelectComponent";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function StudentsForm() {

    const form = useForm({
        defaultValues: {
            picture: '',
            name: '',
            last_name: '',
            identification: '',
            sex: '',
            birthdate: '',
            email: '',
            phone: '',
            dojo: '',
            address: '',
            rank: '',
            martial_art: '',
        }
    });

    return (

        <Form {...form}>

            <div className="flex gap-4 mb-8">

                <div className="bg-white rounded-lg py-5 px-10 w-1/2 space-y-5">

                    <div className="space-y-2">
                        <Label>Foto</Label>

                    </div>

                    <div className="space-y-2">
                        <Label>Nombres</Label>
                        <Input type="text" />
                    </div>

                    <div className="space-y-2">
                        <Label>Apellidos</Label>
                        <Input type="text" />
                    </div>

                    <div className="space-y-2">
                        <Label>Cédula</Label>
                        <Input type="text" />
                    </div>

                    <div className="space-y-2">
                        <SelectComponent
                            form={form}
                            label="Sexo"
                            placeholder="Seleccione un sexo"
                            name="sex"
                            options={[
                                { label: 'Masculino', value: 'masculino' },
                                { label: 'Femenino', value: 'femenino' },
                            ]}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Fecha de Nacimiento</Label>
                        <Input type="text" />
                    </div>

                </div>

                <div className="bg-white rounded-lg py-5 px-10 w-1/2 space-y-5">

                    <div className="space-y-2">
                        <Label>Correo Electrónico</Label>
                        <Input type="text" />
                    </div>

                    <div className="space-y-2">
                        <Label>Teléfono</Label>
                        <Input type="text" />
                    </div>

                    <div className="space-y-2">
                        <SelectComponent
                            form={form}
                            label="Dojo"
                            placeholder="Seleccione una escuela"
                            name="dojo"
                            options={[
                                { label: 'Dojo Kenzendo', value: 'kenzendo' },
                                { label: 'Dojo Okikonbukan', value: 'docente' },
                                { label: 'Dojo Okinawakan', value: 'administrativo' },
                            ]}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Dirección</Label>
                        <Input type="text" />
                    </div>

                    <div className="space-y-2 grid grid-cols-2 gap-2">
                        <div className="w-1/2">
                            <SelectComponent
                                form={form}
                                label="Rango"
                                placeholder="Seleccione un rango"
                                name="rank"
                                options={[
                                    { label: 'Estudiante', value: 'estudiante' },
                                    { label: 'Docente', value: 'docente' },
                                    { label: 'Administrativo', value: 'administrativo' },
                                ]}
                            />
                        </div>

                        <div className="w-1/2">

                            <SelectComponent
                                form={form}
                                label="Arte Marcial"
                                placeholder="Seleccione un arte marcial"
                                name="martial_art"
                                options={[
                                    { label: 'Estudiante', value: 'estudiante' },
                                    { label: 'Docente', value: 'docente' },
                                    { label: 'Administrativo', value: 'administrativo' },
                                ]}
                            />
                        </div>
                    </div>

                </div>

            </div>

        </Form>

    );

}
