import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import { LoginSchema } from "./Login.data";
import { LoginForm, googleLogInData } from "@/services/auth/auth.interface";
import { useLoginMutation, useGoogleLoginMutation } from "@/queries/useAuthMutations";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";

export default function Login() {
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginMutation = useLoginMutation();
    const googleLoginMutation = useGoogleLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setLoginErrorMessage("");
        try {
            await loginMutation.mutateAsync(data);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error al iniciar sesión";
            setLoginErrorMessage(message);
            setTimeout(() => setLoginErrorMessage(""), 2500);
        }
    };

    const onGoogleSuccess = async (googleResponse: googleLogInData) => {
        setLoginErrorMessage("");
        try {
            if (!googleResponse.credential) throw new Error("No se obtuvo credencial de Google");
            await googleLoginMutation.mutateAsync({ token: googleResponse.credential });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error al iniciar sesión con Google";
            setLoginErrorMessage(message);
            setTimeout(() => setLoginErrorMessage(""), 2500);
        }
    };

    const isLoading = loginMutation.isPending || googleLoginMutation.isPending;

    return (
        <div className="relative min-h-[calc(100dvh-4.5rem)] w-full lg:min-h-[calc(100dvh-5rem)]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-wood opacity-30"
            />

            <div className="relative grid w-full items-stretch gap-8 px-2 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10 lg:py-14">

                {/* Panel visual */}
                <div className="relative hidden overflow-hidden rounded-4xl border border-white/10 bg-brand-sumi lg:block">
                    <img
                        src="/Hiramatsukai.jpg"
                        alt="Practicantes de Hiramatsukai entrenando en el dojo"
                        className="absolute inset-0 h-full w-full object-cover object-[55%_35%] opacity-60"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi via-brand-sumi/75 to-brand-sumi/35" />
                    <div aria-hidden="true" className="absolute inset-0 bg-wood-dark opacity-20" />
                    <div aria-hidden="true" className="absolute -left-16 top-1/4 h-64 w-64 rounded-full bg-brand-gold/10 blur-[90px]" />

                    <div className="relative flex h-full min-h-[34rem] flex-col justify-between p-10">
                        <Link
                            to="/"
                            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-brand-washi/80 backdrop-blur-md transition-colors duration-300 hover:bg-white/10 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Volver al inicio
                        </Link>

                        <div className="flex flex-col gap-6">
                            <span className="section-eyebrow text-brand-gold">Hiramatsukai Internacional</span>

                            <div className="flex items-center gap-5">
                                <span className="shrink-0 rounded-full bg-white p-1.5 shadow-lift ring-1 ring-brand-gold/50">
                                    <img
                                        src="/oki2.png"
                                        alt="Emblema de Hiramatsukai Karatedo"
                                        className="size-20 rounded-full object-contain"
                                    />
                                </span>
                                <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-white xl:text-5xl">
                                    Bienvenido
                                    <span className="mt-1 block text-brand-gold">de vuelta</span>
                                </h1>
                            </div>

                            <div aria-hidden="true" className="gold-rule h-px w-40" />

                            <p className="max-w-md text-base leading-relaxed text-brand-washi/75">
                                Accede a tu panel para gestionar alumnos, horarios y actividades de tu dojo.
                            </p>
                        </div>

                        <p className="text-xs leading-relaxed text-brand-washi/40">
                            Disciplina · Respeto · Excelencia
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex w-fit items-center gap-2 rounded-full text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground lg:hidden"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Volver al inicio
                    </Link>

                    <Card className="w-[98%] max-w-md mx-auto rounded-4xl border-border/60 bg-card/85 shadow-lift backdrop-blur-xl">
                        <CardHeader className="gap-2 px-6 pt-6 sm:px-8 sm:pt-8">
                            <div className="mb-1 flex items-center justify-center gap-3 lg:justify-start">
                                <img
                                    src="/oki2.png"
                                    alt="Hiramatsukai"
                                    className="size-10 rounded-full bg-white object-contain ring-1 ring-brand-gold/40"
                                />
                                <span className="font-script text-2xl leading-none text-brand-ink">Hiramatsukai</span>
                            </div>
                            <CardTitle className="font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                                Iniciar sesión
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Ingresa tus credenciales para acceder al panel de tu dojo.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-6"
                                aria-busy={isLoading}
                            >
                                {loginErrorMessage && (
                                    <Alert
                                        variant="destructive"
                                        className="rounded-2xl border-destructive/25 bg-destructive/5"
                                    >
                                        <AlertCircle aria-hidden="true" />
                                        <AlertTitle>No pudimos iniciar sesión</AlertTitle>
                                        <AlertDescription>{loginErrorMessage}</AlertDescription>
                                    </Alert>
                                )}

                                <FieldGroup className="gap-5">
                                    <Field data-invalid={!!errors.username}>
                                        <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>
                                        <Input
                                            id="username"
                                            placeholder="ShidoinUgaz"
                                            autoComplete="username"
                                            autoCapitalize="none"
                                            spellCheck={false}
                                            aria-invalid={!!errors.username}
                                            disabled={isLoading}
                                            className="h-11 rounded-xl"
                                            {...register("username")}
                                        />
                                        <FieldError errors={[errors.username]} />
                                    </Field>

                                    <Field data-invalid={!!errors.password}>
                                        <div className="flex items-center justify-between gap-2">
                                            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                                            <Link
                                                to="#"
                                                className="text-xs font-medium text-brand-vermilion underline-offset-4 transition-colors duration-300 hover:text-brand-vermilion-dark hover:underline"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                        <InputGroup className="h-11 rounded-xl">
                                            <InputGroupInput
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                aria-invalid={!!errors.password}
                                                disabled={isLoading}
                                                {...register("password")}
                                            />
                                            <InputGroupAddon align="inline-end" className="pr-1.5">
                                                <InputGroupButton
                                                    size="icon-sm"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                                    aria-pressed={showPassword}
                                                    disabled={isLoading}
                                                    className="size-9 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                                                </InputGroupButton>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FieldError errors={[errors.password]} />
                                    </Field>
                                </FieldGroup>

                                <Button
                                    type="submit"
                                    variant="brand"
                                    size="lg"
                                    disabled={isLoading}
                                    className="h-12 w-full rounded-full text-base"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden="true" />
                                            Ingresando...
                                        </>
                                    ) : (
                                        "Iniciar sesión"
                                    )}
                                </Button>

                                <FieldSeparator className="text-xs">
                                    o continúa con
                                </FieldSeparator>

                                <div className="flex w-full justify-center overflow-hidden [&>div]:max-w-full">
                                    <GoogleLogin
                                        onSuccess={onGoogleSuccess}
                                        onError={() => setLoginErrorMessage("Error al iniciar sesión con Google")}
                                        theme="outline"
                                        shape="pill"
                                        size="large"
                                        text="signin_with"
                                        width={300}
                                    />
                                </div>

                                <p className="text-center text-sm text-muted-foreground">
                                    ¿Aún no perteneces a un dojo?{" "}
                                    <Link
                                        to="/#dojos"
                                        className="font-medium text-brand-vermilion underline-offset-4 hover:underline"
                                    >
                                        Encuentra un dojo
                                    </Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
