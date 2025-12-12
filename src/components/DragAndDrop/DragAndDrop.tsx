import { useCallback, useState } from "react";
import type { FormData } from "../Form/FormPanel";

interface DragAndDropProps {
    data: {
        imageBase64: string
    }
    onChange: (field: keyof FormData, value: FormData[keyof FormData]) => void;
}

export default function DragAndDrop({ data, onChange }: DragAndDropProps) {
    const [isDragging, setIsDragging] = useState(false);

    const readFileAsBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });


    const handleDrop = useCallback(
        async (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files?.[0];
            if (!file) return;

            const base64 = await readFileAsBase64(file);
            onChange("imageUrl", file.name);
            onChange("imageBase64", base64);
        },
        [onChange]
    );

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const base64 = await readFileAsBase64(file);
        onChange("imageUrl", file.name);
        onChange("imageBase64", base64);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-200">
                Image (fichier)
            </label>

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg px-4 py-6 text-center text-sm cursor-pointer transition 
            ${isDragging
                        ? "border-indigo-400 bg-indigo-400/10"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                {data.imageBase64 ? (
                    <img
                        src={data.imageBase64}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-md"
                    />
                ) : (
                    <p className="text-slate-400">
                        Glissez-déposez une image ici ou cliquez pour importer
                    </p>
                )}
            </div>

            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
            />
        </div>
    );
}
