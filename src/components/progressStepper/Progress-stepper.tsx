
import { Progress } from "@/components/ui/progress"
import { Swords } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

export interface ProgressStepperProps {
    year: string;
    label: string;
    active: boolean;
}

interface ProgressStepperPropsArray {
    steps: ProgressStepperProps[];
}

export const ProgressStepper: FC<ProgressStepperPropsArray> = ({ steps }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState<ProgressStepperProps>({} as ProgressStepperProps);
    const [localSteps, setLocalSteps] = useState<ProgressStepperProps[]>(steps);
    const intervalRef = useRef<number | null>(null);

    const animateProgress = (target: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(() => {
            setProgress((prev) => {
                const direction = target > prev ? 1 : -1;
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

    useEffect(() => {
        setLocalSteps(steps);
    }, [steps]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const totalSteps = steps.length;
            const spanRatio = 0.75;
            const sideOffsetRatio = (1 - spanRatio) / 2;
            const baseOffsetPercent = sideOffsetRatio * 100;

            if (totalSteps <= 1) {
                animateProgress(baseOffsetPercent);
                return;
            }

            const firstStepPercent = baseOffsetPercent;
            animateProgress(firstStepPercent);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [steps]);

    const changeStep = (stepIndex: number) => {
        setCurrentStep(steps[stepIndex]);
        setLocalSteps((prev) =>
            prev.map((step, index) => ({
                ...step,
                active: index <= stepIndex,
            }))
        );

        const totalSteps = steps.length;
        const spanRatio = 0.75;
        const sideOffsetRatio = (1 - spanRatio) / 2;
        const baseOffsetPercent = sideOffsetRatio * 100;
        if (totalSteps <= 1) {
            setProgress(baseOffsetPercent);
            return;
        }
        const isLastStep = stepIndex === totalSteps - 1;
        const stepPercent = isLastStep
            ? 100
            : spanRatio * (stepIndex / (totalSteps - 1)) * 100 + baseOffsetPercent;
        animateProgress(stepPercent);
    }


    return (
        <div className="flex items-center relative w-full">
            <div className="absolute -top-1.5 left-0 right-0 flex justify-around w-3/4 mx-auto z-50">
                {localSteps.map((step, index) => (
                    <div key={index} onClick={() => changeStep(index)} className="cursor-pointer">
                        <div className={`w-5 h-5 rounded-full ${step.active ? "bg-red-600" : "bg-gray-100 border-gray-900 border-2"}`}></div>
                        <p>{step.year}</p>
                    </div>
                ))}
            </div>

            <div className="absolute w-full flex items-center justify-center -top-14">
                <div className="border-2 rounded-lg w-120 h-32 shadow-2xl bg-white p-4 z-50">
                    <div className="flex items-center justify-between w-full gap-4">
                        <Swords className="h-24 w-1/4 text-red-500" />

                        <div className="">
                            <p className="font-bold text-lg">{currentStep.label}</p>
                            <p>{currentStep.year}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Progress value={progress} className="w-full" />
        </div>
    )
}
