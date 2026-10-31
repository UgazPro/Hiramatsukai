import { Badge } from "@/components/ui/badge";
import { Building2, CalendarDays, Mail, MapPin, Phone, Swords, User, Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useDojosStore } from "@/stores/dojos.store";
import { DetailLayout } from "@/components/detailView/DetailLayout";
import { DetailHeader } from "@/components/detailView/header/DetailHeader";
import { DetailSection } from "@/components/detailView/section/DetailSection";
import { DetailFooter } from "@/components/detailView/footer/DetailFooter";
import { InfoItem } from "@/components/detailView/info/InfoItem";
import { IDojo, IDojoInfo } from "@/services/dojos/dojo.interface";
import { useDojosInfo } from "@/hooks/useDojos";
import { useUserData } from "@/helpers/token";
import FieldBadge from "@/components/table/RenderTableComponents";
import DojoLinkParentDialog from "./DojoLinkParentDialog";

interface DojoDetailViewProps {
    dojos: IDojo[];
}

const getDojoLogo = (logo: string) => `${import.meta.env.VITE_API_URL}/api${logo}`;

function DojoChildrenTree({ dojo, childrenByParent, depth = 0 }: {
    dojo: IDojo;
    childrenByParent: Map<number, IDojo[]>;
    depth?: number;
}) {
    const children = childrenByParent.get(dojo.id) ?? [];

    return (
        <div className={depth === 0 ? "space-y-2" : "ml-3 mt-2 flex flex-col gap-2 border-l-2 border-brand-gold/30 pl-3 sm:ml-5"}>
            {children.map((child) => (
                <div key={child.id}>
                    <div className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-muted/40 p-2">
                        <Building2 className="h-4 w-4 shrink-0 text-brand-gold-deep" />
                        <p className="min-w-0 truncate text-sm font-medium">{child.dojo}</p>
                        <Badge variant="outline" className="ml-auto shrink-0 text-xs">{child.code}</Badge>
                    </div>
                    <DojoChildrenTree
                        dojo={child}
                        childrenByParent={childrenByParent}
                        depth={depth + 1}
                    />
                </div>
            ))}
        </div>
    );
}

