import { useEffect, useState } from "react";
import {
  Save, Clock, MapPin, Phone, Mail, Globe, Users, Image, DollarSign, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DojoBody, DojoScheduleBody, DojoSocialMedia, IDojoInfo, IDojoMartialArts } from "@/services/dojos/dojo.interface";
import { useCreateDojoMonthlyPayment, useCreateDojoPaymentMethod, useCreateDojoSchedules, useDeleteDojoSchedule, useDojoMartialArts, useDojoMonthlyPayments, useDojoPaymentMethods, useDojosInfo, useUpdateDojoInfo, useUpdateDojoMonthlyPayment, useUpdateDojoPaymentMethod, useUpdateDojoSchedules } from "@/hooks/useDojos";
import { useUserData } from "@/helpers/token";
import { IProfile } from "@/services/profile/profile.interface";
import { Controller, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { MonthlyPaymentBody, PaymentMethodBody } from "@/services/dojos/payments.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CalendarFieldComponent } from "@/components/form/renderFormComponents/CalendarFieldComponent";

import Schedule from "../Schedule/Schedule";
import { PaymentsSettings } from "../Payments/PaymentsSettings";

const FALLBACK_DOJO_IMAGE = "https://blog.marti.mx/wp-content/uploads/2023/01/conoce-que-es-karate-jpg.webp";


export default function DojoConfigPage() {

  const user: IProfile = useUserData() as IProfile;
console.log(user)
  const { data: dojo, isLoading: isDojoLoading } = useDojosInfo(user.dojo.code || "");
  
  const form = useForm<DojoBody>({
    defaultValues: {
      dojo: dojo?.dojo || "",
      address: dojo?.address || "",
      addressShort: dojo?.addressShort || "",
      code: dojo?.code || "",
      phone: dojo?.phone || "",
      email: dojo?.email || "",
      description: dojo?.description || "",
      founded: dojo?.founded || "",
      slogan: dojo?.slogan || "",
      translate: dojo?.translate || "",
      latitude: dojo?.latitude || 0,
      longitude: dojo?.longitude || 0,
      martialArts: dojo?.dojoMartialArts.map(ma => ma.id) || [],
      socialMedia: dojo?.socialMedia || [],
    }
  });

  const [socialMedia, setSocialMedia] = useState<DojoSocialMedia[]>([]);

  const typesSocialMedia = ["Facebook", "Instagram", "TikTok", "YouTube"];
  const createSchedulesMutation = useCreateDojoSchedules();
  const updateSchedulesMutation = useUpdateDojoSchedules();
  const deleteScheduleMutation = useDeleteDojoSchedule();
  const createPaymentMethodMutation = useCreateDojoPaymentMethod();
  const createMonthlyPaymentMutation = useCreateDojoMonthlyPayment();
  const updatePaymentMethodMutation = useUpdateDojoPaymentMethod();
  const updateMonthlyPaymentMutation = useUpdateDojoMonthlyPayment();
  const updateDojoInfoMutation = useUpdateDojoInfo();
  const { data: paymentMethods = [], isLoading: isPaymentMethodsLoading } = useDojoPaymentMethods();
  const { data: monthlyPayments = [], isLoading: isMonthlyPaymentsLoading } = useDojoMonthlyPayments();

  const martialArtsOptions: IDojoMartialArts[] = useDojoMartialArts().data || [];
  const [martialArts, setMartialArts] = useState<IDojoMartialArts[]>([]);

  const normalizeSocialMedia = (items: DojoSocialMedia[] = []) => {
    return [...items]
      .map((item) => ({
        socialMedia: item.socialMedia,
        link: item.link || "",
        directUrl: item.directUrl || "",
      }))
      .sort((a, b) => a.socialMedia.localeCompare(b.socialMedia));
  };

  const normalizeMartialArtsIds = (items: IDojoMartialArts[] = []) => {
    return items.map((item) => item.id).sort((a, b) => a - b);
  };

  const hasSocialMediaChanges = dojo
    ? JSON.stringify(normalizeSocialMedia(socialMedia)) !==
    JSON.stringify(normalizeSocialMedia(dojo.socialMedia || []))
    : false;

  const hasMartialArtsChanges = dojo
    ? JSON.stringify(normalizeMartialArtsIds(martialArts)) !==
    JSON.stringify(normalizeMartialArtsIds(dojo.dojoMartialArts || []))
    : false;

  const hasMainInfoChanges = form.formState.isDirty || hasSocialMediaChanges || hasMartialArtsChanges;

  const handleChangeSocialMedia = (name: string, value: string) => {
    const determinated = value.includes('https') ? 'directUrl' : 'link';

    setSocialMedia(prev => prev.map(sm => {
      if (sm.socialMedia === name) {
        return { ...sm, [determinated]: value };
      }
      return sm;
    }))
  }

  const addNewSocialMedia = (type: string) => {
    if (socialMedia.some(sm => sm.socialMedia === type)) return;
    setSocialMedia(prev => [...prev, { socialMedia: type, link: "", directUrl: "" }]);
  }

  const addMartialArt = (type: IDojoMartialArts) => {
    if (martialArts.some(ma => ma.id === type.id)) return;
    setMartialArts(prev => [...prev, type]);
  }

  useEffect(() => {
    if (dojo) {
      form.reset({
        dojo: dojo.dojo,
        address: dojo.address,
        addressShort: dojo.addressShort,
        code: dojo.code,
        phone: dojo.phone,
        email: dojo.email,
        description: dojo.description,
        founded: dojo.founded,
        slogan: dojo.slogan,
        translate: dojo.translate,
        latitude: dojo.latitude,
        longitude: dojo.longitude,
        martialArts: dojo.dojoMartialArts.map(ma => ma.id),
        socialMedia: dojo.socialMedia,
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSocialMedia(dojo.socialMedia);
      setMartialArts(dojo.dojoMartialArts);
    }
  }, [dojo, form])

  // Guardar toda la configuración
  const handleSaveAll = () => {
    // Aquí iría la lógica para guardar en backend
    form.handleSubmit(updateDojo)();
  };

  const setImageDojo = (logo: string): string => {
    if (logo && logo.trim() !== "") {
      return `${import.meta.env.VITE_API_URL}/api${logo}`
    }
    return FALLBACK_DOJO_IMAGE;
  }

  const getBannerDojo = (dojo: IDojoInfo | undefined): string => {
    if (!dojo) return FALLBACK_DOJO_IMAGE;
    const findBanner = dojo.dojoImages.find(img => img.type === "banner");
    if (findBanner && findBanner.url && findBanner.url.trim() !== "") {
      return `${import.meta.env.VITE_API_URL}/api${findBanner.url}`
    }
    return FALLBACK_DOJO_IMAGE;
  }

  const updateDojo = async (data: DojoBody) => {

    if (!dojo?.id) return;

    const payload = {
      ...data,
      socialMedia: socialMedia,
      martialArts: martialArts.map(ma => ma.id),
    }


    await updateDojoInfoMutation.mutateAsync({
      dojoId: dojo.id,
      dojoInfo: payload,
    });
  }

  const saveSchedule = async (schedules: DojoScheduleBody[]) => {
    if (!dojo?.id || schedules.length === 0) return;
    await createSchedulesMutation.mutateAsync({
      dojoId: dojo.id,
      schedules,
    });
  }

  const updateSchedule = async (scheduleId: number, schedule: DojoScheduleBody) => {
    if (!dojo?.id) return;

    await updateSchedulesMutation.mutateAsync({
      dojoId: dojo.id,
      schedules: [{ ...schedule, id: scheduleId }],
    });
  }

  const deleteSchedule = async (scheduleId: number) => {
    await deleteScheduleMutation.mutateAsync({ scheduleId });
  }

  const createPaymentMethod = async (paymentMethodData: PaymentMethodBody) => {
    await createPaymentMethodMutation.mutateAsync(paymentMethodData);
  }

  const createMonthlyPayment = async (monthlyPaymentData: MonthlyPaymentBody) => {
    await createMonthlyPaymentMutation.mutateAsync(monthlyPaymentData);
  }

  const updatePaymentMethod = async (id: number, paymentMethodData: PaymentMethodBody) => {
    await updatePaymentMethodMutation.mutateAsync({ id, paymentMethodData });
  }

  const updateMonthlyPayment = async (id: number, monthlyPaymentData: MonthlyPaymentBody) => {
    await updateMonthlyPaymentMutation.mutateAsync({ id, monthlyPaymentData });
  }

  const resolverImageUrl = (url: string) => {
    return `/${url}`;
  }

  if (isDojoLoading) {
    return (
      <div className="min-h-full bg-linear-to-b from-background to-muted/40 p-3 sm:p-4 md:p-6">
        <div className="mx-auto w-full   space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 w-72 bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-60 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="h-10 w-36 bg-muted rounded-md animate-pulse" />
          </div>

          <div className="h-10 w-full md:w-2/3 bg-muted rounded-md animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pt-4">
                <div className="h-6 w-40 bg-muted rounded-md animate-pulse" />
                <div className="h-4 w-56 bg-muted rounded-md animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                <div className="h-28 w-full bg-muted rounded-md animate-pulse" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pt-4">
                <div className="h-6 w-52 bg-muted rounded-md animate-pulse" />
                <div className="h-4 w-64 bg-muted rounded-md animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                <div className="h-24 w-full bg-muted rounded-md animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-linear-to-b from-background to-muted/40 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mx-auto w-full  ">
        <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:mb-8 sm:flex-row">

          <div className="min-w-0 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-heading md:text-3xl">
              Configuración del Dojo
            </h1>
            <p className="text-sm text-muted-foreground">Administra toda la información de tu dojo</p>
          </div>

          <Button
            onClick={handleSaveAll}
            disabled={!dojo?.id || !hasMainInfoChanges || updateDojoInfoMutation.isPending}
            className="h-11 w-full bg-linear-to-r from-brand-gold to-brand-gold-deep text-white hover:from-brand-gold-deep hover:to-brand-gold-deep sm:h-9 sm:w-auto"
          >
            <Save data-icon="inline-start" />
            Guardar Todo
          </Button>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 md:grid-cols-4 lg:mb-3">
            <TabsTrigger value="info" className="flex min-h-11 items-center justify-center gap-2 px-2 text-xs sm:text-sm">
              <Globe className="h-5 w-5 md:h-4 md:w-4" />
              <span>Información</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex min-h-11 items-center justify-center gap-2 px-2 text-xs sm:text-sm">
              <Clock className="h-5 w-5 md:h-4 md:w-4" />
              <span>Horarios</span>
            </TabsTrigger>
            <TabsTrigger value="instructors" className="flex min-h-11 items-center justify-center gap-2 px-2 text-xs sm:text-sm">
              <Users className="h-5 w-5 md:h-4 md:w-4" />
              <span>Instructores</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex min-h-11 items-center justify-center gap-2 px-2 text-xs sm:text-sm">
              <DollarSign className="h-5 w-5 md:h-4 md:w-4" />
              <span>Planes</span>
            </TabsTrigger>
          </TabsList>

          {/* Información Básica */}
          <TabsContent value="info" className="space-y-6">
            <form onSubmit={form.handleSubmit(updateDojo)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Información General */}
              <Card>
                <CardHeader className="pt-4">
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Datos básicos de tu dojo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="dojo-name">Nombre del Dojo</Label>
                    <Input
                      id="dojo-name"
                      {...form.register("dojo")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="translate">Traducción <span className="text-xs font-normal text-muted-foreground">(Traducción o Significado del dojo)</span></Label>
                    <Input
                      id="translate"
                      {...form.register("translate")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan o Lema</Label>
                    <Input
                      id="slogan"
                      {...form.register("slogan")}
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label>Fecha de Fundación del Dojo</Label>
                    <Controller
                      control={form.control}
                      name='founded'
                      render={({ field: controllerField }) => (
                        <CalendarFieldComponent
                          value={controllerField.value as Date}
                          onChange={controllerField.onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción <span className="text-xs font-normal text-muted-foreground">(Opcional)</span></Label>
                    <Textarea
                      id="description"
                      {...form.register("description")}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Label htmlFor="martialArts">Artes Marciales</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button type="button" className="h-11 sm:h-9">Abrir</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {martialArtsOptions.map((type, index) => (
                            <DropdownMenuItem onClick={() => addMartialArt(type)} key={index} disabled={martialArts.some(ma => ma.id === type.id)}>{type.martialArt}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {martialArts.map((ma, index) => (
                        <div className="space-y-2" key={index}>
                          <div className="flex items-center justify-between">
                            <Label><img src={resolverImageUrl(ma.icon)} alt={ma.martialArt} className={ma.martialArt === "Kobudo" ? "h-7 w-9" : "h-8 w-8"} /> {ma.martialArt}</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" type="button" size="icon" className="lg:ml-auto" onClick={() => setMartialArts(prev => prev.filter(m => m.id !== ma.id))}>
                                  <X className="h-4 w-4 text-destructive" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Eliminar Arte Marcial</p>
                              </TooltipContent>
                            </Tooltip>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contacto y Redes */}
              <Card className="">
                <CardHeader className="pt-4">
                  <CardTitle>Contacto y Redes Sociales</CardTitle>
                  <CardDescription>Información de contacto pública</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressShort" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Dirección Resumida
                    </Label>
                    <Input
                      id="addressShort"
                      {...form.register("addressShort")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Dirección Completa
                    </Label>
                    <Textarea
                      id="address"
                      {...form.register("address")}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        {...form.register("phone")}
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
                        {...form.register("email")}
                      />
                    </div>
                  </div>

                  <Separator />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label>Redes Sociales</Label>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" className="h-11 sm:h-9">Agregar Nueva</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {typesSocialMedia.map((type, index) => (
                          <DropdownMenuItem onClick={() => addNewSocialMedia(type)} key={index} disabled={socialMedia.some(sm => sm.socialMedia === type)}>{type}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {socialMedia.map((sm, index) => (
                      <div className="space-y-2" key={index}>
                        <div className="flex items-center justify-between">
                          <Label>{sm.socialMedia}</Label>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" type="button" size="icon" className="ml-auto" onClick={() => setSocialMedia(prev => prev.filter(s => s.socialMedia !== sm.socialMedia))}>
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Eliminar Red Social</p>
                            </TooltipContent>
                          </Tooltip>

                        </div>
                        <Input
                          value={sm.directUrl !== '' ? sm.directUrl : sm.link}
                          onChange={(e) => handleChangeSocialMedia(sm.socialMedia, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Imágenes */}
              <Card className="lg:col-span-2">
                <CardHeader className="pt-4">
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Imágenes del Dojo
                  </CardTitle>
                  <CardDescription>Logo y banner para tu perfil</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Logo del Dojo</Label>
                        <Button variant="outline" size="sm" className="h-11 sm:h-8">
                          Cambiar Logo
                        </Button>
                      </div>
                      <div className="h-40 bg-card rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                        <img
                          src={setImageDojo(dojo?.logo || "")}
                          alt="Logo"
                          className="max-h-full max-w-full object-contain p-4"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Banner del Dojo</Label>
                        <Button variant="outline" size="sm" className="h-11 sm:h-8">
                          Cambiar Banner
                        </Button>
                      </div>
                      <div className="h-40 bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                        <img
                          src={getBannerDojo(dojo)}
                          alt="Banner"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* Horarios */}
          <TabsContent value="schedule" className="space-y-6">
            <Schedule
              martialArtsOptions={dojo?.dojoMartialArts || []}
              schedules={dojo?.Schedules || []}
              submitSchedule={saveSchedule}
              updateSchedule={updateSchedule}
              deleteSchedule={deleteSchedule}
            />
          </TabsContent>

          {/* Instructores */}
          <TabsContent value="instructors" className="space-y-6">
            <Card>
              <CardHeader className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Instructores del Dojo</CardTitle>
                    <CardDescription>Gestiona la información de tus instructores</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dojo && dojo.masters && dojo.masters.map((instructor) => (
                    <Card key={instructor.id} className="relative">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="text-center">
                            <div className="h-16 w-16 mx-auto rounded-full bg-linear-to-br from-brand-gold to-brand-gold-deep flex items-center justify-center text-white text-xl font-bold mb-2">
                              {instructor.name.charAt(0)}
                            </div>
                            <h3 className="font-bold text-lg">{instructor.name} {instructor.lastName}</h3>
                            {instructor.userRanks[0] && (
                              <p className="text-brand-gold-deep font-medium">{instructor.userRanks[0].rank.rank_name}</p>
                            )}
                            {/* <p className="text-sm text-muted-foreground">{instructor.specialty}</p> */}
                          </div>
                          {/* <p className="text-sm text-foreground">{instructor.bio}</p> */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planes */}
          <TabsContent value="plans" className="space-y-6">
            <PaymentsSettings
              monthlyPayments={monthlyPayments}
              paymentMethods={paymentMethods}
              isMonthlyPaymentsLoading={isMonthlyPaymentsLoading}
              isPaymentMethodsLoading={isPaymentMethodsLoading}
              onCreateMonthlyPayment={createMonthlyPayment}
              onCreatePaymentMethod={createPaymentMethod}
              onUpdateMonthlyPayment={updateMonthlyPayment}
              onUpdatePaymentMethod={updatePaymentMethod}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}