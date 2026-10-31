import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, Building2, Users, Tag } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useActivitiesStore } from "@/stores/activities.store";
import { DetailLayout } from "@/components/detailView/DetailLayout";
import { DetailHeader } from "@/components/detailView/header/DetailHeader";
import { DetailSection } from "@/components/detailView/section/DetailSection";
import { DetailFooter } from "@/components/detailView/footer/DetailFooter";
import { InfoItem } from "@/components/detailView/info/InfoItem";
import { IDojoEdit } from "@/services/activities/activity.interface";
import { useUserData } from "@/helpers/token";

export default function ActivityDetailView() {

  const { selectedActivity, setSelectedActivity, setScreen, startEdit } = useActivitiesStore();

  const userData = useUserData();
  const canModify = userData?.roles.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor" || rol === "Instructor");

  if (!selectedActivity) return null;

  /* ---------------- HEADER ---------------- */
  const header = (
    <DetailHeader
      title={selectedActivity.name}
      onClose={() => {
        setSelectedActivity(null!);
        setScreen("main");
      }}
      subtitle={
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge className="border-brand-indigo/20 bg-brand-indigo/10 text-brand-indigo">
            {selectedActivity.type}
          </Badge>

          {selectedActivity.price > 0 && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              ${selectedActivity.price}
            </Badge>
          )}
        </div>
      }
      avatar={
        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
          <Tag className="h-5 w-5 md:h-7 md:w-7 text-brand-gold-deep" />
        </div>
      }
    />
  );

  /* ---------------- FOOTER ---------------- */
  const footer = (
    <DetailFooter
      primaryLabel={canModify ? "Editar actividad" : undefined}
      secondaryLabel="Cerrar"
      onSecondary={() => {
        setSelectedActivity(null!);
        setScreen("main");
      }}
      onPrimary={canModify ? () => startEdit(selectedActivity) : undefined}
    >
      <div className="text-sm text-muted-foreground">
        Creada el{" "}
        {format(new Date(selectedActivity.createdDate), "dd/MM/yyyy HH:mm", {
          locale: es,
        })}
      </div>
    </DetailFooter>
  );

  return (

    <DetailLayout header={header} footer={footer}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <DetailSection icon={<Calendar className="h-5 w-5 text-brand-gold-deep" />} title="Información de la actividad">
          <div className="space-y-4">

            <InfoItem
              label="Fecha de la actividad"
              value={format(new Date(selectedActivity.date), "dd MMMM yyyy - hh:mm a", { locale: es })}
              icon={<Calendar className="h-4 w-4" />}
            />

            <InfoItem
              label="Lugar"
              value={selectedActivity.place}
              icon={<MapPin className="h-4 w-4" />}
            />

            {selectedActivity.price > 0 && (
              <InfoItem
                label="Precio"
                value={`$${selectedActivity.price}`}
                icon={<DollarSign className="h-4 w-4" />}
              />
            )}

          </div>
        </DetailSection>

        <DetailSection
          icon={<Users className="h-5 w-5 text-brand-gold-deep" />}
          title="Dojos participantes"
        >

        <div className="space-y-2">

          {selectedActivity.ActivityDojos.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay dojos asignados</p>
          )}

          {(selectedActivity.ActivityDojos as IDojoEdit[]).map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/40"
            >
              <div className="flex min-w-0 items-center gap-2">
                <Building2 className="h-4 w-4 shrink-0 text-brand-gold-deep" />
                <p className="min-w-0 truncate font-medium">
                  {d.dojo?.dojo || "Dojo"}
                </p>
              </div>

              <Badge variant="outline" className="shrink-0">Participa</Badge>
            </div>
          ))}
        </div>

      </DetailSection>

      </div>

    </DetailLayout>

  );

}