export default function DojoDetailView({ dojos }: DojoDetailViewProps) {

    const { selectedDojo, setSelectedDojo, setScreen, startEdit } = useDojosStore();

    const userData = useUserData();
    const canModify = userData?.roles.some(({ rol }) => rol === "Administrador" || rol === "Líder Maestro");

    const { data: fullInfo } = useDojosInfo(selectedDojo?.code ?? "");

    if (!selectedDojo) return null;

    const dojoById = new Map<number, IDojo>();
    dojos.forEach((d) => dojoById.set(d.id, d));

    const childrenByParent = new Map<number, IDojo[]>();
    dojos.forEach((d) => {
        if (d.parentDojoId == null) return;
        const list = childrenByParent.get(d.parentDojoId) ?? [];
        list.push(d);
        childrenByParent.set(d.parentDojoId, list);
    });

    const parentDojo = selectedDojo.parentDojoId != null
        ? dojoById.get(selectedDojo.parentDojoId)
        : undefined;

    const info: Partial<IDojoInfo> = fullInfo ?? {};

    const header = (
        <DetailHeader
            title={selectedDojo.dojo}
            onClose={() => {
                setSelectedDojo(null);
                setScreen("main");
            }}
            subtitle={
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge className="border-brand-blue bg-brand-blue text-white">{selectedDojo.code}</Badge>
                    {parentDojo && (
                        <Badge className="border-brand-indigo/20 bg-brand-indigo/10 text-brand-indigo">
                            Hijo de: {parentDojo.dojo}
                        </Badge>
                    )}
                </div>
            }
            avatar={
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0 border border-border">
                    {selectedDojo.logo ? (
                        <img src={getDojoLogo(selectedDojo.logo)} alt={selectedDojo.dojo} className="w-full h-full object-cover" />
                    ) : (
                        <Building2 className="h-5 w-5 md:h-7 md:w-7 text-muted-foreground" />
                    )}
                </div>
            }
        />
    );

    const footer = (
        <DetailFooter
            primaryLabel={canModify ? "Editar dojo" : undefined}
            secondaryLabel="Cerrar"
            onSecondary={() => {
                setSelectedDojo(null);
                setScreen("main");
            }}
            onPrimary={canModify ? () => startEdit(selectedDojo) : undefined}
        />
    );

    return (
        <DetailLayout header={header} footer={footer}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <DetailSection icon={<MapPin className="h-5 w-5 text-brand-gold-deep" />} title="Información del dojo">
                    <div className="space-y-4">
                        <InfoItem
                            label="Dirección"
                            value={selectedDojo.address}
                            icon={<MapPin className="h-4 w-4" />}
                        />

                        <InfoItem
                            label="Estudiantes"
                            value={selectedDojo.students}
                            icon={<Users className="h-4 w-4" />}
                        />

                        {info.founded && (
                            <InfoItem
                                label="Fundado"
                                value={format(new Date(info.founded), "dd MMMM yyyy", { locale: es })}
                                icon={<CalendarDays className="h-4 w-4" />}
                            />
                        )}

                        {info.email && (
                            <InfoItem
                                label="Email"
                                value={info.email}
                                icon={<Mail className="h-4 w-4" />}
                            />
                        )}

                        {info.phone && (
                            <InfoItem
                                label="Teléfono"
                                value={info.phone}
                                icon={<Phone className="h-4 w-4" />}
                            />
                        )}

                        {info.slogan && (
                            <InfoItem label="Eslogan" value={info.slogan} />
                        )}

                        {info.translate && (
                            <InfoItem label="Traducción" value={info.translate} />
                        )}
                    </div>
                </DetailSection>

                <div className="space-y-6">
                    <DetailSection icon={<Swords className="h-5 w-5 text-brand-gold-deep" />} title="Artes marciales">
                        <div className="flex flex-wrap gap-2">
                            {selectedDojo.dojoMartialArts.length === 0 && (
                                <p className="text-sm text-muted-foreground">No hay artes marciales asignadas</p>
                            )}
                            {selectedDojo.dojoMartialArts.map((ma) => (
                                <FieldBadge key={ma.id} label={ma.martialArt} color="yellow" />
                            ))}
                        </div>
                    </DetailSection>

                    <DetailSection icon={<User className="h-5 w-5 text-brand-gold-deep" />} title="Líder / Instructor">
                        {selectedDojo.leaderInstructor ? (
                            <div className="space-y-2">
                                <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium break-words">
                                            {selectedDojo.leaderInstructor.name} {selectedDojo.leaderInstructor.lastName}
                                        </p>
                                        <p className="text-xs break-words text-muted-foreground">
                                            {selectedDojo.leaderInstructor.roles.map(({ rol }) => rol).join(", ")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No hay líder/instructor asignado</p>
                        )}
                    </DetailSection>
                </div>

            </div>

            <DetailSection icon={<Building2 className="h-5 w-5 text-brand-gold-deep" />} title="Jerarquía de dojos">
                <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-muted/40">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Dojo padre</p>
                                <p className="font-medium">
                                    {parentDojo ? parentDojo.dojo : "Sin dojo padre (raíz)"}
                                </p>
                            </div>

                            <DojoLinkParentDialog
                                dojo={selectedDojo}
                                dojos={dojos}
                                canModify={!!canModify}
                                onLinked={(parentDojoId) => setSelectedDojo({ ...selectedDojo, parentDojoId })}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground mb-2">Dojos hijos</p>
                        {selectedDojo.childDojos.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Este dojo no tiene dojos hijos</p>
                        ) : (
                            <DojoChildrenTree
                                dojo={selectedDojo}
                                childrenByParent={childrenByParent}
                            />
                        )}
                    </div>
                </div>
            </DetailSection>

            {info.description && (
                <DetailSection icon={<Users className="h-5 w-5 text-brand-gold-deep" />} title="Descripción">
                    <p className="text-sm text-foreground leading-relaxed">{info.description}</p>
                </DetailSection>
            )}

        </DetailLayout>
    );
}
