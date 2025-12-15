import type { ReactNode } from "react";

interface FormLayoutProps {
    children?: ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
    return (
        <form className="flex flex-col gap-3 p-4 bg-slate-800 rounded-md">
            {children}
        </form>
    );
}