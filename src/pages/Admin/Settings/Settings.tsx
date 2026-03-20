import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, Clock, MapPin, Phone, Mail, Globe, Users, Calendar, Shield, Bell, Image, DollarSign, BookOpen, Target, TrendingUp, X, Plus, Trash2, Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function DojoConfigPage() {
  const navigate = useNavigate();

  // Estado principal del dojo
  const [dojoData, setDojoData] = useState({
    name: "Hiramatsukai Dojo Central",
    slogan: "Tradición, disciplina y excelencia en artes marciales",
    description: "Dojo tradicional especializado en Karatedo, Kobudo y Kendo. Más de 30 años formando practicantes de excelencia.",
    address: "Calle del Dojo 123, Barrio Tradicional, Ciudad",
    phone: "+34 912 345 678",
    email: "info@hiramatsukai.com",
    website: "www.hiramatsukai.com",
    instagram: "@hiramatsukai_dojo",
    facebook: "Hiramatsukai Dojo Oficial",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=hiramatsukai&backgroundColor=ffd700",
    banner: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  });

  // Horarios de entrenamiento
  const [schedule, setSchedule] = useState([
    { id: 1, day: "Lunes", time: "18:00 - 20:00", activity: "Karatedo - Todos los niveles", instructor: "Sensei Juan" },
    { id: 2, day: "Martes", time: "18:00 - 20:00", activity: "Kobudo - Intermedios", instructor: "Sensei María" },
    { id: 3, day: "Miércoles", time: "18:00 - 20:00", activity: "Kendo - Principiantes", instructor: "Sensei Carlos" },
    { id: 4, day: "Jueves", time: "18:00 - 20:00", activity: "Karatedo - Avanzados", instructor: "Sensei Juan" },
    { id: 5, day: "Viernes", time: "17:00 - 19:00", activity: "Entrenamiento libre", instructor: "Todos" },
    { id: 6, day: "Sábado", time: "10:00 - 12:00", activity: "Clase familiar", instructor: "Sensei María" }
  ]);

  // Instructores
  const [instructors, setInstructors] = useState([
    { id: 1, name: "Sensei Juan Pérez", rank: "7° Dan", specialty: "Karatedo Goju-Ryu", bio: "Más de 25 años de experiencia" },
    { id: 2, name: "Sensei María López", rank: "5° Dan", specialty: "Kobudo Okinawense", bio: "Especialista en armas tradicionales" },
    { id: 3, name: "Sensei Carlos Sato", rank: "6° Dan", specialty: "Kendo & Iaido", bio: "Maestro certificado por la AJKF" }
  ]);

  // Precios y membresías
  const [pricing, setPricing] = useState([
    { id: 1, name: "Mensual Individual", price: "€50", description: "Acceso a todas las clases regulares" },
    { id: 2, name: "Mensual Familiar", price: "€120", description: "Para 3 o más miembros de la familia" },
    { id: 3, name: "Clase Suelta", price: "€15", description: "Por sesión individual" },
    { id: 4, name: "Trimestral", price: "€135", description: "Ahorra 10% (€45/mes)" }
  ]);

  // Configuración general
  const [config, setConfig] = useState({
    onlineBooking: true,
    automaticReminders: true,
    publicSchedule: true,
    newStudentRegistration: true,
    maintenanceMode: false,
    maxStudentsPerClass: 20,
    minAge: 6,
    trialClass: true,
    trialClassPrice: "Gratis"
  });

  // Estados para edición
  const [editingSchedule, setEditingSchedule] = useState<number | null>(null);
  const [editingInstructor, setEditingInstructor] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<number | null>(null);

  // Estados temporales para edición
  const [tempSchedule, setTempSchedule] = useState<any>(null);
  const [tempInstructor, setTempInstructor] = useState<any>(null);
  const [tempPrice, setTempPrice] = useState<any>(null);

  // Manejar cambios en datos básicos
  const handleDojoDataChange = (field: string, value: string) => {
    setDojoData(prev => ({ ...prev, [field]: value }));
  };

  // Horarios - CRUD
  const handleAddSchedule = () => {
    const newId = schedule.length > 0 ? Math.max(...schedule.map(s => s.id)) + 1 : 1;
    setSchedule(prev => [...prev, {
      id: newId,
      day: "Nuevo día",
      time: "00:00 - 00:00",
      activity: "Nueva actividad",
      instructor: "Nuevo instructor"
    }]);
    setEditingSchedule(newId);
    setTempSchedule({
      day: "Nuevo día",
      time: "00:00 - 00:00",
      activity: "Nueva actividad",
      instructor: "Nuevo instructor"
    });
  };

  const handleEditSchedule = (id: number) => {
    const scheduleItem = schedule.find(s => s.id === id);
    if (scheduleItem) {
      setEditingSchedule(id);
      setTempSchedule({ ...scheduleItem });
    }
  };

  const handleSaveSchedule = () => {
    if (editingSchedule && tempSchedule) {
      setSchedule(prev => prev.map(s =>
        s.id === editingSchedule ? { id: editingSchedule, ...tempSchedule } : s
      ));
      setEditingSchedule(null);
      setTempSchedule(null);
    }
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm("¿Eliminar este horario?")) {
      setSchedule(prev => prev.filter(s => s.id !== id));
    }
  };

  // Instructores - CRUD
  const handleAddInstructor = () => {
    const newId = instructors.length > 0 ? Math.max(...instructors.map(i => i.id)) + 1 : 1;
    setInstructors(prev => [...prev, {
      id: newId,
      name: "Nuevo Instructor",
      rank: "Nuevo Rango",
      specialty: "Nueva Especialidad",
      bio: "Nueva biografía"
    }]);
    setEditingInstructor(newId);
    setTempInstructor({
      name: "Nuevo Instructor",
      rank: "Nuevo Rango",
      specialty: "Nueva Especialidad",
      bio: "Nueva biografía"
    });
  };

  const handleSaveInstructor = () => {
    if (editingInstructor && tempInstructor) {
      setInstructors(prev => prev.map(i =>
        i.id === editingInstructor ? { id: editingInstructor, ...tempInstructor } : i
      ));
      setEditingInstructor(null);
      setTempInstructor(null);
    }
  };

  const handleDeleteInstructor = (id: number) => {
    if (confirm("¿Eliminar este instructor?")) {
      setInstructors(prev => prev.filter(i => i.id !== id));
    }
  };

  // Precios - CRUD
  const handleAddPrice = () => {
    const newId = pricing.length > 0 ? Math.max(...pricing.map(p => p.id)) + 1 : 1;
    setPricing(prev => [...prev, {
      id: newId,
      name: "Nuevo Plan",
      price: "€0",
      description: "Nueva descripción"
    }]);
    setEditingPrice(newId);
    setTempPrice({
      name: "Nuevo Plan",
      price: "€0",
      description: "Nueva descripción"
    });
  };

  const handleSavePrice = () => {
    if (editingPrice && tempPrice) {
      setPricing(prev => prev.map(p =>
        p.id === editingPrice ? { id: editingPrice, ...tempPrice } : p
      ));
      setEditingPrice(null);
      setTempPrice(null);
    }
  };

  const handleDeletePrice = (id: number) => {
    if (confirm("¿Eliminar este precio?")) {
      setPricing(prev => prev.filter(p => p.id !== id));
    }
  };

  // Guardar toda la configuración
  const handleSaveAll = () => {
    // Aquí iría la lógica para guardar en backend
    alert("Configuración guardada exitosamente");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">

          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
              Configuración del Dojo
            </h1>
            <p className="text-sm text-gray-600">Administra toda la información de tu dojo</p>
          </div>

          <Button
            onClick={handleSaveAll}
            className="bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Todo
          </Button>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Información
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horarios
            </TabsTrigger>
            <TabsTrigger value="instructors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Instructores
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Precios
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Ajustes
            </TabsTrigger>
          </TabsList>

          {/* Información Básica */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información General */}
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de tu dojo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dojo-name">Nombre del Dojo</Label>
                    <Input
                      id="dojo-name"
                      value={dojoData.name}
                      onChange={(e) => handleDojoDataChange("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan o Lema</Label>
                    <Input
                      id="slogan"
                      value={dojoData.slogan}
                      onChange={(e) => handleDojoDataChange("slogan", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={dojoData.description}
                      onChange={(e) => handleDojoDataChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contacto y Redes */}
              <Card>
                <CardHeader>
                  <CardTitle>Contacto y Redes Sociales</CardTitle>
                  <CardDescription>Información de contacto pública</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      value={dojoData.address}
                      onChange={(e) => handleDojoDataChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        value={dojoData.phone}
                        onChange={(e) => handleDojoDataChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={dojoData.email}
                        onChange={(e) => handleDojoDataChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      value={dojoData.website}
                      onChange={(e) => handleDojoDataChange("website", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Instagram</Label>
                      <Input
                        value={dojoData.instagram}
                        onChange={(e) => handleDojoDataChange("instagram", e.target.value)}
                        placeholder="@usuario"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Facebook</Label>
                      <Input
                        value={dojoData.facebook}
                        onChange={(e) => handleDojoDataChange("facebook", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Imágenes */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Imágenes del Dojo
                  </CardTitle>
                  <CardDescription>Logo y banner para tu perfil</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Logo del Dojo</Label>
                        <Button variant="outline" size="sm">
                          Cambiar Logo
                        </Button>
                      </div>
                      <div className="h-40 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                          src={dojoData.logo}
                          alt="Logo"
                          className="max-h-full max-w-full object-contain p-4"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Banner del Dojo</Label>
                        <Button variant="outline" size="sm">
                          Cambiar Banner
                        </Button>
                      </div>
                      <div className="h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                          src={dojoData.banner}
                          alt="Banner"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Horarios */}
          <TabsContent value="schedule" className="space-y-6">
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Día</th>
                        <th className="text-left py-3 px-4">Horario</th>
                        <th className="text-left py-3 px-4">Actividad</th>
                        <th className="text-left py-3 px-4">Instructor</th>
                        <th className="text-left py-3 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          {editingSchedule === item.id ? (
                            <>
                              <td className="py-3 px-4">
                                <Input
                                  value={tempSchedule?.day || ""}
                                  onChange={(e) => setTempSchedule(prev => ({ ...prev, day: e.target.value }))}
                                  className="w-full"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <Input
                                  value={tempSchedule?.time || ""}
                                  onChange={(e) => setTempSchedule(prev => ({ ...prev, time: e.target.value }))}
                                  className="w-full"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <Input
                                  value={tempSchedule?.activity || ""}
                                  onChange={(e) => setTempSchedule(prev => ({ ...prev, activity: e.target.value }))}
                                  className="w-full"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <Input
                                  value={tempSchedule?.instructor || ""}
                                  onChange={(e) => setTempSchedule(prev => ({ ...prev, instructor: e.target.value }))}
                                  className="w-full"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={handleSaveSchedule}>
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingSchedule(null)}>
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-3 px-4 font-medium">{item.day}</td>
                              <td className="py-3 px-4">{item.time}</td>
                              <td className="py-3 px-4">{item.activity}</td>
                              <td className="py-3 px-4">{item.instructor}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditSchedule(item.id)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteSchedule(item.id)}
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

            {/* Configuración de horarios */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Horarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Horario público</h4>
                    <p className="text-sm text-gray-500">Mostrar horarios en la web pública</p>
                  </div>
                  <Switch
                    checked={config.publicSchedule}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, publicSchedule: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reserva online</h4>
                    <p className="text-sm text-gray-500">Permitir reservar clases online</p>
                  </div>
                  <Switch
                    checked={config.onlineBooking}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, onlineBooking: checked }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-students">Máximo estudiantes por clase</Label>
                    <Input
                      id="max-students"
                      type="number"
                      value={config.maxStudentsPerClass}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxStudentsPerClass: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-age">Edad mínima</Label>
                    <Input
                      id="min-age"
                      type="number"
                      value={config.minAge}
                      onChange={(e) => setConfig(prev => ({ ...prev, minAge: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructores */}
          <TabsContent value="instructors" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Instructores del Dojo</CardTitle>
                    <CardDescription>Gestiona la información de tus instructores</CardDescription>
                  </div>
                  <Button onClick={handleAddInstructor} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Instructor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {instructors.map((instructor) => (
                    <Card key={instructor.id} className="relative">
                      {editingInstructor === instructor.id ? (
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input
                              value={tempInstructor?.name || ""}
                              onChange={(e) => setTempInstructor(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Rango (Dan)</Label>
                            <Input
                              value={tempInstructor?.rank || ""}
                              onChange={(e) => setTempInstructor(prev => ({ ...prev, rank: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Especialidad</Label>
                            <Input
                              value={tempInstructor?.specialty || ""}
                              onChange={(e) => setTempInstructor(prev => ({ ...prev, specialty: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Biografía</Label>
                            <Textarea
                              value={tempInstructor?.bio || ""}
                              onChange={(e) => setTempInstructor(prev => ({ ...prev, bio: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveInstructor}>
                              Guardar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingInstructor(null)}>
                              Cancelar
                            </Button>
                          </div>
                        </CardContent>
                      ) : (
                        <>
                          <CardContent className="pt-6">
                            <div className="space-y-3">
                              <div className="text-center">
                                <div className="h-16 w-16 mx-auto rounded-full bg-linear-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-xl font-bold mb-2">
                                  {instructor.name.charAt(0)}
                                </div>
                                <h3 className="font-bold text-lg">{instructor.name}</h3>
                                <p className="text-yellow-600 font-medium">{instructor.rank}</p>
                                <p className="text-sm text-gray-600">{instructor.specialty}</p>
                              </div>
                              <p className="text-sm text-gray-700">{instructor.bio}</p>
                            </div>
                          </CardContent>
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingInstructor(instructor.id);
                                setTempInstructor({ ...instructor });
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteInstructor(instructor.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Precios */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Planes y Precios</CardTitle>
                    <CardDescription>Gestiona los planes de membresía</CardDescription>
                  </div>
                  <Button onClick={handleAddPrice} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pricing.map((plan) => (
                    <Card key={plan.id} className="relative">
                      {editingPrice === plan.id ? (
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label>Nombre del Plan</Label>
                            <Input
                              value={tempPrice?.name || ""}
                              onChange={(e) => setTempPrice(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Precio</Label>
                            <Input
                              value={tempPrice?.price || ""}
                              onChange={(e) => setTempPrice(prev => ({ ...prev, price: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Descripción</Label>
                            <Textarea
                              value={tempPrice?.description || ""}
                              onChange={(e) => setTempPrice(prev => ({ ...prev, description: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSavePrice}>
                              Guardar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingPrice(null)}>
                              Cancelar
                            </Button>
                          </div>
                        </CardContent>
                      ) : (
                        <>
                          <CardContent className="pt-6">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold text-lg">{plan.name}</h3>
                                  <p className="text-sm text-gray-600">{plan.description}</p>
                                </div>
                                <span className="text-2xl font-bold text-yellow-600">{plan.price}</span>
                              </div>
                            </div>
                          </CardContent>
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingPrice(plan.id);
                                setTempPrice({ ...plan });
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDeletePrice(plan.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Configuración de precios */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Precios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Clase de prueba gratuita</h4>
                    <p className="text-sm text-gray-500">Ofrecer una clase de prueba gratis</p>
                  </div>
                  <Switch
                    checked={config.trialClass}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, trialClass: checked }))}
                  />
                </div>

                {config.trialClass && (
                  <div className="space-y-2">
                    <Label htmlFor="trial-price">Precio de clase de prueba</Label>
                    <Input
                      id="trial-price"
                      value={config.trialClassPrice}
                      onChange={(e) => setConfig(prev => ({ ...prev, trialClassPrice: e.target.value }))}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ajustes Generales */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuración del Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Configuración del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Modo mantenimiento</h4>
                      <p className="text-sm text-gray-500">Bloquear el acceso público temporalmente</p>
                    </div>
                    <Switch
                      checked={config.maintenanceMode}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Registro de nuevos estudiantes</h4>
                      <p className="text-sm text-gray-500">Permitir registro online</p>
                    </div>
                    <Switch
                      checked={config.newStudentRegistration}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, newStudentRegistration: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Recordatorios automáticos</h4>
                      <p className="text-sm text-gray-500">Enviar recordatorios de clases</p>
                    </div>
                    <Switch
                      checked={config.automaticReminders}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, automaticReminders: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Seguridad */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Seguridad y Acceso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Registrar de Acceso
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Permisos de Usuarios
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Análisis de Actividad
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Configuración de Alertas
                  </Button>
                </CardContent>
              </Card>

              {/* Backup y Exportación */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Backup y Exportación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Save className="h-8 w-8 mb-2" />
                      <span>Backup Completo</span>
                      <span className="text-xs text-gray-500">Todo el sistema</span>
                    </Button>

                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Users className="h-8 w-8 mb-2" />
                      <span>Exportar Estudiantes</span>
                      <span className="text-xs text-gray-500">Lista CSV/Excel</span>
                    </Button>

                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Calendar className="h-8 w-8 mb-2" />
                      <span>Exportar Horarios</span>
                      <span className="text-xs text-gray-500">Calendario</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Icono personalizado para Settings
function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}