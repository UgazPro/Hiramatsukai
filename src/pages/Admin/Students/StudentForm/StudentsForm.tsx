import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Loader } from "@/components/spinner/Loader";
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
    step2Col1Fields,
    step2Col2Fields,
    step2Col3Fields,
} from "../../../../services/students/studentsForm.data";
import ProfilePictureComponent from "@/components/ProfilePictureComponent";
import MartialRanksComponent from "@/components/form/renderFormComponents/MartialRanksComponent";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StudentsForm() {

    const { data: dojoMartialArts = [] } = useDojoMartialArts();
    const { data: dojoRanks = [] } = useDojoRanks();
    const { data: dojos = [] } = useDojos();
    const { data: roles = [] } = useRoles();

    const user = useUserData();

    const { selectedStudent, mode, finishForm } = useStudentsStore();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isFormLoading, setIsFormLoading] = useState(true);
    const prevDojoId = useRef<number | null>(null);

    const { mutateAsync: createStudent, isPending: isCreatePending } = useCreateStudent();
    const { mutateAsync: updateStudent, isPending: isUpdatePending } = useUpdateStudent();

    const isSubmitting = isCreatePending || isUpdatePending;

    const filteredRoles = useMemo(
        () => roles.filter(r => r.rol === "Estudiante" || r.rol === "Representante"),
        [roles]
    );

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
            rolId: filteredRoles[0]?.id ?? 0,
            profileImg: '',
            birthday: new Date(),
            enrollmentDate: new Date(),
            martialArtRank: [{ martialArtId: 0, rankId: 0 }],
        }
    });

    useEffect(() => {
        if (mode === "create") {
            if (!dojos.length) return;
            setIsFormLoading(false);
            return;
        }

        if (!selectedStudent || mode !== "edit") return;
        if (!filteredRoles.length || !dojos.length) return;

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

        setIsFormLoading(false);

    }, [mode, selectedStudent, filteredRoles, dojos]);

    const returnTitle = (code: string) => {
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

        if (mode === "create") {
            await createStudent({ data: payload, imageFile });
        } else {
            await updateStudent({
                data: { ...payload, id: selectedStudent!.id },
                imageFile
            });
        }

        finishForm();
    };

    if (isFormLoading || isSubmitting) {
        return (
            <div className="p-4 w-full">
                <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px]">
                    <Loader size="lg" message="Cargando..." />
                </div>
            </div>
        );
    }

    return (

        <div className="p-4 w-full">
            <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">

                {/* Header */}
                <div className="bg-linear-to-r from-yellow-50 to-red-50 border-b border-gray-200 px-6 py-4">
                    <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between items-center">
                        <div className="md:order-1 order-2">
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
                            className="mb-3 text-gray-600 hover:text-gray-900 md:order-2 order-1"
                            onClick={finishForm}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </div>
                </div>

                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(sendForm)}>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {/* Col 1: username, name, lastName, identification + ProfilePicture */}
                                <div className="space-y-4">
                                    <FormComponent
                                        form={form}
                                        fields={step1Col1Fields}
                                        className="!p-4 !space-y-3"
                                    />
                                    <ProfilePictureComponent
                                        imagePreview={imagePreview}
                                        handleImageChange={handleImageChange}
                                        handleRemoveFoto={handleRemoveFoto}
                                    />
                                </div>

                                {/* Col 2: birthday, sex, email, phone + address */}
                                <FormComponent
                                    form={form}
                                    fields={[
                                        ...step1Col2Fields,
                                        { type: "textarea", name: "address", label: "Dirección" },
                                    ]}
                                    className="!p-4 !space-y-3"
                                />

                                {/* Col 3: dojoId, rolId, enrollmentDate + MartialRanks */}
                                <FormComponent
                                    form={form}
                                    fields={[
                                        ...(
                                            mode === "edit"
                                                ? step2Col1Fields(dojosOptions, roles, user?.rol.rol === "Administrador").map(f =>
                                                    f.name === "rolId" ? { ...f, disabled: true } : f
                                                )
                                                : step2Col1Fields(dojosOptions, filteredRoles, user?.rol.rol === "Administrador")
                                        ),
                                        ...(mode === "edit"
                                            ? step2Col2Fields.map(f =>
                                                f.name === "enrollmentDate" ? { ...f, disabled: true } : f
                                            )
                                            : step2Col2Fields
                                        ),
                                        ...step2Col3Fields,
                                    ]}
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

                            {/* Footer */}
                            <div className="flex lg:justify-end items-center justify-between  pt-5 border-t border-gray-200 mt-5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={finishForm}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-red-700 hover:bg-red-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting
                                        ? (mode === "create" ? "Guardando..." : "Actualizando...")
                                        : (mode === "create" ? "Guardar" : "Actualizar")
                                    }
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>

    );

}
