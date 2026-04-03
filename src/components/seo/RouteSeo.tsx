import { useEffect } from "react";
import { useLocation } from "react-router";

type SeoConfig = {
    title: string;
    description: string;
    canonicalPath: string;
    robots?: string;
};

const SITE_URL = "https://hiramatsukai.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/Hiramatsukai.jpg`;

const SEO_BY_PATH: Record<string, SeoConfig> = {
    "/": {
        title: "Hiramatsukai | Karate-Do, Kobudo y Kendo Iaido",
        description:
            "Hiramatsukai Internacional: escuela de artes marciales tradicionales con formacion en Goju-Ryu Karate-Do, Kobudo Okinawense y Kendo Iaido.",
        canonicalPath: "/",
        robots: "index, follow",
    },
    "/nosotros": {
        title: "Nosotros | Hiramatsukai Internacional",
        description:
            "Conoce la historia, filosofia y equipo de Hiramatsukai Internacional.",
        canonicalPath: "/nosotros",
        robots: "index, follow",
    },
    "/karatedo": {
        title: "Karate-Do Goju-Ryu | Hiramatsukai",
        description:
            "Descubre el Goju-Ryu Karate-Do: fundamentos, katas y beneficios del entrenamiento tradicional.",
        canonicalPath: "/karatedo",
        robots: "index, follow",
    },
    "/kobudo": {
        title: "Kobudo Okinawense | Hiramatsukai",
        description:
            "Explora el Kobudo Okinawense y sus armas tradicionales en la linea Matayoshi.",
        canonicalPath: "/kobudo",
        robots: "index, follow",
    },
    "/kendoIaido": {
        title: "Kendo e Iaido | Hiramatsukai",
        description:
            "Conoce Kendo e Iaido: camino de la espada japonesa, tecnica, disciplina y tradicion.",
        canonicalPath: "/kendoIaido",
        robots: "index, follow",
    },
    "/login": {
        title: "Iniciar Sesion | Hiramatsukai",
        description: "Acceso de usuarios a la plataforma Hiramatsukai.",
        canonicalPath: "/login",
        robots: "noindex, nofollow",
    },
    "/admin": {
        title: "Panel Administrativo | Hiramatsukai",
        description: "Panel administrativo interno.",
        canonicalPath: "/admin",
        robots: "noindex, nofollow",
    },
};

function upsertMeta(name: string, content: string) {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
}

function upsertPropertyMeta(property: string, content: string) {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
}

function upsertCanonical(url: string) {
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
    }
    link.setAttribute("href", url);
}

function normalizePath(pathname: string): string {
    if (pathname.startsWith("/admin")) return "/admin";
    return pathname;
}

export default function RouteSeo() {
    const location = useLocation();

    useEffect(() => {
        const normalizedPath = normalizePath(location.pathname);
        const fallback: SeoConfig = {
            title: "Hiramatsukai Internacional",
            description: "Escuela de artes marciales tradicionales.",
            canonicalPath: normalizedPath,
            robots: "index, follow",
        };

        const seo = SEO_BY_PATH[normalizedPath] ?? fallback;
        const canonicalUrl = `${SITE_URL}${seo.canonicalPath}`;

        document.title = seo.title;

        upsertMeta("description", seo.description);
        upsertMeta("robots", seo.robots ?? "index, follow");

        upsertCanonical(canonicalUrl);

        upsertPropertyMeta("og:type", "website");
        upsertPropertyMeta("og:title", seo.title);
        upsertPropertyMeta("og:description", seo.description);
        upsertPropertyMeta("og:url", canonicalUrl);
        upsertPropertyMeta("og:image", DEFAULT_OG_IMAGE);

        upsertMeta("twitter:card", "summary_large_image");
        upsertMeta("twitter:title", seo.title);
        upsertMeta("twitter:description", seo.description);
        upsertMeta("twitter:image", DEFAULT_OG_IMAGE);
    }, [location.pathname]);

    return null;
}
