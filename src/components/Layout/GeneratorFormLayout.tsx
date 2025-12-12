import type { ReactNode } from "react";

interface GeneratorFormLayoutProps {
    children?: ReactNode;
}

export default function GeneratorFormLayout({ children }: GeneratorFormLayoutProps) {
    return (
        <aside className="fixed top-0 left-0 w-full md:w-[360px] h-screen bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto z-20">
            <h2 className="text-sm font-semibold mb-3">🎨 Formulaire :</h2>
            {children}
        </aside>
    )
}