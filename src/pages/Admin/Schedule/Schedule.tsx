
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DojoSchedule, DojoScheduleBody, IDojoMartialArts } from "@/services/dojos/dojo.interface"
import { Plus, Save, X, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface ScheduleProps {
  martialArtsOptions: IDojoMartialArts[];
  schedules: DojoSchedule[];
  submitSchedule: (schedules: DojoScheduleBody[]) => void;
  updateSchedule: (scheduleId: number, schedule: DojoScheduleBody) => void;
  deleteSchedule: (scheduleId: number) => void;
}

export default function Schedule({ martialArtsOptions, schedules, submitSchedule, updateSchedule, deleteSchedule }: ScheduleProps) {

  const [editingSchedule, setEditingSchedule] = useState<number | null>(null);
  const [editingScheduleData, setEditingScheduleData] = useState<DojoScheduleBody | null>(null);
  const [newSchedule, setNewSchedule] = useState<DojoScheduleBody[]>([])

  const handleAddSchedule = () => {
    setNewSchedule([...newSchedule, {
      day: '',
      name: '',
      startTime: '',
      endTime: '',
      martialArtId: 1,
    }]);
  };

  const removeSchedule = (index: number) => {
    const updatedSchedule = [...newSchedule];
    updatedSchedule.splice(index, 1);
    setNewSchedule(updatedSchedule);
  }

  const updateScheduleField = <K extends keyof DojoScheduleBody>(
    index: number,
    field: K,
    value: DojoScheduleBody[K],
  ) => {
    setNewSchedule((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  const handleSaveSchedule = () => {
    submitSchedule(newSchedule);

    setTimeout(() => {
      clearSchedule()
    }, 500);
  }

  const clearSchedule = () => {
    setNewSchedule([]);
  }

  const handleEditSchedule = (item: DojoSchedule) => {
    setEditingSchedule(item.id);
    setEditingScheduleData({
      id: item.id,
      day: item.day,
      name: item.name,
      startTime: item.startTime,
      endTime: item.endTime,
      martialArtId: item.martialArts.id,
    });
  }

  const updateEditingField = <K extends keyof DojoScheduleBody>(
    field: K,
    value: DojoScheduleBody[K],
  ) => {
    setEditingScheduleData((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  const cancelEditing = () => {
    setEditingSchedule(null);
    setEditingScheduleData(null);
  }

  const handleSaveEditedSchedule = (scheduleId: number) => {
    if (!editingScheduleData) return;

    updateSchedule(scheduleId, editingScheduleData);
    cancelEditing();
  }

  const resolverImageUrl = (url: string) => {
    return `/${url}`;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Horarios de Entrenamiento</CardTitle>
              <CardDescription>Gestiona los horarios de tus clases</CardDescription>
            </div>
            <Button onClick={handleAddSchedule} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Horario
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {newSchedule.length > 0 && (
            <div className="space-y-4 border border-gray-300 rounded-lg py-4 px-2">
              {newSchedule.map((schedule, index) => (
                <div key={index} className="flex items-end justify-between gap-8">
                  <div className="space-y-2 w-1/4">
                    <Label>Dia</Label>
                    <Select
                      value={schedule.day}
                      onValueChange={(value) => updateScheduleField(index, "day", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un día" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Dias</SelectLabel>
                          <SelectItem value="Lunes">Lunes</SelectItem>
                          <SelectItem value="Martes">Martes</SelectItem>
                          <SelectItem value="Miércoles">Miércoles</SelectItem>
                          <SelectItem value="Jueves">Jueves</SelectItem>
                          <SelectItem value="Viernes">Viernes</SelectItem>
                          <SelectItem value="Sábado">Sábado</SelectItem>
                          <SelectItem value="Domingo">Domingo</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 w-1/4">
                    {/* <Label>Horario</Label> */}
                    <div className="flex items-center gap-2">
                      <div className="space-y-2 w-1/2">
                        <Label htmlFor="time-picker-optional">Desde</Label>
                        <Input
                          type="time"
                          step={60}
                          value={schedule.startTime}
                          onChange={(e) => updateScheduleField(index, "startTime", e.target.value)}
                          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                      <div className="space-y-2 w-1/2">
                        <Label htmlFor="time-picker-optional">Hasta</Label>
                        <Input
                          type="time"
                          step={60}
                          value={schedule.endTime}
                          onChange={(e) => updateScheduleField(index, "endTime", e.target.value)}
                          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 w-1/4">
                    <Label>Nombre/Actividad</Label>
                    <Input
                      value={schedule.name}
                      onChange={(e) => updateScheduleField(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 w-1/4">
                    <Label>Arte Marcial</Label>
                    <Select
                      value={schedule.martialArtId.toString()}
                      onValueChange={(value) => updateScheduleField(index, "martialArtId", Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un arte marcial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {martialArtsOptions.map((type, index) => (
                            <SelectItem key={index} value={type.id.toString()}>{type.martialArt}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => removeSchedule(index)}>
                    <X className="text-2xl" />
                  </Button>
                </div>
              ))}

              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" onClick={clearSchedule}>
                  Cancelar
                </Button>
                <Button variant='clickRed' onClick={handleSaveSchedule}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Horarios
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Día</th>
                  <th className="text-left py-3 px-4">Horario</th>
                  <th className="text-left py-3 px-4">Nombre/Actividad</th>
                  <th className="text-left py-3 px-4">Arte Marcial</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    {editingSchedule === item.id ? (
                      <>
                        <td className="py-3 px-4">
                          <Select
                            value={editingScheduleData?.day || ""}
                            onValueChange={(value) => updateEditingField("day", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un día" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Dias</SelectLabel>
                                <SelectItem value="Lunes">Lunes</SelectItem>
                                <SelectItem value="Martes">Martes</SelectItem>
                                <SelectItem value="Miércoles">Miércoles</SelectItem>
                                <SelectItem value="Jueves">Jueves</SelectItem>
                                <SelectItem value="Viernes">Viernes</SelectItem>
                                <SelectItem value="Sábado">Sábado</SelectItem>
                                <SelectItem value="Domingo">Domingo</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Input
                              type="time"
                              step={60}
                              className="w-full"
                              value={editingScheduleData?.startTime || ""}
                              onChange={(e) => updateEditingField("startTime", e.target.value)}
                            />
                            <Input
                              type="time"
                              step={60}
                              className="w-full"
                              value={editingScheduleData?.endTime || ""}
                              onChange={(e) => updateEditingField("endTime", e.target.value)}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            className="w-full"
                            value={editingScheduleData?.name || ""}
                            onChange={(e) => updateEditingField("name", e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={editingScheduleData?.martialArtId?.toString() || ""}
                            onValueChange={(value) => updateEditingField("martialArtId", Number(value))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un arte marcial" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {martialArtsOptions.map((type, index) => (
                                  <SelectItem key={index} value={type.id.toString()}>{type.martialArt}</SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" onClick={() => handleSaveEditedSchedule(item.id)}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEditing}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 font-medium">{item.day}</td>
                        <td className="py-3 px-4">{item.startTime} - {item.endTime}</td>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 flex items-center gap-2"><img src={resolverImageUrl(item.martialArts.icon)} className="w-8 h-8" alt={item.martialArts.martialArt} /> {item.martialArts.martialArt}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditSchedule(item)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => deleteSchedule(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
