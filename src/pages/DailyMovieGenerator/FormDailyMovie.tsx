
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import FormBadges from "../../components/Form/Badges/FormBadges";
import FormField from "../../components/Form/FormField";
import FormLayout from "../../components/Layout/FormLayout";
import PickerColor from "../../components/PickerColor/PickerColor";
import type { FormData } from "../../components/Form/FormPanel";

interface FormDailyMovieProps {
    data: FormData
    onChange: (field: keyof FormData, value: FormData[keyof FormData]) => void;
}

export default function FormDailyMovie({ data, onChange }: FormDailyMovieProps) {
    return (
        <FormLayout>
            <FormField
                id="filename"
                label="File name"
                value={data.filename}
                placeholder="12-au-18-novembre"
                onChange={(v) => onChange("filename", v)}
            />

            <FormField
                id="date"
                label="Date"
                value={data.date}
                placeholder="Semaine du 19 au 25 novembre"
                onChange={(v) => onChange("date", v)}
            />

            <DragAndDrop data={data} onChange={onChange} />

            <FormField
                id="title"
                label="Titre du film"
                value={data.title}
                placeholder="Titre du film"
                onChange={(v) => onChange("title", v)}
            />

            <FormField
                id="director"
                label="Réalisateur"
                value={data.director}
                placeholder="Nom du réalisateur"
                onChange={(v) => onChange("director", v)}
            />

            <div className="flex flex-col gap-1">
                <label
                    htmlFor="synopsis"
                    className="text-sm font-medium text-slate-200"
                >
                    Synopsis
                </label>
                <textarea
                    id="synopsis"
                    rows={4}
                    placeholder="Lorem ipsum dolor sit amet..."
                    value={data.synopsis}
                    onChange={(e) => onChange("synopsis", e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="detail"
                    className="text-sm font-medium text-slate-200"
                >
                    Détails
                </label>
                <textarea
                    id="detail"
                    rows={4}
                    placeholder="Lorem ipsum dolor sit amet..."
                    value={data.eventDetail}
                    onChange={(e) => onChange("eventDetail", e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
                />
            </div>
            <FormField
                id="showTime"
                label="Heure de la séance"
                value={data.showTime}
                placeholder="20h00"
                onChange={(v) => onChange("showTime", v)}
            />

            <FormField
                id="openGateTime"
                label="Heure d'ouverture des portes"
                value={data.openGateTime}
                placeholder="19h30"
                onChange={(v) => onChange("openGateTime", v)}
            />

            <FormBadges
                data={data}
                onChange={onChange}
            />
            <div className="flex flex-col gap-1 relative mb-20">
                <label
                    htmlFor="color"
                    className="text-sm font-medium text-slate-200 flex justify-between items-center"
                >
                    Couleur globale
                </label>
                <PickerColor color={data.color} handleChangeColor={(e) => onChange("color", e)} />
            </div>
        </FormLayout>
    );
}

