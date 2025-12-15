import type { ReactNode } from "react";
import { toPng } from "html-to-image";

interface GeneratorPageLayoutProps {
    children?: ReactNode;
    nodes: {
        ref: HTMLDivElement | null,
        filename: string
    }[]
    numberOfPdf: number
}

export default function GeneratorPageLayout({ children, nodes, numberOfPdf }: GeneratorPageLayoutProps) {
    const handleDownloadAll = async () => {
        for (const node of nodes) {
            if (!node.ref) continue;
            try {
                const dataUrl = await toPng(node.ref, { cacheBust: true });
                const link = document.createElement("a");
                link.download = node.filename;
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error("Erreur pendant la génération de", node.filename, error);
            }
        }

    };

    return (
        <main className="ml-[360px] flex-1 relative flex flex-col items-center justify-start overflow-hidden">
            <button
                onClick={handleDownloadAll}
                className="fixed top-4 right-4 z-30 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/30 transition"
            >
                ⬇ Télécharger les {numberOfPdf} PNG
            </button>

            <section className="w-full h-screen overflow-x-hidden  px-8 py-10 flex flex-col items-center mb-4 md:flex">
                <h2 className="text-sm font-semibold mb-6 mt-2 self-start">
                    Prévisualisation
                </h2>

                <div className="h-screen">
                    <div
                        className="scale-[0.45] flex flex-col items-center gap-10 origin-top origin-center"
                    >
                        {children}
                    </div>
                </div>
            </section>
        </main>
    );
}