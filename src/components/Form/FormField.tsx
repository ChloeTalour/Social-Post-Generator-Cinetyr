
export default function FormField({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    id: string;
    label: string;
    value: string | undefined;
    onChange: (v: string) => void | Promise<void>;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-slate-200">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
        </div>
    );
}
