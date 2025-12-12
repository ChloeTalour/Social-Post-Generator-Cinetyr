import { useState } from "react";
import FormField from "../FormField";
import type { FormData } from "../FormPanel";
import BadgesView from "./BadgeView";

export interface BadgeProps {
    id: string,
    label: string
    color: string
    position: number
}

interface FormBadgesProps {
    data: {
        badges: BadgeProps[]
    }
    onChange: (field: keyof FormData, value: FormData[keyof FormData]) => void
}

export default function FormBadges({ data, onChange }: FormBadgesProps) {
    const [badge, setBadge] = useState<string>('')

    const addBadge = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (badge.length > 0) {
            const newDataBadge = data.badges
            newDataBadge.push({
                id: `${badge}${data.badges.length + 1}`,
                label: badge,
                color: '#06682B',
                position: data.badges.length + 1,
            })
            onChange("badges", newDataBadge)
            setBadge('')
        }
    }

    const deleteBadge = (id: string) => {
        const newBagdes = data.badges.filter((badge) => badge.id !== id)
        onChange("badges", newBagdes)
    }

    const onChangeColorValue = (id: string, color: string) => {
        const badges = data.badges
        const updatedBadges = badges.map(badge =>
            badge.id === id
                ? { ...badge, color: color }
                : badge
        );
        onChange("badges", updatedBadges)
    }

    return (
        <>
            <FormField
                id="badgeLabel"
                label="Badge (texte)"
                value={badge}
                placeholder="JAPAN@TYROSSE"
                onChange={(v) => setBadge(v)}
            />
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => addBadge(e)}
                className="bg-indigo-950 py-2 rounded-sm text-sm text-indigo-300 cursor-pointer"
            >
                Ajouter un badge
            </button>

            <div className=" flex flex-col gap-2">
                {data.badges.length > 0 && data.badges.map((badge) => (
                    <BadgesView
                        key={badge.id}
                        onDelete={deleteBadge}
                        onChangeColorValue={onChangeColorValue}
                        {...badge}
                    />
                ))
                }
            </div>
        </>
    )
}
