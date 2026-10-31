import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    ArrowLeft,
    Award,
    CalendarDays,
    Clock,
    MapPin,
    ChevronRight,
    Users,
} from "lucide-react";
import { Loader } from "@/components/spinner/Loader";
import { useAppliedStudents } from "@/hooks/useActivities";
import { useApplicationsStore } from "@/stores/applications.store";
import { dateFormatterIntoLong, timeFormatter } from "@/helpers/formatter";
import { getRankOrder } from "@/helpers/rank";
import { IAppliedStudent } from "@/services/activities/activity.interface";

const getBeltColor = (grado: string) => {
    const colors: Record<string, string> = {
        Blanco: "bg-gray-100 text-gray-800 border-border",
        Amarillo: "bg-yellow-100 text-yellow-800 border-yellow-300",
        Naranja: "bg-orange-100 text-orange-800 border-orange-300",
        Verde: "bg-green-100 text-green-800 border-green-300",
        Azul: "bg-blue-100 text-blue-800 border-blue-300",
        Marrón: "bg-yellow-800 text-white border-yellow-900",
        Negro: "bg-gray-900 text-white border-gray-950",
        Rojo: "bg-red-800 text-white border-red-900",
    };
    return colors[grado] || "bg-gray-100 text-gray-800 border-border";
};

const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
};

