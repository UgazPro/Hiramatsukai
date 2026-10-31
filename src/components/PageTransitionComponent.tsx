
interface PageTransitionComponentProps {
    primaryChildren: React.ReactNode;
    secondaryChildren: React.ReactNode;
    toggle: boolean;
}

export default function PageTransitionComponent({ primaryChildren, secondaryChildren, toggle } : PageTransitionComponentProps) {
    return (
        <div className="relative h-full w-full overflow-hidden">

            <div
                className={`flex h-full w-[200%] transition-transform duration-500 ease-in-out ${toggle ? '-translate-x-1/2' : 'translate-x-0'}`}
            >

                <div
                    aria-hidden={toggle}
                    inert={toggle}
                    className="h-full w-1/2 min-w-0 shrink-0 overflow-y-auto overflow-x-hidden overscroll-contain"
                >
                    {primaryChildren}
                </div>

                <div
                    aria-hidden={!toggle}
                    inert={!toggle}
                    className="h-full w-1/2 min-w-0 shrink-0 overflow-y-auto overflow-x-hidden overscroll-contain"
                >
                    {secondaryChildren}
                </div>

            </div>
        </div>
    );
}
