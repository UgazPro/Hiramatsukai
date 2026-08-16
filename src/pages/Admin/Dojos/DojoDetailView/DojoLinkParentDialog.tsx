import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DialogComponent from "@/components/dialog/DialogComponent";
import { useUserData } from "@/helpers/token";
import { useLinkDojoParent } from "@/hooks/useDojos";
import { getDojoDescendants } from "@/hooks/useFilteredDojos";
import { IDojo } from "@/services/dojos/dojo.interface";

interface DojoLinkParentDialogProps {
    dojo: IDojo;
    dojos: IDojo[];
    canModify: boolean;
    onLinked?: (parentDojoId: number | null) => void;
}

interface LinkResponse {
    success?: boolean;
    message?: string;
    statusCode?: number;
}

const triggerClass =
    "border-gray-300 focus:border-[var(--yellowColor)] focus:ring-2 focus:ring-[var(--yellowColor)] focus:ring-opacity-40 transition-all duration-200 rounded-lg w-full overflow-hidden";

export default function DojoLinkParentDialog({ dojo, dojos, canModify, onLinked }: DojoLinkParentDialogProps) {

    const [open, setOpen] = useState(false);
    const [parentValue, setParentValue] = useState<string>("0");

    const { mutateAsync: linkParent, isPending } = useLinkDojoParent();

    const user = useUserData();
    const isAdmin = user?.roles?.some(({ rol }) => rol === "Administrador");

    const options = useMemo(() => {
        const excluded = new Set<number>();
        excluded.add(dojo.id);
        getDojoDescendants(dojo.id, dojos).forEach((id) => excluded.add(id));

        const eligible = dojos.filter((d) => !excluded.has(d.id)).map((d) => ({
            label: d.dojo,
            value: d.id,
        }));

        if (isAdmin) {
            return [
                { label: "Sin dojo padre", value: 0 },
                ...eligible,
            ];
        }

        return eligible;
    }, [dojo.id, dojos, isAdmin]);

    const handleOpen = () => {
        setParentValue(dojo.parentDojoId != null ? String(dojo.parentDojoId) : "0");
        setOpen(true);
    };

    const handleSave = async () => {
        const nextParent = Number(parentValue);
        const parentDojoId = nextParent === 0 ? null : nextParent;

        const res = await linkParent({ dojoId: dojo.id, parentDojoId }) as LinkResponse | undefined;

        if (res?.success === false || (res?.statusCode && res.statusCode >= 400)) {
            toast.error(res?.message ?? "No se pudo actualizar el dojo padre");
            return;
        }

        toast.success(res?.message ?? "Dojo padre actualizado correctamente");
        onLinked?.(parentDojoId);
        setOpen(false);
    };

    if (!canModify) return null;

    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleOpen}
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
            >
                <Link2 className="h-4 w-4" />
                Enlazar / Cambiar
            </Button>

            <DialogComponent
                openDialog={open}
                onClose={setOpen}
                dialogTitle="Enlazar dojo padre"
                dialogDescription={`Selecciona el dojo padre de ${dojo.dojo}`}
                className="max-w-md"
            >
                <div className="space-y-2">
                    <p className="text-sm font-medium text-[var(--blueColor)]">Dojo padre</p>

                    <Select
                        key={String(parentValue)}
                        value={parentValue}
                        onValueChange={setParentValue}
                        disabled={isPending}
                    >
                        <SelectTrigger className={triggerClass}>
                            <SelectValue placeholder="Selecciona un dojo padre" />
                        </SelectTrigger>
                        <SelectContent className="w-full max-h-80">
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={String(opt.value)}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={isPending}
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
                    </Button>
                </div>
            </DialogComponent>
        </>
    );
}