import FormField from "./FormField";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import FormBadges, { type BadgeProps } from "./Badges/FormBadges";
import PickerColor from "../PickerColor/PickerColor";
import FormLayout from "../Layout/FormLayout";

export interface FormData {
  filename: string;
  date: string;
  imageUrl: string;
  imageBase64: string;
  imageOffsetX: {
    facebookPost: number;
    instaPost: number;
    instaStory: number;
  };
  imageOffsetY: {
    facebookPost: number;
    instaPost: number;
    instaStory: number;
  };
  title: string;
  synopsis: string;
  badges: BadgeProps[]
  color: string;
  eventDetail: string;
  showTime?: string;
  openGateTime?: string;
  director?: string
}

interface FormPanelProps {
  data: FormData;
  onChange: (field: keyof FormData, value: FormData[keyof FormData]) => void;
}

export default function FormPanel({ data, onChange }: FormPanelProps) {
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
      <FormBadges
        data={data}
        onChange={onChange}
      />
      <div className="flex flex-col gap-1 relative">
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

