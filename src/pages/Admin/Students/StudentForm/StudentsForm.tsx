import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useStudentsStore } from "@/stores/students.store";
import { useDojoMartialArts, useDojoRanks, useDojos } from "@/hooks/useDojos";
import { StudentFormValues, studentSchema } from "@/services/students/student.schema";
import { useCreateStudent, useUpdateStudent } from "@/queries/useStudentMutations";
import { useUserData } from "@/helpers/token";
import { useRoles } from "@/hooks/useStudents";
import { FormComponent } from "@/components/form/FormComponent";
import {
    step1Col1Fields,
    step1Col2Fields,
    step1Col3Fields,
    step2Col1Fields,
    step2Col2Fields,
    step2Col3Fields,
} from "../../../../services/students/studentsForm.data";
import ProfilePictureComponent from "@/components/ProfilePictureComponent";
import MartialRanksComponent from "@/components/form/renderFormComponents/MartialRanksComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepDot } from "@/components/stepper/StepDot";

export default function StudentsForm() {

    const [step, setStep] = useState<1 | 2>(1);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const prevDojoId = useRef<number | null>(null);

    const { data: dojoMartialArts = [] } = useDojoMartialArts();
    const { data: dojoRanks = [] } = useDojoRanks();
    const { data: dojos = [] } = useDojos();
    const { data: roles = [] } = useRoles();

    const user = useUserData();

    // const { selectedStudent, mode, finishForm, setScreen } = useStudentsStore();
    const { selectedStudent, mode, finishForm } = useStudentsStore();

    const { mutateAsync: createStudent } = useCreateStudent();
    const { mutateAsync: updateStudent } = useUpdateStudent();

    const form = useForm<StudentFormValues>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            identification: '',
            sex: '',
            name: '',
            lastName: '',
            email: '',
            username: '',
            address: '',
            phone: '',
            dojoId: user?.dojoId || 0,
            rolId: roles[0]?.id ?? 0,
            profileImg: '',
            birthday: new Date(),
            enrollmentDate: new Date(),
            martialArtRank: [{ martialArtId: 0, rankId: 0 }],
        }
    });

    useEffect(() => {

        if (!selectedStudent || mode !== "edit") return;
        if (!roles.length || !dojos.length) return;

        if (mode === "edit" && selectedStudent) {
            form.reset({
                identification: selectedStudent.identification,
                name: selectedStudent.name,
                lastName: selectedStudent.lastName,
                email: selectedStudent.email,
                username: selectedStudent.username,
                address: selectedStudent.address,
                phone: selectedStudent.phone,
                sex: selectedStudent.sex,
                dojoId: selectedStudent.dojoId,
                rolId: selectedStudent.rolId,
                birthday: new Date(selectedStudent.birthday),
                enrollmentDate: new Date(selectedStudent.enrollmentDate),
                martialArtRank: selectedStudent.userRanks.map(r => ({
                    martialArtId: r.martialArt.id,
                    rankId: r.rank.id,
                })),
            });
        }

    }, [mode, selectedStudent, roles, dojos]);

    const returnTitle = (code: string) => {
        // const rename = code.slice(1);
        // const grade = code[0]
        return code
    }

    const dojosOptions = dojos.filter(dojo => user?.rol.rol === "Administrador" ? dojos.map(d => d) : dojo.id === user?.dojoId).map(d => ({ label: d.dojo, value: d.id }));

    const martialArtsOptions = dojoMartialArts.map(ma => ({
        label: ma.martialArt,
        value: ma.id
    }));

    const ranksOptions = dojoRanks.map(rank => ({
        label: `${returnTitle(rank.code)} ${rank.belt} ${rank.rank_name}`,
        value: Number(rank.id),
        martialArtId: rank.martialArtId
    }));

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("El archivo debe ser una imagen");
            return;
        }

        if (file.size > 1024 * 1024) {
            alert("La imagen no puede superar 1MB");
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveFoto = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleNext = async () => {
        const valid = await form.trigger([
            "username",
            "name",
            "lastName",
            "identification",
            "birthday",
            "sex",
            "email",
            "phone",
            "address",
        ]);
        if (valid) setStep(2);
    };

    const handlePrev = () => setStep(1);

    const watchedDojoId = form.watch("dojoId");

    useEffect(() => {
        if (mode === "edit" && selectedStudent && prevDojoId.current === null) {
            prevDojoId.current = watchedDojoId;
            return;
        }

        if (prevDojoId.current !== null && prevDojoId.current !== watchedDojoId) {
            form.setValue("martialArtRank", [{ martialArtId: 0, rankId: 0 }]);
        }

        prevDojoId.current = watchedDojoId;
    }, [watchedDojoId]);

    const selectedDojo = dojos.find(d => d.id === form.watch("dojoId"));
    const filteredDojoMartialArts = selectedDojo?.dojoMartialArts ?? [];

    const sendForm = async (data: StudentFormValues) => {

        console.log(data);

        const payload = {
            ...(mode === "edit" && selectedStudent?.id ? { id: selectedStudent.id } : {}),
            identification: data.identification,
            sex: data.sex,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            address: data.address,
            phone: data.phone,
            dojoId: data.dojoId,
            rolId: data.rolId,
            birthday: data.birthday,
            enrollmentDate: data.enrollmentDate,
            martialArtRank: data.martialArtRank.filter(m => m.martialArtId > 0 && m.rankId > 0),
        };

        console.log(payload);

        if (mode === "create") {
            await createStudent({ data: payload, imageFile });
        } else {
            await updateStudent({
                data: { ...payload, id: selectedStudent!.id },
                imageFile
            });
        }


        console.log(payload);

        finishForm();
    };

    return (

        <div className="p-6 w-full max-w-5xl mx-auto">
            <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">

                {/* Header */}
                <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {mode === "create" ? "Nuevo Estudiante" : "Editar Estudiante"}
                            </h2>
                            <p className="text-sm text-gray-600 mt-0.5">
                                {mode === "create"
                                    ? "Complete los campos para agregar un nuevo estudiante al dojo"
                                    : "Modifique los campos del estudiante"}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mb-3 text-gray-600 hover:text-gray-900"
                            onClick={finishForm}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </div>
                </div>

                {/* Stepper */}
                <div className="px-6 pt-5 pb-3 border-b border-gray-200">
                    <div className="flex items-center justify-center gap-3">
                        <StepDot number={1} active={step === 1} completed={step === 2} label="Datos Personales" />
                        <div className={`h-0.5 w-16 ${step === 2 ? "bg-linear-to-r from-amber-500 to-red-500" : "bg-gray-200"}`} />
                        <StepDot number={2} active={step === 2} completed={false} label="Datos del Dojo" />
                    </div>
                </div>

                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(sendForm)}>

                            {/* === Paso 1: Datos Personales === */}
                            {step === 1 && (
                                <div className="grid grid-cols-3 gap-4">

                                    <FormComponent
                                        form={form}
                                        fields={step1Col1Fields}
                                        className="!p-4 !space-y-3"
                                    />

                                    <FormComponent
                                        form={form}
                                        fields={step1Col2Fields}
                                        className="!p-4 !space-y-3"
                                    />

                                    <FormComponent
                                        form={form}
                                        fields={step1Col3Fields}
                                        className="!p-4 !space-y-3"
                                        otherType={
                                            <ProfilePictureComponent
                                                imagePreview={imagePreview}
                                                handleImageChange={handleImageChange}
                                                handleRemoveFoto={handleRemoveFoto}
                                            />
                                        }
                                    />

                                </div>
                            )}

                            {/* === Paso 2: Datos del Dojo === */}
                            {step === 2 && (
                                <div className="grid grid-cols-3 gap-4">

                                    <FormComponent
                                        form={form}
                                        fields={step2Col1Fields(
                                            dojosOptions,
                                            roles,
                                            user?.rol.rol === "Administrador"
                                        )}
                                        className="!p-4 !space-y-3"
                                    />

                                    <FormComponent
                                        form={form}
                                        fields={step2Col2Fields}
                                        className="!p-4 !space-y-3"
                                    />

                                    <FormComponent
                                        form={form}
                                        fields={step2Col3Fields}
                                        className="!p-4 !space-y-3"
                                        otherType={
                                            <MartialRanksComponent
                                                dojoMartialArts={filteredDojoMartialArts}
                                                martialArtsOptions={martialArtsOptions}
                                                ranksOptions={ranksOptions}
                                                form={form}
                                            />
                                        }
                                    />

                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-5 border-t border-gray-200 mt-5">
                                <div>
                                    {step === 2 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={handlePrev}
                                        >
                                            ← Atrás
                                        </Button>
                                    )}
                                </div>
                                <div className="flex space-x-4">
                                    {step === 1 && (
                                        <>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="cursor-pointer"
                                                onClick={finishForm}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white cursor-pointer"
                                                onClick={handleNext}
                                            >
                                                Siguiente →
                                            </Button>
                                        </>
                                    )}
                                    {step === 2 && (
                                        <Button
                                            type="submit"
                                            className="bg-red-700 hover:bg-red-800 cursor-pointer"
                                        >
                                            {mode === "create" ? "Guardar Estudiante" : "Actualizar Estudiante"}
                                        </Button>
                                    )}
                                </div>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>

    );

}
