import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Plus, Trash2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useNavigate } from "react-router"

// Lista de dojos disponibles
const dojos = [
  { id: 1, nombre: "Dojo Principal" },
  { id: 2, nombre: "Dojo Secundario" },
  { id: 3, nombre: "Dojo Norte" },
  { id: 4, nombre: "Dojo Sur" },
]

// Lista de rangos disponibles
const rangos = [
  { id: 1, nombre: "Cinturón Blanco", color: "white" },
  { id: 2, nombre: "Cinturón Amarillo", color: "yellow" },
  { id: 3, nombre: "Cinturón Naranja", color: "orange" },
  { id: 4, nombre: "Cinturón Verde", color: "green" },
  { id: 5, nombre: "Cinturón Azul", color: "blue" },
  { id: 6, nombre: "Cinturón Marrón", color: "brown" },
  { id: 7, nombre: "Cinturón Negro 1er Dan", color: "black" },
  { id: 8, nombre: "Cinturón Negro 2do Dan", color: "black" },
  { id: 9, nombre: "Cinturón Negro 3er Dan", color: "black" },
  { id: 10, nombre: "Cinturón Negro 4to Dan", color: "black" },
  { id: 11, nombre: "Cinturón Negro 5to Dan", color: "black" },
]

// Lista de artes marciales disponibles
const artesMarciales = [
  { id: 1, nombre: "Karatedo" },
  { id: 2, nombre: "Kobudo" },
]

// Esquema de validación
const formSchema = z.object({
  nombres: z.string().min(2, { message: "Los nombres son requeridos" }),
  apellidos: z.string().min(2, { message: "Los apellidos son requeridos" }),
  cedula: z.string().min(5, { message: "La cédula debe tener al menos 5 caracteres" }),
  sexo: z.enum(["masculino", "femenino"], { required_error: "El sexo es requerido" }),
  correo: z.string().email({ message: "Correo electrónico inválido" }).optional().or(z.literal("")),
  telefono: z.string().min(7, { message: "El teléfono debe tener al menos 7 caracteres" }).optional().or(z.literal("")),
  dojo: z.string({ required_error: "El dojo es requerido" }),
  direccion: z.string().optional(),
  fechaNacimiento: z.date({ required_error: "La fecha de nacimiento es requerida" }),
})

