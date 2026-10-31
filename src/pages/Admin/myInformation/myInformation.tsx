import { useState } from "react";
import {
  Camera, Check, Edit, Eye, EyeOff, Key, Loader2, Mail, Phone, Shield, User, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/hooks/useStudents";
import { useUpdateProfile, useChangePassword } from "@/queries/useProfileMutations";
import { CalendarFieldComponent } from "@/components/form/renderFormComponents/CalendarFieldComponent";
import ProfileSkeleton from "@/pages/Admin/Profile/ProfileSkeleton";
import { LiaIdCardSolid } from "react-icons/lia";
import { toast } from "sonner";
import {
  dateFormatterIntoLong, formatIdentification, formatPhoneWithCode, isValidEmail,
  parseStoredPhone, sanitizeAlphanumeric, sanitizeLetters, splitIdentification,
} from "@/helpers/formatter";
import { IdentificationFieldComponent } from "@/components/form/renderFormComponents/IdentificationFieldComponent";
import { PhoneFieldComponent } from "@/components/form/renderFormComponents/PhoneFieldComponent";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]).{8,}$/;
const PASSWORD_REQUIREMENTS = [
  { label: "Al menos 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Un número", test: (p: string) => /\d/.test(p) },
  { label: "Un carácter especial (!@#$%^&*...)", test: (p: string) => /[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/.test(p) },
];

interface EditData {
  name: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  phoneCountryCode: string;
  address: string;
  identification: string;
  identificationType: string;
  sex: string;
  birthday: string;
}

const EMPTY_EDIT_DATA: EditData = {
  name: "",
  lastName: "",
  email: "",
  username: "",
  phone: "",
  phoneCountryCode: "+58",
  address: "",
  identification: "",
  identificationType: "V",
  sex: "",
  birthday: "",
};

export default function MyInformation() {
  const { data: me, isLoading } = useMe();
  const queryClient = useQueryClient();
  const updateProfile = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditData>(EMPTY_EDIT_DATA);

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPasswords, setShowPasswords] = useState(false);

  const refreshAfterSave = () => {
    queryClient.invalidateQueries({ queryKey: ["me"] });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const startEditing = () => {
    const { countryCode, digits: phoneDigits } = parseStoredPhone(me?.phone ?? "");
    const { type, digits: idDigits } = splitIdentification(me?.identification ?? "");

    setEditData({
      name: me?.name ?? "",
      lastName: me?.lastName ?? "",
      email: me?.email ?? "",
      username: me?.username ?? "",
      phone: phoneDigits,
      phoneCountryCode: countryCode,
      address: me?.address ?? "",
      identification: idDigits,
      identificationType: type,
      sex: me?.sex ?? "",
      birthday: me?.birthday ? new Date(me.birthday).toISOString() : "",
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditData(EMPTY_EDIT_DATA);
    setIsEditing(false);
  };

  const saveAll = () => {
    const { identificationType, phoneCountryCode, ...restEditData } = editData;

    const payload = {
      ...restEditData,
      identification: `${identificationType}-${editData.identification}`,
      phone: `${phoneCountryCode}${editData.phone}`,
      dojoId: me?.dojo?.id,
      enrollmentDate: me?.enrollmentDate,
      rolesIds: me?.roles?.map((r) => r.id) ?? [],
      martialArtRank: me?.userRanks.map((rank) => ({
        martialArtId: rank.martialArt.id,
        rankId: rank.rank.id,
      })),
    };

    updateProfile.mutate(
      { data: payload },
      {
        onSuccess: () => {
          toast.success("Perfil actualizado correctamente");
          setIsEditing(false);
          refreshAfterSave();
        },
        onError: () => {
          toast.error("Error al actualizar el perfil");
        },
      }
    );
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
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
              onSuccess: () => {
                toast.success("Avatar actualizado");
                refreshAfterSave();
              },
              onError: () => toast.error("Error al actualizar avatar"),
            }
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!me) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        No se encontraron datos del usuario.
      </div>
    );
  }

  const roles = me.roles?.map((r) => r.rol).join(", ") ?? "";
  const rankMain = me.userRanks?.[0]
    ? `${me.userRanks[0].rank.rank_name} Cinturón ${me.userRanks[0].rank.belt} ${me.userRanks[0].rank.code} (${me.userRanks[0].martialArt.martialArt})`
    : "";
  const rankKobudo = me.userRanks?.[1]
    ? `${me.userRanks[1].rank.rank_name} Cinturón ${me.userRanks[1].rank.belt} ${me.userRanks[1].rank.code} (${me.userRanks[1].martialArt.martialArt})`
    : "";

  const renderReadItem = (label: string, value?: string) => (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium break-words text-foreground">{value || "—"}</p>
    </div>
  );

  const renderEditItem = (label: string, id: string, children: React.ReactNode) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );

  return (
    <div className="w-full p-3 sm:p-4 md:p-6">
      <div className="mx-auto grid w-full   grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Header de perfil */}
        <Card className="overflow-hidden border-brand-gold/30 shadow-lg lg:col-span-1">
          <div className="h-24 bg-linear-to-r from-brand-gold to-brand-gold-deep" />

          <CardContent className="relative pt-16 pb-4">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative group">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-brand-gold shadow-xl overflow-hidden flex items-center justify-center">
                  {me.profileImg ? (
                    <img
                      src={me.profileImg}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {me.name?.[0] || ""}{me.lastName?.[0] || ""}
                    </span>
                  )}
                </div>
                <label className="absolute right-1 bottom-1 flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-gold text-white transition-all duration-300 hover:scale-110 hover:bg-brand-gold-deep">
                  <Camera className="h-4 w-4" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
            </div>

            <div className="text-center mt-2 space-y-3">
              <h2 className="text-xl font-bold break-words text-foreground sm:text-2xl">
                {me.name} {me.lastName}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">@{me.username}</p>

              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="border-brand-indigo/20 bg-brand-indigo/10 text-xs font-medium text-brand-indigo sm:text-sm px-3 py-1">
                  {me.dojo?.dojo}
                </Badge>
              </div>

              {roles && (
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="text-xs sm:text-sm font-medium px-3 py-1">
                    <Shield className="h-3.5 w-3.5 mr-1" />
                    {roles}
                  </Badge>
                </div>
              )}

              {(rankMain || rankKobudo) && (
                <div className="flex flex-wrap justify-center gap-2">
                  {rankMain && (
                    <span className="max-w-full rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-medium break-words text-brand-gold-deep sm:text-sm">
                      {rankMain}
                    </span>
                  )}
                  {rankKobudo && (
                    <span className="max-w-full rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-medium break-words text-brand-gold-deep sm:text-sm">
                      {rankKobudo}
                    </span>
                  )}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-foreground flex-wrap">
                <div className="flex min-w-0 items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 truncate text-sm sm:text-base">{me.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="text-sm sm:text-base">{formatPhoneWithCode(me.phone)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LiaIdCardSolid className="h-4 w-4 shrink-0" />
                  <span className="text-sm sm:text-base">{formatIdentification(me.identification)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex w-full flex-col gap-2 lg:col-span-2">
          {/* Información personal */}
          <Card className="shadow-lg border-border">
            <CardHeader className="pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <User className="h-5 w-5 text-brand-gold-deep" />
                    Información Personal
                  </CardTitle>
                  <CardDescription>
                    {isEditing ? "Edita tu información personal" : "Consulta y actualiza tu información personal"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-brand-gold hover:bg-brand-gold-deep"
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

            <CardContent className="px-4 pb-8">
              {isEditing ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {renderEditItem("Nombre", "edit-name", (
                    <Input
                      id="edit-name"
                      value={editData.name}
                      onChange={(e) => setEditData((prev) => ({ ...prev, name: sanitizeLetters(e.target.value) }))}
                    />
                  ))}
                  {renderEditItem("Apellido", "edit-lastName", (
                    <Input
                      id="edit-lastName"
                      value={editData.lastName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, lastName: sanitizeLetters(e.target.value) }))}
                    />
                  ))}
                  {renderEditItem("Nombre de usuario", "edit-username", (
                    <Input
                      id="edit-username"
                      value={editData.username}
                      onChange={(e) => setEditData((prev) => ({ ...prev, username: sanitizeAlphanumeric(e.target.value) }))}
                    />
                  ))}
                  {renderEditItem("Correo electrónico", "edit-email", (
                    <>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                      {editData.email && !isValidEmail(editData.email) && (
                        <p className="text-xs text-destructive">Correo electrónico inválido</p>
                      )}
                    </>
                  ))}
                  {renderEditItem("Teléfono", "edit-phone", (
                    <PhoneFieldComponent
                      id="edit-phone"
                      value={editData.phone}
                      countryCode={editData.phoneCountryCode}
                      onValueChange={(value) => setEditData((prev) => ({ ...prev, phone: value }))}
                      onCountryChange={(countryCode) => setEditData((prev) => ({ ...prev, phoneCountryCode: countryCode }))}
                    />
                  ))}
                  {renderEditItem("Cédula", "edit-identification", (
                    <IdentificationFieldComponent
                      id="edit-identification"
                      value={editData.identification}
                      typeValue={(editData.identificationType || "V") as "V" | "E" | "NIT" | "C.I"}
                      onValueChange={(value) => setEditData((prev) => ({ ...prev, identification: value }))}
                      onTypeChange={(type) => setEditData((prev) => ({ ...prev, identificationType: type }))}
                    />
                  ))}
                  {renderEditItem("Dirección", "edit-address", (
                    <Input
                      id="edit-address"
                      value={editData.address}
                      onChange={(e) => setEditData((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  ))}
                  {renderEditItem("Sexo", "edit-sex", (
                    <Select
                      value={editData.sex}
                      onValueChange={(value) => setEditData((prev) => ({ ...prev, sex: value }))}
                    >
                      <SelectTrigger id="edit-sex" className="w-full">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                  ))}
                  {renderEditItem("Fecha de nacimiento", "edit-birthday", (
                    <CalendarFieldComponent
                      value={editData.birthday ? new Date(editData.birthday) : undefined}
                      onChange={(date) => setEditData((prev) => ({ ...prev, birthday: date ? date.toISOString() : "" }))}
                      placeholder="Selecciona tu fecha de nacimiento"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                  {renderReadItem("Nombre", me.name)}
                  {renderReadItem("Apellido", me.lastName)}
                  {renderReadItem("Nombre de usuario", `@${me.username}`)}
                  {renderReadItem("Correo electrónico", me.email)}
                  {renderReadItem("Teléfono", formatPhoneWithCode(me.phone))}
                  {renderReadItem("Cédula", formatIdentification(me.identification))}
                  {renderReadItem("Dirección", me.address)}
                  {renderReadItem("Sexo", me.sex)}
                  {renderReadItem("Fecha de nacimiento", dateFormatterIntoLong(me.birthday))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card className="shadow-lg border-border">
            <CardHeader className="pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-brand-gold-deep" />
                  <CardTitle className="text-lg sm:text-xl">Cambiar Contraseña</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPasswords((prev) => !prev)}
                >
                  {showPasswords ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  {showPasswords ? "Ocultar" : "Mostrar"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <form onSubmit={handlePasswordSubmit} className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                        <p key={req.label} className={`text-xs flex items-center gap-1 ${req.test(passwords.new) ? "text-green-600" : "text-muted-foreground"}`}>
                          <Check className={`h-3 w-3 ${req.test(passwords.new) ? "text-green-600" : "text-muted-foreground"}`} />
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
                    <p className={`text-xs flex items-center gap-1 ${passwordsMatch ? "text-green-600" : "text-destructive"}`}>
                      <Check className={`h-3 w-3 ${passwordsMatch ? "text-green-600" : "text-destructive"}`} />
                      {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                    </p>
                  )}
                </div>

                <Button type="submit" className="h-11 w-full sm:col-span-2 sm:w-auto sm:justify-self-start xl:col-span-3" disabled={!canSubmitPassword || changePasswordMutation.isPending}>
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
        </div>
      </div>
    </div>
  );
}
