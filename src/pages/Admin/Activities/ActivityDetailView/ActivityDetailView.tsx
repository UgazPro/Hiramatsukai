import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, Building2, Users, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useActivitiesStore } from "@/stores/activities.store";
import { DetailLayout } from "@/components/detailView/DetailLayout";
import { DetailHeader } from "@/components/detailView/header/DetailHeader";
import { DetailSection } from "@/components/detailView/section/DetailSection";
import { DetailFooter } from "@/components/detailView/footer/DetailFooter";
import { InfoItem } from "@/components/detailView/info/InfoItem";

export default function ActivityDetailView() {

  const { selectedActivity, setSelectedActivity, setScreen } = useActivitiesStore();

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
        <div className="flex gap-2 mt-2">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
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
        <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
          <Tag className="h-7 w-7 text-amber-600" />
        </div>
      }
    />
  );

  /* ---------------- FOOTER ---------------- */
  const footer = (
    <DetailFooter
      primaryLabel="Editar actividad"
      secondaryLabel="Cerrar"
      onSecondary={() => {
        setSelectedActivity(null!);
        setScreen("main");
      }}
      onPrimary={() => console.log("editar actividad")}
    >
      <div className="text-sm text-gray-600">
        Creada el{" "}
        {format(new Date(selectedActivity.createdDate), "dd/MM/yyyy HH:mm", {
          locale: es,
        })}
      </div>
    </DetailFooter>
  );

  return (

    <DetailLayout header={header} footer={footer}>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <DetailSection icon={<Calendar className="h-5 w-5 text-amber-600" />} title="Información de la actividad">
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

        <DetailSection icon={<Building2 className="h-5 w-5 text-amber-600" />} title="Dojo creador">

          <InfoItem
            label="Dojo"
            value={(selectedActivity.dojos as any)?.dojo || "No definido"}
            icon={<Building2 className="h-4 w-4" />}
          />

          <div className="mt-4">
            <InfoItem
              label="Fecha de creación"
              value={format(new Date(selectedActivity.createdDate), "dd MMMM yyyy", { locale: es })}
              icon={<Clock className="h-4 w-4" />}
            />
          </div>
        </DetailSection>

      </div>

      <DetailSection
        icon={<Users className="h-5 w-5 text-amber-600" />}
        title="Dojos participantes"
      >

        <div className="space-y-2">

          {selectedActivity.ActivityDojos.length === 0 && (
            <p className="text-sm text-gray-500">No hay dojos asignados</p>
          )}

          {(selectedActivity.ActivityDojos as any[]).map((d: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-600" />
                <p className="font-medium">
                  {d.dojo?.dojo || "Dojo"}
                </p>
              </div>

              <Badge variant="outline">Participa</Badge>
            </div>
          ))}
        </div>

      </DetailSection>

    </DetailLayout>

  );

}
