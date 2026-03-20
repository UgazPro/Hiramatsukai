import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Camera, Eye, EyeOff, Save, X, Mail, Phone, Calendar, User, Shield, Bell, Globe, LogOut, CreditCard, Activity, Key, Smartphone, Check, Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Profile() {
  const navigate = useNavigate();

  // Estado del usuario
  const [userData, setUserData] = useState({
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    username: "juan_dojo",
    phone: "+34 612 345 678",
    dob: "1990-05-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    bio: "Practicante de artes marciales apasionado por el crecimiento personal y la disciplina.",
    dojo: "Hiramatsukai Dojo Central",
    rank: "Cinturón Marrón",
    joinDate: "2022-03-10"
  });

  // Estado para contraseñas
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Estados de visibilidad
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Estado de edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  // 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notificaciones
  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    news: true,
    promotions: false
  });

  // Manejar cambio de contraseña
  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para cambiar la contraseña
    alert("Contraseña actualizada correctamente");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  // Manejar edición de campos
  const startEditing = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    if (editingField) {
      setUserData(prev => ({ ...prev, [editingField]: tempValue }));
    }
    setEditingField(null);
    setTempValue("");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  // Cambiar avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserData(prev => ({ ...prev, avatar: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar notificaciones
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Cerrar sesión
  const handleLogout = () => {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-center mb-8">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
            Mi Perfil
          </h1>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información personal */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tarjeta de perfil */}
            <Card className="border-yellow-200 shadow-lg overflow-hidden">
              <div className="h-24 bg-linear-to-r from-yellow-500 to-yellow-600" />

              <CardContent className="relative pt-16">
                {/* Avatar */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <label className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Información básica */}
                <div className="text-center mt-2 space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                    {userData.name}
                  </h2>
                  <p className="text-gray-600">@{userData.username}</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {userData.rank}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {userData.dojo}
                    </span>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4" />
                      <span>{userData.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Mi Actividad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Días entrenados</span>
                    <span className="font-bold text-blue-600">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Asistencia</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Katas aprendidos</span>
                    <span className="font-bold text-yellow-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Miembro desde</span>
                    <span className="font-medium">{new Date(userData.joinDate).getFullYear()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Configuraciones */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Seguridad
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificaciones
                </TabsTrigger>
              </TabsList>

              {/* Pestaña General */}
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <div className="flex gap-2">
                        <Input
                          id="name"
                          value={editingField === 'name' ? tempValue : userData.name}
                          onChange={(e) => setTempValue(e.target.value)}
                          onFocus={() => startEditing('name', userData.name)}
                          disabled={editingField !== 'name' && editingField !== null}
                        />
                        {editingField === 'name' ? (
                          <div className="flex gap-1">
                            <Button size="icon" onClick={saveEdit}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => startEditing('name', userData.name)}
                            disabled={editingField !== null}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          type="email"
                          value={editingField === 'email' ? tempValue : userData.email}
                          onChange={(e) => setTempValue(e.target.value)}
                          onFocus={() => startEditing('email', userData.email)}
                          disabled={editingField !== 'email' && editingField !== null}
                        />
                        {editingField === 'email' ? (
                          <div className="flex gap-1">
                            <Button size="icon" onClick={saveEdit}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => startEditing('email', userData.email)}
                            disabled={editingField !== null}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <div className="flex gap-2">
                        <Input
                          id="username"
                          value={editingField === 'username' ? tempValue : userData.username}
                          onChange={(e) => setTempValue(e.target.value)}
                          onFocus={() => startEditing('username', userData.username)}
                          disabled={editingField !== 'username' && editingField !== null}
                        />
                        {editingField === 'username' ? (
                          <div className="flex gap-1">
                            <Button size="icon" onClick={saveEdit}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => startEditing('username', userData.username)}
                            disabled={editingField !== null}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          value={editingField === 'phone' ? tempValue : userData.phone}
                          onChange={(e) => setTempValue(e.target.value)}
                          onFocus={() => startEditing('phone', userData.phone)}
                          disabled={editingField !== 'phone' && editingField !== null}
                        />
                        {editingField === 'phone' ? (
                          <div className="flex gap-1">
                            <Button size="icon" onClick={saveEdit}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => startEditing('phone', userData.phone)}
                            disabled={editingField !== null}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Biografía */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        placeholder="Cuéntanos algo sobre ti..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña Seguridad */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-yellow-600" />
                      Cambiar Contraseña
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPass ? "text" : "password"}
                            value={passwords.current}
                            onChange={(e) => handlePasswordChange("current", e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowCurrentPass(!showCurrentPass)}
                          >
                            {showCurrentPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPass ? "text" : "password"}
                            value={passwords.new}
                            onChange={(e) => handlePasswordChange("new", e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowNewPass(!showNewPass)}
                          >
                            {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPass ? "text" : "password"}
                            value={passwords.confirm}
                            onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                          >
                            {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Actualizar Contraseña
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      Autenticación de Dos Factores
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Autenticación por aplicación</h4>
                        <p className="text-sm text-gray-500">Usa Google Authenticator</p>
                      </div>
                      <div
                        className={`h-6 w-11 rounded-full relative cursor-pointer transition-colors ${twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300'}`}
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      >
                        <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-transform ${twoFactorEnabled ? 'left-6' : 'left-1'}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña Notificaciones */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium capitalize">{key}</h4>
                          <p className="text-sm text-gray-500">
                            {key === 'email' && 'Recibe notificaciones por email'}
                            {key === 'reminders' && 'Recordatorios de clases'}
                            {key === 'news' && 'Novedades del dojo'}
                            {key === 'promotions' && 'Promociones especiales'}
                          </p>
                        </div>
                        <div
                          className={`h-6 w-11 rounded-full relative cursor-pointer transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
                          onClick={() => toggleNotification(key as keyof typeof notifications)}
                        >
                          <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-transform ${value ? 'left-6' : 'left-1'}`} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}