export default function NuevoEstudiantePage() {
  const router = useNavigate()
  const [foto, setFoto] = useState<string | null>(null)
  const [artesMarcialEstudiante, setArtesMarcialEstudiante] = useState<
    Array<{ id: number; arteMarcialId: number; rangoId: number }>
  >([{ id: 1, arteMarcialId: 1, rangoId: 1 }])

  // Configurar el formulario con React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      correo: "",
      telefono: "",
      direccion: "",
    },
  })

  // Manejar la subida de foto
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Eliminar la foto
  const handleRemoveFoto = () => {
    setFoto(null)
  }

  // Agregar una nueva arte marcial
  const agregarArteMarcial = () => {
    const newId = artesMarcialEstudiante.length > 0 ? Math.max(...artesMarcialEstudiante.map((a) => a.id)) + 1 : 1
    setArtesMarcialEstudiante([...artesMarcialEstudiante, { id: newId, arteMarcialId: 1, rangoId: 1 }])
  }

  // Eliminar una arte marcial
  const eliminarArteMarcial = (id: number) => {
    setArtesMarcialEstudiante(artesMarcialEstudiante.filter((a) => a.id !== id))
  }

  // Actualizar una arte marcial
  const actualizarArteMarcial = (id: number, field: "arteMarcialId" | "rangoId", value: number) => {
    setArtesMarcialEstudiante(artesMarcialEstudiante.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  // Enviar el formulario
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Combinar los datos del formulario con la foto y las artes marciales
    const formData = {
      ...data,
      foto,
      artesMarciales: artesMarcialEstudiante.map((a) => ({
        arteMarcial: artesMarciales.find((am) => am.id === a.arteMarcialId)?.nombre,
        rango: rangos.find((r) => r.id === a.rangoId)?.nombre,
      })),
    }

    // Aquí iría la lógica para enviar los datos al servidor
    console.log("Datos del formulario:", formData)

    // Mostrar mensaje de éxito

  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Nuevo Estudiante</h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Ingresa los datos personales del estudiante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Foto */}
              <div className="space-y-2">
                <Label htmlFor="foto">Foto</Label>
                <div className="flex items-center gap-4">
                  {foto ? (
                    <div className="relative h-24 w-24">
                      <img
                        src={foto || "/placeholder.svg"}
                        alt="Foto del estudiante"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={handleRemoveFoto}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <Input id="foto" type="file" accept="image/*" className="hidden" onChange={handleFotoChange} />
                    <Label
                      htmlFor="foto"
                      className="inline-flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Subir Foto
                    </Label>
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG o GIF. Máximo 1MB.</p>
                  </div>
                </div>
              </div>

              {/* Nombres */}
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input id="nombres" placeholder="Ingresa los nombres" {...form.register("nombres")} />
                {form.formState.errors.nombres && (
                  <p className="text-xs text-red-500">{form.formState.errors.nombres.message}</p>
                )}
              </div>

              {/* Apellidos */}
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input id="apellidos" placeholder="Ingresa los apellidos" {...form.register("apellidos")} />
                {form.formState.errors.apellidos && (
                  <p className="text-xs text-red-500">{form.formState.errors.apellidos.message}</p>
                )}
              </div>

              {/* Cédula */}
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula</Label>
                <Input id="cedula" placeholder="Ingresa la cédula" {...form.register("cedula")} />
                {form.formState.errors.cedula && (
                  <p className="text-xs text-red-500">{form.formState.errors.cedula.message}</p>
                )}
              </div>

              {/* Sexo */}
              <div className="space-y-2">
                <Label>Sexo</Label>
                <RadioGroup
                  onValueChange={(value) => form.setValue("sexo", value as "masculino" | "femenino")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femenino" id="femenino" />
                    <Label htmlFor="femenino">Femenino</Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.sexo && (
                  <p className="text-xs text-red-500">{form.formState.errors.sexo.message}</p>
                )}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.getValues("fechaNacimiento") && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.getValues("fechaNacimiento") ? (
                        format(form.getValues("fechaNacimiento"), "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.getValues("fechaNacimiento")}
                      onSelect={(date) => date && form.setValue("fechaNacimiento", date)}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.fechaNacimiento && (
                  <p className="text-xs text-red-500">{form.formState.errors.fechaNacimiento.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Ingresa los datos de contacto del estudiante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Correo Electrónico */}
              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input id="correo" type="email" placeholder="correo@ejemplo.com" {...form.register("correo")} />
                {form.formState.errors.correo && (
                  <p className="text-xs text-red-500">{form.formState.errors.correo.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" placeholder="Ingresa el teléfono" {...form.register("telefono")} />
                {form.formState.errors.telefono && (
                  <p className="text-xs text-red-500">{form.formState.errors.telefono.message}</p>
                )}
              </div>

              {/* Dojo */}
              <div className="space-y-2">
                <Label htmlFor="dojo">Dojo</Label>
                <Select onValueChange={(value) => form.setValue("dojo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un dojo" />
                  </SelectTrigger>
                  <SelectContent>
                    {dojos.map((dojo) => (
                      <SelectItem key={dojo.id} value={dojo.nombre}>
                        {dojo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.dojo && (
                  <p className="text-xs text-red-500">{form.formState.errors.dojo.message}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea id="direccion" placeholder="Ingresa la dirección" {...form.register("direccion")} />
                {form.formState.errors.direccion && (
                  <p className="text-xs text-red-500">{form.formState.errors.direccion.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Artes Marciales y Rangos */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Artes Marciales y Rangos</CardTitle>
                  <CardDescription>Asigna artes marciales y rangos al estudiante</CardDescription>
                </div>
                <Button type="button" onClick={agregarArteMarcial} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Arte Marcial
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artesMarcialEstudiante.map((arteMarcial) => (
                  <div key={arteMarcial.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Arte Marcial #{arteMarcial.id}</h4>
                      {artesMarcialEstudiante.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarArteMarcial(arteMarcial.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Arte Marcial</Label>
                        <Select
                          value={arteMarcial.arteMarcialId.toString()}
                          onValueChange={(value) =>
                            actualizarArteMarcial(arteMarcial.id, "arteMarcialId", Number.parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {artesMarciales.map((am) => (
                              <SelectItem key={am.id} value={am.id.toString()}>
                                {am.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Rango</Label>
                        <Select
                          value={arteMarcial.rangoId.toString()}
                          onValueChange={(value) =>
                            actualizarArteMarcial(arteMarcial.id, "rangoId", Number.parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {rangos.map((rango) => (
                              <SelectItem key={rango.id} value={rango.id.toString()}>
                                <div className="flex items-center">
                                  <div
                                    className={`mr-2 h-3 w-3 rounded-full ${
                                      rango.color === "white"
                                        ? "bg-white border border-gray-300"
                                        : `bg-${rango.color}-500`
                                    }`}
                                  />
                                  {rango.nombre}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit" className="bg-red-700 hover:bg-red-800">
            Guardar Estudiante
          </Button>
        </div>
      </form>
    </div>
  )
}
