import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ImagePlus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormComponent } from "@/components/form/FormComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/spinner/Loader";
import { useDojosStore } from "@/stores/dojos.store";
import { useUserData } from "@/helpers/token";
import { useCreateDojo, useDojoMartialArts, useDojos, useDojosInfo, useLinkDojoParent, useUpdateDojoInfo } from "@/hooks/useDojos";
import { getDojoDescendants, useVisibleDojos } from "@/hooks/useFilteredDojos";
import { dojoLeftFields, dojoRightFields } from "@/services/dojos/dojosForm.data";
import { DojoFormValues, DojoSchema } from "@/services/dojos/dojo.schema";
import { DojoBody } from "@/services/dojos/dojo.interface";
import { IOptions } from "@/components/form/renderFormComponents/SelectComponent";

const imageInputClass =
    "h-11 rounded-lg border-input transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/40 file:mr-2 file:text-sm sm:h-9";

const getDojoLogo = (logo: string) => `${import.meta.env.VITE_API_URL}/api${logo}`;

interface DojoResponse {
    success?: boolean;
    message?: string;
    statusCode?: number;
    data?: { id: number };
}

export default function DojoForm() {

    const { data: dojos = [] } = useDojos();
    const { data: martialArts = [] } = useDojoMartialArts();

    const { mode, selectedDojo, finishForm } = useDojosStore();

    const user = useUserData();
    const isAdmin = user?.roles?.some(({ rol }) => rol === "Administrador");
    const userDojoId = user?.dojo?.id;

    const visibleDojos = useVisibleDojos(dojos);

    const { mutateAsync: createDojo, isPending: isCreating } = useCreateDojo();
    const { mutateAsync: updateDojo, isPending: isUpdating } = useUpdateDojoInfo();
    const { mutateAsync: linkParent } = useLinkDojoParent();

    const { data: fullInfo, isLoading: isFullInfoLoading } = useDojosInfo(
        mode === "edit" && selectedDojo ? selectedDojo.code : "",
    );

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const form = useForm<DojoFormValues>({
        resolver: zodResolver(DojoSchema),
        defaultValues: {
            dojo: "",
            code: "",
            address: "",
            addressShort: "",
            phone: "",
            email: "",
            description: "",
            founded: new Date(),
            slogan: "",
            translate: "",
            latitude: 0,
            longitude: 0,
            martialArts: [],
            parentDojoId: isAdmin ? 0 : userDojoId ?? 0,
            socialMedia: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socialMedia",
    });

    const martialArtsOptions: IOptions[] = useMemo(
        () => martialArts.map((ma) => ({ label: ma.martialArt, value: ma.id })),
        [martialArts],
    );

    const parentOptions: IOptions[] = useMemo(() => {
        const excluded = new Set<number>();

        if (selectedDojo) {
            excluded.add(selectedDojo.id);
            getDojoDescendants(selectedDojo.id, visibleDojos).forEach((id) => excluded.add(id));
        }

        if (isAdmin) {
            const eligible = dojos.filter((d) => !excluded.has(d.id));
            return [
                { label: "Sin dojo padre", value: 0 },
                ...eligible.map((d) => ({ label: d.dojo, value: d.id })),
            ];
        }

        const eligible = visibleDojos.filter((d) => !excluded.has(d.id));
        return eligible.map((d) => ({ label: d.dojo, value: d.id }));
    }, [isAdmin, selectedDojo, dojos, visibleDojos]);

    useEffect(() => {
        if (mode !== "edit" || !selectedDojo || !fullInfo) return;

        form.reset({
            dojo: fullInfo.dojo,
            code: fullInfo.code,
            address: fullInfo.address,
            addressShort: fullInfo.addressShort,
            phone: fullInfo.phone,
            email: fullInfo.email,
            description: fullInfo.description,
            founded: new Date(fullInfo.founded),
            slogan: fullInfo.slogan,
            translate: fullInfo.translate,
            latitude: fullInfo.latitude,
            longitude: fullInfo.longitude,
            martialArts: fullInfo.dojoMartialArts.map((ma) => ma.id),
            parentDojoId: fullInfo.parentDojoId ?? 0,
            socialMedia: fullInfo.socialMedia?.map((sm) => ({
                socialMedia: sm.socialMedia,
                link: sm.link,
                directUrl: sm.directUrl ?? "",
            })) ?? [],
        });
    }, [mode, selectedDojo, fullInfo, form]);

    const logoPreview = logoFile
        ? URL.createObjectURL(logoFile)
        : mode === "edit" && (fullInfo?.logo || selectedDojo?.logo)
            ? getDojoLogo(fullInfo?.logo || selectedDojo!.logo)
            : "";

    const bannerPreview = bannerFile
        ? URL.createObjectURL(bannerFile)
        : "";

    const handleResponse = (res: unknown, okMessage: string): boolean => {
        const r = res as DojoResponse | undefined;

        if (r?.success === false) {
            toast.error(r.message ?? "Ocurrió un error");
            return false;
        }

        if (r?.statusCode && r.statusCode >= 400) {
            toast.error(r.message ?? "Ocurrió un error");
            return false;
        }

        toast.success(r?.message ?? okMessage);
        return true;
    };

    const sendForm = async (data: DojoFormValues) => {
        const parentDojoId = data.parentDojoId && data.parentDojoId > 0 ? data.parentDojoId : null;

        const payload: DojoBody = {
            dojo: data.dojo,
            address: data.address,
            addressShort: data.addressShort,
            code: data.code,
            phone: data.phone,
            email: data.email,
            description: data.description,
            founded: data.founded,
            slogan: data.slogan,
            translate: data.translate,
            latitude: data.latitude,
            longitude: data.longitude,
            martialArts: data.martialArts,
            socialMedia: data.socialMedia.map((sm) => ({
                socialMedia: sm.socialMedia,
                link: sm.link,
                directUrl: sm.directUrl ?? "",
            })),
        };

        if (mode === "create") {
            if (!logoFile) {
                toast.error("El logo es obligatorio");
                return;
            }

            const res = await createDojo({ dojoInfo: payload, logo: logoFile, banner: bannerFile });
            if (!handleResponse(res, "Dojo creado correctamente")) return;

            const newDojoId = (res as DojoResponse | undefined)?.data?.id;

            if (newDojoId != null && parentDojoId != null) {
                const linkRes = await linkParent({ dojoId: newDojoId, parentDojoId });
                if (linkRes?.success === false || (linkRes?.statusCode && linkRes.statusCode >= 400)) {
                    toast.error(linkRes?.message ?? "No se pudo enlazar el dojo padre");
                }
            }
        } else {
            if (!selectedDojo) return;

            const res = await updateDojo({
                dojoId: selectedDojo.id,
                dojoInfo: payload,
                logo: logoFile,
                banner: bannerFile,
            });
            if (!handleResponse(res, "Dojo actualizado correctamente")) return;

            const currentParent = selectedDojo.parentDojoId ?? null;

            if (currentParent !== parentDojoId) {
                const linkRes = await linkParent({ dojoId: selectedDojo.id, parentDojoId });
                if (linkRes?.success === false || (linkRes?.statusCode && linkRes.statusCode >= 400)) {
                    toast.error(linkRes?.message ?? "No se pudo actualizar el dojo padre");
                }
            }
        }

        finishForm();
    };

    if (isCreating || isUpdating) {
        return (
            <div className="mx-auto my-3 w-full max-w-5xl p-3 sm:my-6 sm:p-6">
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl flex items-center justify-center min-h-[400px]">
                    <Loader size="lg" message={isUpdating ? "Actualizando dojo..." : "Guardando dojo..."} />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto my-3 w-full max-w-5xl p-3 sm:my-6 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">

                <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold text-foreground sm:text-xl">
                                {mode === "create" ? "Nuevo Dojo" : "Editar Dojo"}
                            </h2>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                {mode === "create"
                                    ? "Complete los campos para agregar un nuevo dojo"
                                    : "Modifique los campos del dojo"}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            className="h-11 shrink-0 self-start text-muted-foreground hover:text-foreground sm:h-9"
                            onClick={finishForm}
                        >
                            <ArrowLeft data-icon="inline-start" />
                            Volver
                        </Button>
                    </div>
                </div>

                <div className="p-5">

                    {mode === "edit" && isFullInfoLoading && !fullInfo ? (
                        <div className="flex items-center justify-center min-h-[300px]">
                            <Loader size="lg" message="Cargando información del dojo..." />
                        </div>
                    ) : (
                        <Form {...form}>

                            <form onSubmit={form.handleSubmit(sendForm, (errors) => console.error("Errores de validación:", errors))}>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">

                                    <FormComponent
                                        form={form}
                                        fields={dojoLeftFields()}
                                    />

                                    <FormComponent
                                        form={form}
                                        fields={dojoRightFields(parentOptions, martialArtsOptions)}
                                    />

                                </div>

                                {/* Images */}
                                <div className="mt-6 flex flex-col gap-5 rounded-xl border border-border bg-card p-3 shadow-sm sm:p-6">
                                    <div className="flex flex-col md:flex-row gap-6">

                                        <div className="flex-1 space-y-2">
                                            <Label className="text-sm font-medium text-brand-indigo">
                                                Logo {mode === "create" && <span className="text-red-500">*</span>}
                                            </Label>
                                            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                                                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                                                    {logoPreview ? (
                                                        <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <ImagePlus className="h-7 w-7 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 w-full flex-1">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        aria-label="Seleccionar logo del dojo"
                                                        className={imageInputClass}
                                                        onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                                                    />
                                                </div>
                                            </div>
                                            {mode === "edit" && (
                                                <p className="text-xs text-muted-foreground">Deje vacío para conservar el logo actual</p>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <Label className="text-sm font-medium text-brand-indigo">Banner (opcional)</Label>
                                            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                                                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                                                    {bannerPreview ? (
                                                        <img src={bannerPreview} alt="Banner" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <ImagePlus className="h-7 w-7 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 w-full flex-1">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        aria-label="Seleccionar banner del dojo"
                                                        className={imageInputClass}
                                                        onChange={(e) => setBannerFile(e.target.files?.[0] ?? null)}
                                                    />
                                                </div>
                                            </div>
                                            {mode === "edit" && (
                                                <p className="text-xs text-muted-foreground">Deje vacío para conservar el banner actual</p>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                {/* Social media */}
                                <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-3 shadow-sm sm:p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <Label className="text-sm font-medium text-brand-indigo">Redes Sociales</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 border-brand-gold/40 text-brand-gold-deep hover:border-brand-gold hover:bg-brand-gold/10 sm:h-9"
                                            onClick={() => append({ socialMedia: "", link: "", directUrl: "" })}
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Agregar
                                        </Button>
                                    </div>

                                    {fields.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No hay redes sociales configuradas</p>
                                    )}

                                    <div className="space-y-3">
                                        {fields.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_auto] gap-3 items-end border border-border rounded-lg p-3"
                                            >
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-muted-foreground">Red social</Label>
                                                    <Controller
                                                        name={`socialMedia.${index}.socialMedia`}
                                                        control={form.control}
                                                        render={({ field: f }) => (
                                                            <Input placeholder="Instagram, Facebook..." className={imageInputClass} {...f} />
                                                        )}
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label className="text-xs text-muted-foreground">Enlace</Label>
                                                    <Controller
                                                        name={`socialMedia.${index}.link`}
                                                        control={form.control}
                                                        render={({ field: f }) => (
                                                            <Input placeholder="https://..." className={imageInputClass} {...f} />
                                                        )}
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label className="text-xs text-muted-foreground">URL directa (opcional)</Label>
                                                    <Controller
                                                        name={`socialMedia.${index}.directUrl`}
                                                        control={form.control}
                                                        render={({ field: f }) => (
                                                            <Input placeholder="https://..." className={imageInputClass} {...f} />
                                                        )}
                                                    />
                                                </div>

                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Eliminar red social"
                                                    className="justify-self-end text-destructive hover:bg-destructive/10"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
                                    <Button
                                        type="button" variant="outline" className="h-11 w-full cursor-pointer sm:h-9 sm:w-auto"
                                        onClick={() => finishForm()}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-11 w-full cursor-pointer bg-brand-vermilion hover:bg-brand-vermilion-dark sm:h-9 sm:w-auto"
                                    >
                                        {mode === "create" ? "Guardar Dojo" : "Actualizar Dojo"}
                                    </Button>
                                </div>

                            </form>

                        </Form>
                    )}

                </div>

            </div>
        </div>
    );

}
