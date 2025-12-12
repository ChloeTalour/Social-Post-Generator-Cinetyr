import { useEffect, useRef, useState } from "react";
import { TwitterPicker } from "react-color";

interface PickerColorProps {
    color: string,
    handleChangeColor: (hex: string) => void
}

export default function PickerColor({ color, handleChangeColor }: PickerColorProps) {
    const [openColorPicker, setColorPicker] = useState<boolean>(false)
    const defaultColors = ['#F9AB55', '#82B7DD', "#DB4144", "#FE7F2D", "#0C365F", "#D2232A", "#06682B", "#231A16"]

    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setColorPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div >
            <input
                type="button"
                onClick={() => setColorPicker(prev => !prev)}
                className="text-xs p-0 w-7 h-7 border border-slate-700"
                value=" "
                style={{ backgroundColor: color }}
            />
            {openColorPicker && (
                <div className="absolute left-2 z-100" ref={pickerRef}>
                    <TwitterPicker
                        colors={defaultColors}
                        width="280px"
                        triangle="hide"
                        onChange={(e) => handleChangeColor(e.hex)}
                    />

                </div>
            )}
        </div>
    );
}
