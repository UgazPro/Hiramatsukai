import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useStudentsStore } from "@/stores/students.store";
import { useDojoMartialArts, useDojoRanks, useDojos } from "@/hooks/useDojos";
import { StudentFormValues, studentSchema } from "@/services/students/student.schema";
import { useCreateStudent, useUpdateStudent } from "@/queries/useStudentMutations";
import { useUserData } from "@/helpers/token";
import { useRoles } from "@/hooks/useStudents";
import { FormComponent } from "@/components/form/FormComponent";
import { studentLeftFields, studentMiddleFields, studentRightFields } from "./studentsForm.data";
import ProfilePictureComponent from "@/components/ProfilePictureComponent";
import MartialRanksComponent from "@/components/form/renderFormComponents/MartialRanksComponent";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StudentsForm() {

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data: dojoMartialArts = [] } = useDojoMartialArts();
    const { data: dojoRanks = [] } = useDojoRanks();
    const { data: dojos = [] } = useDojos();
    const { data: roles = [] } = useRoles();

    const user = useUserData();

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

            setImagePreview(selectedStudent.profileImg || null);
        }

    }, [mode, selectedStudent, roles, dojos]);

    const returnTitle = (code: string) => {
        const rename = code.slice(1);
        const grade = code[0]
        return `${rename} ${grade == 'K' ? 'Kyu' : 'Dan'}`
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

        <Form {...form}>

            <form onSubmit={form.handleSubmit(sendForm)}>

                <div className="grid grid-cols-3 gap-6 my-6">

                    {/* Left */}
                    <div className="space-y-4">
                        <FormComponent
                            form={form}
                            fields={studentLeftFields}
                            otherType={
                                <ProfilePictureComponent
                                    imagePreview={imagePreview}
                                    handleImageChange={handleImageChange}
                                    handleRemoveFoto={handleRemoveFoto}
                                />
                            }
                        />
                    </div>

                    {/* Middle */}
                    <FormComponent
                        form={form}
                        fields={studentMiddleFields}
                    />

                    {/* Right */}
                    <FormComponent
                        form={form}
                        fields={studentRightFields(
                            dojosOptions,
                            roles,
                            user?.rol.rol === "Administrador"
                        )}
                        otherType={
                            <MartialRanksComponent
                                dojoMartialArts={dojoMartialArts}
                                martialArtsOptions={martialArtsOptions}
                                ranksOptions={ranksOptions}
                                form={form}
                            />
                        }
                    />

                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button" variant="outline" className="cursor-pointer"
                        onClick={finishForm}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="bg-red-700 hover:bg-red-800 cursor-pointer"
                    >
                        {mode === "create" ? "Guardar Estudiante" : "Actualizar Estudiante"}
                    </Button>
                </div>

            </form>
        </Form>

    );

}