function PostulantCard({ p, compact = false }: { p: IAppliedStudent; compact?: boolean }) {
    return (
        <div
            className={`${
                compact
                    ? "p-3 border border-border rounded-lg"
                    : "p-4 border border-border rounded-xl hover:border-yellow-300 transition-colors"
            } bg-card`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5 flex-shrink-0 ${
                        compact ? "h-9 w-9" : "h-10 w-10"
                    }`}
                >
                    <div className="h-full w-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                        {p.user?.profileImg ? (
                            <img
                                src={p.user.profileImg}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span
                                className={`font-bold text-brand-gold-deep ${
                                    compact ? "text-[10px]" : "text-xs"
                                }`}
                            >
                                {getInitials(
                                    p.user?.name ?? "",
                                    p.user?.lastName ?? "",
                                )}
                            </span>
                        )}
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <p
                        className={`font-semibold text-foreground truncate ${
                            compact ? "text-sm" : ""
                        }`}
                    >
                        {p.user?.name ?? ""} {p.user?.lastName ?? ""}
                    </p>
                    {!compact && (
                        <p className="text-xs text-muted-foreground truncate">
                            {p.ranks?.martialArt?.martialArt ?? ""}
                        </p>
                    )}
                    <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                        <Badge
                            className={`${getBeltColor(
                                p.currentRank?.belt ?? "",
                            )} ${
                                compact
                                    ? "text-[10px] px-1.5 py-0"
                                    : "text-xs"
                            }`}
                        >
                            {p.currentRank?.belt ?? "?"}
                        </Badge>
                        <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <Badge
                            className={`${getBeltColor(
                                p.ranks?.belt ?? "",
                            )} ${
                                compact
                                    ? "text-[10px] px-1.5 py-0"
                                    : "text-xs"
                            }`}
                        >
                            {p.ranks?.belt ?? "?"}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function NextExamDetail() {
    const { selectedNextExamId, selectedNextExamData, closeNextExamDetail } =
        useApplicationsStore();
    const { appliedStudents, isLoading } =
        useAppliedStudents(selectedNextExamId ?? undefined);

    const [generalDialogOpen, setGeneralDialogOpen] = useState(false);
    const [generalPage, setGeneralPage] = useState(1);

    const [maDialogOpen, setMaDialogOpen] = useState(false);
    const [maDialogName, setMaDialogName] = useState("");
    const [maDialogPage, setMaDialogPage] = useState(1);

    const activity = selectedNextExamData;
    const postulants = appliedStudents;

    const top2Global = useMemo(
        () =>
            [...postulants]
                .sort(
                    (a: IAppliedStudent, b: IAppliedStudent) =>
                        getRankOrder(b.ranks?.code ?? "") -
                        getRankOrder(a.ranks?.code ?? ""),
                )
                .slice(0, 2),
        [postulants],
    );

    const generalList = useMemo(
        () =>
            [...postulants].sort((a: IAppliedStudent, b: IAppliedStudent) => a.id - b.id),
        [postulants],
    );

    const martialArtGroups = useMemo(() => {
        const groups: Record<string, { name: string; posts: IAppliedStudent[] }> = {};
        for (const p of postulants) {
            const name = p.ranks?.martialArt?.martialArt ?? "Otro";
            if (!groups[name]) groups[name] = { name, posts: [] };
            groups[name].posts.push(p);
        }
        for (const key in groups) {
            groups[key].posts.sort(
                (a: IAppliedStudent, b: IAppliedStudent) =>
                    getRankOrder(b.ranks?.code ?? "") -
                    getRankOrder(a.ranks?.code ?? ""),
            );
        }
        return Object.values(groups);
    }, [postulants]);

    const openGeneralDialog = () => {
        setGeneralPage(1);
        setGeneralDialogOpen(true);
    };

    const openMaDialog = (name: string) => {
        setMaDialogName(name);
        setMaDialogPage(1);
        setMaDialogOpen(true);
    };

    const generalTotalPages = Math.ceil(generalList.length / 10);
    const generalPaginated = generalList.slice(
        (generalPage - 1) * 10,
        generalPage * 10,
    );

    const currentMaGroup = martialArtGroups.find(
        (g) => g.name === maDialogName,
    );
    const maList = currentMaGroup?.posts ?? [];
    const maTotalPages = Math.ceil(maList.length / 10);
    const maPaginated = maList.slice(
        (maDialogPage - 1) * 10,
        maDialogPage * 10,
    );

    if (isLoading) {
        return (
            <div className="mx-auto my-3 min-h-full w-full max-w-4xl p-3 sm:my-6 sm:p-6">
                <div className="bg-card shadow-xl border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center py-20">
                        <Loader message="Cargando postulaciones..." />
                    </div>
                </div>
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="mx-auto my-3 min-h-full w-full max-w-4xl p-3 sm:my-6 sm:p-6">
                <div className="bg-card shadow-xl border border-border rounded-xl overflow-hidden">
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <Award className="h-16 w-16 mb-4 text-border" />
                        <p className="text-lg font-medium">
                            Examen no encontrado
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4 border-border"
                            onClick={closeNextExamDetail}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto my-3 min-h-full w-full max-w-5xl p-3 sm:my-6 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                {/* Header */}
                <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4 sm:p-6">
                    <Button
                        variant="ghost"
                        className="mb-4 h-11 text-muted-foreground hover:text-foreground sm:h-9"
                        onClick={closeNextExamDetail}
                    >
                        <ArrowLeft data-icon="inline-start" />
                        Volver a exámenes
                    </Button>

                    <div className="mb-4 flex min-w-0 items-start gap-3 sm:gap-4">
                        <div className="h-14 w-14 shrink-0 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                                <Award className="h-7 w-7 text-brand-gold-deep" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl font-bold break-words text-heading sm:text-2xl">
                                {activity.name}
                            </h2>
                            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarDays className="h-4 w-4 shrink-0" />
                                {dateFormatterIntoLong(activity.date)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Hora:{" "}
                                <span className="font-medium text-foreground">
                                    {timeFormatter(activity.date)}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Lugar:{" "}
                                <span className="font-medium text-foreground">
                                    {activity.place}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Postulados:{" "}
                                <span className="font-medium text-foreground">
                                    {postulants.length} alumnos
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Creado:{" "}
                                <span className="font-medium text-foreground">
                                    {dateFormatterIntoLong(
                                        activity.createdDate,
                                    )}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 p-4 sm:gap-8 sm:p-6">
                    {/* Resumen General — Top 2 más avanzados */}
                    <div>
                        <h3 className="text-lg font-bold text-heading flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-brand-gold-deep" />
                            Postulantes con Examen Más Avanzado
                        </h3>

                        {postulants.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <Users className="h-10 w-10 mx-auto mb-2 text-border" />
                                <p className="text-sm">
                                    No hay postulaciones para este
                                    examen
                                </p>
                            </div>
                        )}

                        {postulants.length > 0 && (
                            <>
                                {top2Global.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p className="text-sm">
                                            No hay postulaciones
                                            disponibles
                                        </p>
                                    </div>
                                )}

                                {top2Global.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        {top2Global.map((p: IAppliedStudent) => (
                                            <div
                                                key={p.id}
                                                className="rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4 sm:p-5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5 flex-shrink-0">
                                                        <div className="h-full w-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                                                            {p.user
                                                                ?.profileImg ? (
                                                                <img
                                                                    src={
                                                                        p.user
                                                                            .profileImg
                                                                    }
                                                                    alt=""
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-bold text-brand-gold-deep">
                                                                    {getInitials(
                                                                        p.user
                                                                            ?.name ??
                                                                            "",
                                                                        p.user
                                                                            ?.lastName ??
                                                                            "",
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-bold text-foreground truncate">
                                                            {p.user?.name ?? ""}{" "}
                                                            {p.user?.lastName ??
                                                                ""}
                                                        </p>
                                                        <p className="text-sm text-brand-gold-deep font-medium mt-0.5">
                                                            {p.ranks
                                                                ?.martialArt
                                                                ?.martialArt ??
                                                                ""}
                                                        </p>
                                                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                                            <Badge
                                                                className={getBeltColor(
                                                                    p
                                                                        .currentRank
                                                                        ?.belt ??
                                                                        "",
                                                                )}
                                                            >
                                                                {p
                                                                    .currentRank
                                                                    ?.belt ??
                                                                    "?"}
                                                            </Badge>
                                                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                                            <Badge
                                                                className={getBeltColor(
                                                                    p.ranks
                                                                        ?.belt ??
                                                                        "",
                                                                )}
                                                            >
                                                                {p.ranks
                                                                    ?.belt ??
                                                                    "?"}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {postulants.length > 2 && (
                                    <Button
                                        variant="outline"
                                        className="h-11 w-full border-border text-foreground hover:bg-muted"
                                        onClick={openGeneralDialog}
                                    >
                                        <Users className="h-4 w-4 mr-2" />
                                        Ver todos los postulados (
                                        {postulants.length})
                                    </Button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Por Arte Marcial */}
                    {martialArtGroups.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-heading flex items-center gap-2 mb-4">
                                <Users className="h-5 w-5 text-brand-gold-deep" />
                                Por Arte Marcial
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {martialArtGroups.map((group) => {
                                    const top2 = group.posts.slice(
                                        0,
                                        2,
                                    );
                                    return (
                                        <div
                                            key={group.name}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-heading flex items-center gap-2">
                                                    <span className="h-6 w-6 rounded bg-brand-gold/15 text-brand-gold-deep flex items-center justify-center text-xs font-bold">
                                                        {group.name.charAt(
                                                            0,
                                                        )}
                                                    </span>
                                                    {group.name}
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        ({
                                                            group.posts
                                                                .length
                                                        }
                                                        )
                                                    </span>
                                                </h4>
                                            </div>

                                            {top2.map((p: IAppliedStudent) => (
                                                <PostulantCard
                                                    key={p.id}
                                                    p={p}
                                                />
                                            ))}

                                            {top2.length === 0 && (
                                                <p className="text-sm text-muted-foreground text-center py-4">
                                                    Sin postulaciones
                                                </p>
                                            )}

                                            {group.posts.length >
                                                2 && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-11 w-full border-border text-foreground hover:bg-muted"
                                                    onClick={() =>
                                                        openMaDialog(
                                                            group.name,
                                                        )
                                                    }
                                                >
                                                    Ver más (
                                                    {
                                                        group.posts
                                                            .length
                                                    }
                                                    )
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Dialog General — Todos los postulados */}
            <Dialog
                open={generalDialogOpen}
                onOpenChange={setGeneralDialogOpen}
            >
                <DialogContent className="flex max-w-3xl flex-col border-0 bg-card shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Todos los Postulados
                        </DialogTitle>
                    </DialogHeader>

                    <div className="-mx-4 flex-1 overflow-y-auto px-4 sm:-mx-6 sm:px-6">
                        <div className="space-y-2 py-2">
                            {generalPaginated.map((p: IAppliedStudent) => (
                                <PostulantCard
                                    key={p.id}
                                    p={p}
                                    compact
                                />
                            ))}
                        </div>
                    </div>

                    {generalTotalPages > 1 && (
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-11 border-border text-foreground sm:h-8"
                                disabled={generalPage <= 1}
                                onClick={() =>
                                    setGeneralPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                            >
                                Anterior
                            </Button>
                            <span className="text-xs text-muted-foreground sm:text-sm">
                                Página {generalPage} de{" "}
                                {generalTotalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-11 border-border text-foreground sm:h-8"
                                disabled={
                                    generalPage >= generalTotalPages
                                }
                                onClick={() =>
                                    setGeneralPage(
                                        generalPage >=
                                            generalTotalPages
                                            ? generalPage
                                            : generalPage + 1,
                                    )
                                }
                            >
                                Siguiente
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog Por Arte Marcial */}
            <Dialog open={maDialogOpen} onOpenChange={setMaDialogOpen}>
                <DialogContent className="flex max-w-3xl flex-col border-0 bg-card shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Postulados — {maDialogName}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="-mx-4 flex-1 overflow-y-auto px-4 sm:-mx-6 sm:px-6">
                        <div className="space-y-2 py-2">
                            {maPaginated.map((p: IAppliedStudent) => (
                                <PostulantCard
                                    key={p.id}
                                    p={p}
                                    compact
                                />
                            ))}
                        </div>
                    </div>

                    {maTotalPages > 1 && (
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-11 border-border text-foreground sm:h-8"
                                disabled={maDialogPage <= 1}
                                onClick={() =>
                                    setMaDialogPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                            >
                                Anterior
                            </Button>
                            <span className="text-xs text-muted-foreground sm:text-sm">
                                Página {maDialogPage} de{" "}
                                {maTotalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-11 border-border text-foreground sm:h-8"
                                disabled={
                                    maDialogPage >= maTotalPages
                                }
                                onClick={() =>
                                    setMaDialogPage(
                                        maDialogPage >= maTotalPages
                                            ? maDialogPage
                                            : maDialogPage + 1,
                                    )
                                }
                            >
                                Siguiente
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
