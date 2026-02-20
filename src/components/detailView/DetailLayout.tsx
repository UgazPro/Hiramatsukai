interface DetailLayoutProps {
    header: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function DetailLayout({ header, children, footer }: DetailLayoutProps) {
    return (
        <div className="min-h-full p-6 w-full max-w-6xl mx-auto my-6 bg-white shadow-xl border border-gray-200 rounded-xl">
            {header}

            <div className="p-6 space-y-8">
                {children}
            </div>

            {footer && (
                <div className="sticky bottom-0 bg-white border-t border-gray-300 p-4 z-20">
                    {footer}
                </div>
            )}
        </div>
    );
}
