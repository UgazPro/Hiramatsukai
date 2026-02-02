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
    const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

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
        <div className="flex items-center relative w-full">
            <div className="absolute -top-2 left-0 right-0 w-[95%] mx-auto z-50">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                    <div className="flex justify-around">
                        {leftSteps.map((step, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    stepRefs.current[index] = el;
                                }}
                                onClick={() => changeStep(index)}
                                className="cursor-pointer"
                            >
                                <div className={`w-5 h-5 rounded-full ${index <= safeSelectedIndex ? "bg-red-600" : "bg-white border-gray-500 border-2"}`}></div>
                                <p>{step.year}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-60 sm:w-80 md:w-120" />

                    <div className="flex justify-around">
                        {rightSteps.map((step, index) => {
                            const realIndex = index + leftSteps.length;
                            return (
                                <div
                                    key={realIndex}
                                    ref={(el) => {
                                        stepRefs.current[realIndex] = el;
                                    }}
                                    onClick={() => changeStep(realIndex)}
                                    className="cursor-pointer"
                                >
                                    <div className={`w-5 h-5 rounded-full ${realIndex <= safeSelectedIndex ? "bg-red-600" : "bg-white border-gray-500 border-2"}`}></div>
                                    <p>{step.year}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute w-full flex items-center justify-center -top-14">
                <div className="border-2 rounded-lg w-60 sm:w-80 md:w-120 h-28 shadow-2xl bg-white p-4 z-50">
                    <div className="flex items-center justify-start w-full gap-4">
                        <Swords className="h-18 w-1/4 text-red-500" />

                        <div className="">
                            <p className="font-bold text-lg">{currentStep?.label}</p>
                            <p>{currentStep?.year}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={progressContainerRef} className="w-full">
                <Progress value={progress} className="w-full" />
            </div>
        </div>
    )
}
