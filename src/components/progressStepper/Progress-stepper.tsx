import { Progress } from "@/components/ui/progress"
import { Swords } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ProgressStepperProps<T> {
    year: string;
    label: string;
    name: T;
    active: boolean;
}

interface ProgressStepperPropsArray<T> {
    steps: ProgressStepperProps<T>[];
    onSelectStep: (step: T) => void;
}

export const ProgressStepper = <T,>({ steps, onSelectStep }: ProgressStepperPropsArray<T>) => {
    const [progress, setProgress] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const progressContainerRef = useRef<HTMLDivElement | null>(null);
    const stepRefs = useRef<Array<HTMLElement | null>>([]);

    const safeSelectedIndex = Math.min(selectedIndex, Math.max(0, steps.length - 1));
    const currentStep = steps[safeSelectedIndex];
    const selectedName = currentStep?.name;

    const midIndex = Math.ceil(steps.length / 2);
    const leftSteps = steps.slice(0, midIndex);
    const rightSteps = steps.slice(midIndex);

    const animateProgress = (target: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(() => {
            setProgress((prev) => {
                const diff = target - prev;

                if (Math.abs(diff) < 1) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    return target;
                }

                const direction = diff > 0 ? 1 : -1;
                const next = prev + direction;

                if ((direction > 0 && next >= target) || (direction < 0 && next <= target)) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    return target;
                }

                return next;
            });
        }, 10);
    };

    const getTargetProgressPercent = useCallback((stepIndex: number) => {
        const totalSteps = steps.length;
        if (totalSteps === 0) return 0;
        if (stepIndex >= totalSteps - 1) return 100;

        const container = progressContainerRef.current;
        const stepEl = stepRefs.current[stepIndex];
        if (!container || !stepEl) {
            // Fallback (should be rare): approximate across the bar.
            return (stepIndex / Math.max(1, totalSteps - 1)) * 100;
        }

        const barRect = container.getBoundingClientRect();
        const stepRect = stepEl.getBoundingClientRect();
        const stepCenterX = stepRect.left + stepRect.width / 2;
        const rawPercent = ((stepCenterX - barRect.left) / barRect.width) * 100;

        return Math.max(0, Math.min(100, rawPercent));
    }, [steps.length]);

    useEffect(() => {
        if (steps.length === 0) return;

        const timeoutId = window.setTimeout(() => {
            requestAnimationFrame(() => {
                // Sync initial selection with parent and align bar precisely.
                if (selectedName !== undefined) {
                    onSelectStep(selectedName);
                }
                animateProgress(getTargetProgressPercent(safeSelectedIndex));
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
        // Important: depend on length (not array identity) to avoid resets on parent re-renders.
    }, [getTargetProgressPercent, onSelectStep, safeSelectedIndex, selectedName, steps.length]);

    const changeStep = (stepIndex: number) => {
        const selectedStep = steps[stepIndex];
        if (!selectedStep) return;

        setSelectedIndex(stepIndex);
        onSelectStep(selectedStep.name);

        requestAnimationFrame(() => {
            animateProgress(getTargetProgressPercent(stepIndex));
        });
    }


    return (
        <div className="relative flex w-full items-center">
            <div className="absolute -top-2 left-0 right-0 z-50 mx-auto w-[95%]">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                    <div className="flex justify-around">
                        {leftSteps.map((step, index) => (
                            <button
                                key={index}
                                type="button"
                                ref={(el) => {
                                    stepRefs.current[index] = el;
                                }}
                                onClick={() => changeStep(index)}
                                aria-label={`Ver ${step.label} (${step.year})`}
                                className="group flex cursor-pointer flex-col items-center gap-1 rounded-lg px-1 py-0.5 focus-visible:outline-offset-4"
                            >
                                <span className={`h-4 w-4 rounded-full border-2 transition-colors duration-200 ${index <= safeSelectedIndex ? "border-brand-vermilion bg-brand-vermilion" : "border-brand-ink/30 bg-brand-washi group-hover:border-brand-vermilion/60"}`} />
                                <span className={`text-[10px] font-medium ${index <= safeSelectedIndex ? "text-brand-vermilion" : "text-brand-muted"}`}>{step.year}</span>
                            </button>
                        ))}
                    </div>

                    <div className="w-60 sm:w-80 md:w-120" />

                    <div className="flex justify-around">
                        {rightSteps.map((step, index) => {
                            const realIndex = index + leftSteps.length;
                            return (
                                <button
                                    key={realIndex}
                                    type="button"
                                    ref={(el) => {
                                        stepRefs.current[realIndex] = el;
                                    }}
                                    onClick={() => changeStep(realIndex)}
                                    aria-label={`Ver ${step.label} (${step.year})`}
                                    className="group flex cursor-pointer flex-col items-center gap-1 rounded-lg px-1 py-0.5 focus-visible:outline-offset-4"
                                >
                                    <span className={`h-4 w-4 rounded-full border-2 transition-colors duration-200 ${realIndex <= safeSelectedIndex ? "border-brand-vermilion bg-brand-vermilion" : "border-brand-ink/30 bg-brand-washi group-hover:border-brand-vermilion/60"}`} />
                                    <span className={`text-[10px] font-medium ${realIndex <= safeSelectedIndex ? "text-brand-vermilion" : "text-brand-muted"}`}>{step.year}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute -top-16 flex w-full items-center justify-center">
                <div className="glass z-50 flex h-28 w-60 items-center gap-4 rounded-2xl p-4 sm:w-80 md:w-120">
                    <Swords className="h-16 w-1/4 shrink-0 text-brand-vermilion" aria-hidden="true" />

                    <div>
                        <p className="font-serif text-lg font-semibold text-brand-ink">{currentStep?.label}</p>
                        <p className="text-sm text-brand-muted">{currentStep?.year}</p>
                    </div>
                </div>
            </div>
            <div ref={progressContainerRef} className="w-full">
                <Progress value={progress} className="w-full" />
            </div>
        </div>
    )
}
