import { useForm, useFieldArray } from "react-hook-form";
import { SelectComponent, SelectComponentForm } from "@/components/form/SelectComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { IMartialRanks, IStudentForm } from "./studentsForm.interface";
import { v4 as uuidv4 } from 'uuid';

export default function StudentsForm() {

    const [image, setImage] = useState<string | null>(null);
    const [ martialRanks, setMartialRanks ] = useState<IMartialRanks[]>([{
        id: uuidv4(), rank: '', martial_art: ''
    }]);

    const [martialArts, setMartialArts] = useState([
        {
            id: 1,
            label: 'Karatedo',
            value: 'karatedo'
        },
        {
            id: 2,
            label: 'Kobudo',
            value: 'kobudo'
        }
    ]);

    const [ranks, setRanks] = useState([
        {
            id: 1,
            label: 'Estudiante',
            value: 'estudiante'
        },
        {
            id: 2,
            label: 'Docente',
            value: 'docente'
        },
        {
            id: 3,
            label: 'Administrativo',
            value: 'administrativo'
        }
    ]);

    // UseForm
    const form = useForm<IStudentForm>({
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
            martialRanks: []
        }
    });

    function addMartialArt() {
        if (martialArts.length !== form.getValues("martialRanks").length) {
            setMartialRanks(prev => [...prev, { id: uuidv4(), rank: '', martial_art: '' }]);
        }
    }

    function removeField(item: IMartialRanks) {
        setMartialRanks(prev => prev.filter(field => field.id !== item.id));
        // form.setValue('martialRanks', fields.filter( field => field.id !== item.id));
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onChangeSelect = (value: string, index: number, field: string) => {
        const updatedFields = [...martialRanks];
        (updatedFields[index] as { [key: string]: any })[field] = value;
        setMartialRanks(updatedFields);
    }

    // Eliminar la foto
    const handleRemoveFoto = () => {
        setImage(null)
    }

    return (

        <Form {...form}>

            <div className="flex gap-4 mb-2">

                <div className="bg-white rounded-lg py-5 px-10 w-1/2 space-y-5">

                    <div className="space-y-2">

                        {/* image */}
                        <div className="space-y-2">
                            <Label>Foto</Label>
                            <div className="flex items-center gap-4">
                                {image ? (
                                    <div className="relative h-24 w-24">
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt="Foto del estudiante"
                                            className="h-24 w-24 rounded-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                                            onClick={handleRemoveFoto}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                        <Upload className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <Input id="foto" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    <Label
                                        htmlFor="foto"
                                        className="inline-flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                    >
                                        Subir Foto
                                    </Label>
                                    <p className="mt-1 text-xs text-gray-500">JPG, PNG o GIF. Máximo 1MB.</p>
                                </div>
                            </div>
                        </div>

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
                        <SelectComponentForm
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
                        <SelectComponentForm
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

                    <div className="border-2 p-5 rounded-lg space-y-4">

                        <div className="flex justify-between items-center">

                            <Label>Artes Marciales y Rangos</Label>
                            <Button
                                size={'sm'}
                                disabled={martialRanks.length >= martialArts.length}
                                className="text-xs cursor-pointer"
                                onClick={() => addMartialArt()}
                            >
                                Agregar Arte Marcial
                            </Button>

                        </div>

                        <div className="">
                            {martialRanks.map((field, index) => (
                                <div key={field.id} className='flex items-center gap-2'>
                                    <SelectComponent
                                        label={index === 0 ? "Arte Marcial" : ""}
                                        placeholder="Seleccione un arte marcial"
                                        options={martialArts}
                                        onChange={(value) => onChangeSelect(value, index, 'martial_art')}
                                        value={field.martial_art}
                                    />

                                    <SelectComponent
                                        label={index === 0 ? "Rango" : ""}
                                        placeholder="Seleccione un rango"
                                        options={ranks}
                                        onChange={(value) => onChangeSelect(value, index, 'rank')}
                                        value={field.rank}
                                        />

                                    {
                                        martialRanks.length >= 2 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="self-end w-20"
                                                onClick={() => removeField(field)}
                                            >
                                                <FiTrash2 />
                                            </Button>
                                        )
                                    }

                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" className="cursor-pointer">
                    Cancelar
                </Button>
                <Button type="submit" className="bg-red-700 hover:bg-red-800 cursor-pointer">
                    Guardar Estudiante
                </Button>
            </div>

        </Form>

    );

}
