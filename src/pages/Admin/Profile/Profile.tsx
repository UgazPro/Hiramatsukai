import { useState } from "react";
import {
  Camera, Eye, EyeOff, Mail, Phone, User, Shield, Bell, Activity, Key, Smartphone, Check, Edit, Loader2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/queries/useProfileQueries";
import { useUpdateProfile, useChangePassword } from "@/queries/useProfileMutations";
import ProfileSkeleton from "./ProfileSkeleton";
import { toast } from "sonner";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]).{8,}$/;
const PASSWORD_REQUIREMENTS = [
  { label: "Al menos 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Un número", test: (p: string) => /\d/.test(p) },
  { label: "Un carácter especial (!@#$%^&*...)", test: (p: string) => /[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/.test(p) },
];

export default function Profile() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    identification: "",
  });

  const startEditing = () => {
    setEditData({
      name: profile?.name ?? "",
      lastName: profile?.lastName ?? "",
      email: profile?.email ?? "",
      username: profile?.username ?? "",
      phone: profile?.phone ?? "",
      address: profile?.address ?? "",
      identification: profile?.identification ?? "",
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveAll = () => {
    updateProfile.mutate(
      { data: editData },
      {
        onSuccess: () => {
          toast.success("Perfil actualizado correctamente");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Error al actualizar el perfil");
        },
      }
    );
  };

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [showPasswords, setShowPasswords] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    news: true,
    promotions: false
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const newPasswordValid = PASSWORD_REGEX.test(passwords.new);
  const passwordsMatch = passwords.new === passwords.confirm && passwords.confirm !== "";
  const canSubmitPassword = passwords.current && newPasswordValid && passwordsMatch;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!newPasswordValid) {
      toast.error("La contraseña no cumple con los requisitos");
      return;
    }

    changePasswordMutation.mutate(
      { oldPassword: passwords.current, password: passwords.new },
      {
        onSuccess: () => {
          toast.success("Contraseña actualizada correctamente");
          setPasswords({ current: "", new: "", confirm: "" });
        },
        onError: () => {
          toast.error("Error al actualizar la contraseña. Verifica tu contraseña actual.");
        },
      }
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProfile.mutate(
            { data: {}, imageFile: file },
            {
              onSuccess: () => toast.success("Avatar actualizado"),
              onError: () => toast.error("Error al actualizar avatar"),
            }
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const displayName = isEditing ? editData.name : (profile?.name ?? "");
  const displayLastName = isEditing ? editData.lastName : (profile?.lastName ?? "");
  const displayUsername = isEditing ? editData.username : (profile?.username ?? "");
  const displayEmail = isEditing ? editData.email : (profile?.email ?? "");
  const displayPhone = isEditing ? editData.phone : (profile?.phone ?? "");
  const displayIdentification = isEditing ? editData.identification : (profile?.identification ?? "");
  const displayAddress = isEditing ? editData.address : (profile?.address ?? "");
  const displayDojo = profile?.dojo?.dojo ?? "";
  const displayRank = profile?.userRanks?.[0]?.rank?.rank_name ?? "";
  const displayJoinDate = profile?.enrollmentDate ?? "";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
            Mi Perfil
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-yellow-200 shadow-lg overflow-hidden">
              <div className="h-24 bg-linear-to-r from-yellow-500 to-yellow-600" />

              <CardContent className="relative pt-16">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                      <Camera className="h-4 w-4" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                  </div>
                </div>

                <div className="text-center mt-2 space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                    {displayName} {displayLastName}
                  </h2>
                  <p className="text-gray-600">@{displayUsername}</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {displayRank}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {displayDojo}
                    </span>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      <span>{displayEmail}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4" />
                      <span>{displayPhone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4" />
                      <span>{displayIdentification}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <span className="font-medium">
                      {displayJoinDate ? new Date(displayJoinDate).getFullYear() : "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha */}
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
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>
                          {isEditing ? "Edita tu información personal" : "Actualiza tu información personal"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <Button
                              size="sm"
                              className="bg-yellow-500 hover:bg-yellow-600"
                              onClick={saveAll}
                              disabled={updateProfile.isPending}
                            >
                              {updateProfile.isPending ? (
                                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 mr-1" />
                              )}
                              Guardar
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEditing}>
                              <X className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" onClick={startEditing}>
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Nombre */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={isEditing ? editData.name : displayName}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>

                      {/* Apellido */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          value={isEditing ? editData.lastName : displayLastName}
                          onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editData.email : displayEmail}
                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <Input
                        id="username"
                        value={isEditing ? editData.username : displayUsername}
                        onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editData.phone : displayPhone}
                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Cédula */}
                    <div className="space-y-2">
                      <Label htmlFor="identification">Cédula</Label>
                      <Input
                        id="identification"
                        value={isEditing ? editData.identification : displayIdentification}
                        onChange={(e) => setEditData(prev => ({ ...prev, identification: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        value={isEditing ? editData.address : displayAddress}
                        onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña Seguridad */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-yellow-600" />
                        <CardTitle>Cambiar Contraseña</CardTitle>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPasswords(!showPasswords)}
                      >
                        {showPasswords ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {showPasswords ? "Ocultar" : "Mostrar"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <Input
                          id="current-password"
                          type={showPasswords ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => handlePasswordChange("current", e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input
                          id="new-password"
                          type={showPasswords ? "text" : "password"}
                          value={passwords.new}
                          onChange={(e) => handlePasswordChange("new", e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                        {passwords.new && (
                          <div className="mt-2 space-y-1">
                            {PASSWORD_REQUIREMENTS.map((req) => (
                              <p key={req.label} className={`text-xs flex items-center gap-1 ${req.test(passwords.new) ? "text-green-600" : "text-gray-500"}`}>
                                <Check className={`h-3 w-3 ${req.test(passwords.new) ? "text-green-600" : "text-gray-400"}`} />
                                {req.label}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <Input
                          id="confirm-password"
                          type={showPasswords ? "text" : "password"}
                          value={passwords.confirm}
                          onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                        {passwords.confirm && (
                          <p className={`text-xs flex items-center gap-1 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
                            <Check className={`h-3 w-3 ${passwordsMatch ? "text-green-600" : "text-red-500"}`} />
                            {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                          </p>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={!canSubmitPassword || changePasswordMutation.isPending}>
                        {changePasswordMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Actualizando...
                          </>
                        ) : (
                          "Actualizar Contraseña"
                        )}
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
