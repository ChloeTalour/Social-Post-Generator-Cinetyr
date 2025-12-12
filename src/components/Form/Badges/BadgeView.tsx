import type { BadgeProps } from "./FormBadges"
import PickerColor from "../../PickerColor/PickerColor";

interface BadgeViewProps extends BadgeProps {
    id: string,
    label: string,
    color: string
    onDelete: (id: string) => void
    onChangeColorValue: (id: string, color: string) => void
}

export default function BadgesView({ id, color, label, onDelete, onChangeColorValue }: BadgeViewProps) {
    return (
        <div className="flex justify-between">
            <div className="flex gap-4 items-center relative">
                <p style={{ backgroundColor: color }} className="py-1 px-5 rounded-full">{label}</p>
                <PickerColor color={color} handleChangeColor={(hex) => onChangeColorValue(id, hex)} />
            </div>
            <button
                onClick={() => onDelete(id)}
                className="border-white text-xs p-0"
            >
                Supprimer
            </button>
        </div >
    )
}