interface DetailLayoutProps {
    header: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function DetailLayout({ header, children, footer }: DetailLayoutProps) {
    return (
        <div className="mx-auto my-3 w-[calc(100%-1rem)] max-w-6xl rounded-xl border border-border bg-card p-3 shadow-xl sm:my-6 md:p-6">
            {header}

            <div className="space-y-4 py-4 md:space-y-8 md:py-6">
                {children}
            </div>

            {footer}
        </div>
    );
}
