import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

interface Option {
    label: string;
    value: string | number;
}

interface MultiSelectFieldProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    options?: Option[];
    disabled?: boolean;
    placeholder: string;
}

export function MultiSelectField<TFieldValues extends FieldValues>({ form, name, label, options = [], disabled, placeholder, }: MultiSelectFieldProps<TFieldValues>) {

    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // detectar si abre arriba o abajo
    const calculatePosition = () => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        setOpenUp(spaceBelow < 260 && spaceAbove > spaceBelow);
    };

    return (
        <div className="space-y-2 relative" ref={ref}>
            <Label>{label}</Label>

            <Controller
                control={form.control}
                name={name}
                render={({ field }) => {
                    const selected: Array<string | number> = Array.isArray(field.value) ? field.value : [];
                    const isNumberOption = typeof options?.[0]?.value === "number";

                    const toggleOption = (value: string | number) => {
                        const normalizedValue = isNumberOption ? Number(value) : String(value);
                        const exists = selected.some((v) => String(v) === String(normalizedValue));

                        if (exists) {
                            field.onChange(selected.filter((v) => String(v) !== String(normalizedValue)));
                        } else {
                            field.onChange([...selected, normalizedValue]);
                        }
                    };

                    const removeOption = (value: string | number) => {
                        field.onChange(selected.filter((v) => String(v) !== String(value)));
                    };

                    return (
                        <>
                            {/* INPUT */}
                            <div
                                onClick={() => {
                                    if (disabled) return;
                                    calculatePosition();
                                    setOpen(!open);
                                }}
                                className="flex items-center justify-between border rounded-md px-3 py-2 bg-white cursor-pointer hover:border-gray-400 transition"
                            >
                                <p className="text-gray-500 text-sm">
                                    {selected.length === 0
                                        ? placeholder
                                        : `${selected.length} seleccionados`}
                                </p>

                                <ChevronDown
                                    className={`w-4 h-4 text-gray-500 transition ${open ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* DROPDOWN */}
                            {open && (
                                <div
                                    className={`absolute z-50 w-full bg-white border rounded-xl shadow-xl p-2 max-h-64 overflow-auto transition-all ${openUp ? "bottom-full mb-2 animate-in slide-in-from-bottom-2" : "top-full mt-1 animate-in slide-in-from-top-2"}`}
                                >
                                    {options.map((opt) => {
                                        const isSelected = selected.some((v) => String(v) === String(opt.value));

                                        return (
                                            <div
                                                key={String(opt.value)}
                                                onClick={() => toggleOption(opt.value)}
                                                className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                            >
                                                <span className="text-sm">{opt.label}</span>

                                                {isSelected && (
                                                    <Check className="w-4 h-4 text-blue-600" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* BADGES */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selected.map((value) => {
                                    const opt = options.find((o) => String(o.value) === String(value));
                                    return (
                                        <span
                                            key={String(value)}
                                            onDoubleClick={() => removeOption(value)}
                                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium cursor-pointer hover:bg-blue-200 transition"
                                            title="Doble click para quitar"
                                        >
                                            {opt?.label}
                                        </span>
                                    );
                                })}
                            </div>
                        </>
                    );
                }}
            />
        </div>
    );
}
