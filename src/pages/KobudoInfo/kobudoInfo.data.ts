
import { GiStickGrenade } from "react-icons/gi";
import { GiBaton } from "react-icons/gi";
import { GiSai } from "react-icons/gi";
import { GiNunchaku } from "react-icons/gi";
import { GiBo } from "react-icons/gi";

export const mainWeapons = [
    {
        id: "bo",
        name: "Bo",
        description: "Bastón largo de 1.8 metros",
        icon: GiBo,
        length: "180 cm",
        material: "Roble rojo o blanco",
        origin: "Palo de caminante o herramienta agrícola",
        techniques: ["Tsuki (estocadas)", "Uchi (golpes)", "Barridos", "Bloqueos"],
        color: "yellow"
    },
    {
        id: "sai",
        name: "Sai",
        description: "Tridente de metal para defensa",
        icon: GiSai,
        length: "45-50 cm",
        material: "Acero forjado",
        origin: "Herramienta agrícola o de pesca",
        techniques: ["Golpes de punta", "Bloqueos", "Desarmes"],
        color: "blue"
    },
    {
        id: "tonfa",
        name: "Tonfa",
        description: "Porra con mango lateral",
        icon: GiBaton,
        length: "50-60 cm",
        material: "Madera dura (roble)",
        origin: "Mango de molino de arroz",
        techniques: ["Rotaciones", "Golpes potentes", "Bloqueos", "Controles"],
        color: "red"
    },
    {
        id: "nunchaku",
        name: "Nunchaku",
        description: "Dos palos unidos por cadena o cuerda",
        icon: GiNunchaku,
        length: "30 cm cada palo",
        material: "Madera dura y cadena de acero",
        origin: "Trilladora de arroz",
        techniques: ["Golpes giratorios", "Bloqueos", "Fintas"],
        color: "purple"
    },
    {
        id: "kai",
        name: "Kai",
        description: "Remo okyanawense",
        icon: GiStickGrenade,
        length: "160-180 cm",
        material: "Madera de camelia",
        origin: "Remo de pescador",
        techniques: ["Cortes amplios", "Barridos", "Golpes de hoja", "Defensa marítima"],
        color: "green"
    }
];

interface AdditionalWeapon {
    name: string;
    type: string;
    description: string;
}

export const additionalWeapons: AdditionalWeapon[] = [
    { name: "Korunkua", type: "Báculo", description: "Báculo utilizado por ancianos" },
    { name: "Tekko", type: "Puño de hierro", description: "Armadura de mano metálica" },
    { name: "Tinbei", type: "Escudo y lanza", description: "Escudo de caparazón con lanza corta" },
    { name: "Yari Sai", type: "Escudo y lanza", description: "Escudo de caparazón con lanza corta" },
    { name: "Sansetsukon", type: "Nunchaku triple", description: "Tres secciones unidas por cadenas" },
    { name: "Kama", type: "Hoz", description: "Herramienta agrícola de doble filo" }
];

interface Kata {
    name: string;
    weapon: string;
    level: "Basico" | "Intermedio" | "Avanzado";
    style: string;
}

export const katas: Kata[] = [
    { name: "Hiramatsu no Bo Ichi", weapon: "Bo", level: "Basico", style: "Matayoshi" },
    { name: "Hiramatsu no Bo Ni", weapon: "Bo", level: "Basico", style: "Matayoshi" },
    { name: "Fukyu no Kata", weapon: "Bo", level: "Intermedio", style: "Matayoshi" },
    { name: "Hiramatsu no Bo San", weapon: "Bo", level: "Intermedio", style: "Matayoshi" },
    { name: "Choun no Kon", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
    { name: "Tsuken no Kon", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
    { name: "Daini Ichi", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
    { name: "Shushi no Kun", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
    { name: "Bojitsu", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
    { name: "Sakugawa no Kon", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },
    { name: "Daini San", weapon: "Bo", level: "Avanzado", style: "Matayoshi" },

    { name: "Tawada no Sai Sho", weapon: "Sai", level: "Basico", style: "Matayoshi" },
    { name: "Toyama no Sai", weapon: "Sai", level: "Intermedio", style: "Matayoshi" },
    { name: "Chibana no Sai", weapon: "Sai", level: "Intermedio", style: "Matayoshi" },
    { name: "Nicho Sai", weapon: "Sai", level: "Avanzado", style: "Matayoshi" },
    { name: "Matsumura no Sai", weapon: "Sai", level: "Avanzado", style: "Matayoshi" },
    { name: "Sancho Sai", weapon: "Sai", level: "Avanzado", style: "Matayoshi" },
    { name: "Sinbaru no Sai", weapon: "Sai", level: "Avanzado", style: "Matayoshi" },

    { name: "Hiramatsu no Tonfa Sho", weapon: "Tonfa", level: "Intermedio", style: "Jinbukai" },
    { name: "Tonfa Dai Ichi", weapon: "Tonfa", level: "Avanzado", style: "Jinbukai" },
    { name: "Tonfa Dai Ni", weapon: "Tonfa", level: "Avanzado", style: "Jinbukai" },
    { name: "Hiramatsu no Tonfa Dai", weapon: "Tonfa", level: "Avanzado", style: "Jinbukai" },

    { name: "Nunchaku Sho", weapon: "Nunchaku", level: "Intermedio", style: "Matayoshi" },
    { name: "Nunchaku Kata", weapon: "Nunchaku", level: "Avanzado", style: "Matayoshi" },

    { name: "Kai Sho", weapon: "Kai", level: "Avanzado", style: "Matayoshi" },
    { name: "Kai Kata", weapon: "Kai", level: "Avanzado", style: "Matayoshi" },

    { name: "Korunkua Sho", weapon: "Korunkua", level: "Avanzado", style: "Matayoshi" },
    { name: "Hiramatsu no Tekko", weapon: "Tekko", level: "Avanzado", style: "Matayoshi" },
    { name: "Hiramatsu no Tinbei", weapon: "Tinbei", level: "Avanzado", style: "Matayoshi" },
    { name: "Hiramatsu no Yari Sai", weapon: "Yari Sai", level: "Avanzado", style: "Matayoshi" },
    { name: "Hiramatsu no Sansetsukon", weapon: "Sansetsukon", level: "Avanzado", style: "Matayoshi" },
    { name: "Hiramatsu no Kama", weapon: "Kama", level: "Avanzado", style: "Matayoshi" },
];