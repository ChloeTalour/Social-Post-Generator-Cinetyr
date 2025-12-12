import { type FormData } from "../../components/Form/FormPanel";
import { useState, useRef } from "react";
import PreviewContainer from "../../components/PreviewContainer/PreviewContainer";
import FormDailyMovie from "./FormDailyMovie";
import GeneratorPageLayout from "../../components/Layout/GeneratorPageLayout";


export interface DailyMovieData extends FormData {
    showTime: string;
    openGateTime: string;
    director: string
}

export default function DailyMovieGenerator() {
    const [dailyMovieData, setDailyMovieData] = useState<DailyMovieData>({
        filename: "",
        date: "",
        imageUrl: "",
        imageOffsetX: { facebookPost: 0, instaPost: 0, instaStory: 0 },
        imageOffsetY: { facebookPost: 0, instaPost: 0, instaStory: 0 },
        imageBase64: "",
        title: "",
        synopsis: "",
        badges: [],
        color: "#D2232A",
        eventDetail: "",
        showTime: "",
        openGateTime: "",
        director: ""
    });

    const dailyStoryRef = useRef<HTMLDivElement | null>(null);
    const dailyStoryResumeRef = useRef<HTMLDivElement | null>(null);

    const handleChange = (field: keyof DailyMovieData, value: DailyMovieData[keyof DailyMovieData]) => {
        setDailyMovieData((prev) => ({ ...prev, [field]: value }));
    };

    const nodes = [
        {
            ref: dailyStoryRef.current,
            filename: `${dailyMovieData.filename}-instagram-daily-story.png`,
        },
        {
            ref: dailyStoryResumeRef.current,
            filename: `${dailyMovieData.filename}-instagram-daily-resume-story.png`,
        }
    ]


    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex overflow-hidden">
            <aside className="fixed top-0 left-0 w-[360px] h-screen bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto z-20">
                <h2 className="text-sm font-semibold mb-3">🎨 Formulaire :</h2>
                <FormDailyMovie data={dailyMovieData} onChange={handleChange} />
            </aside>

            <GeneratorPageLayout nodes={nodes} numberOfPdf={2}>
                <PreviewContainer
                    data={dailyMovieData}
                    dailyStoryRef={dailyStoryRef}
                    dailyStoryResumeRef={dailyStoryResumeRef}
                    onImageMove={(type, offsetX, offsetY) => {
                        setDailyMovieData((prev) => ({
                            ...prev,
                            imageOffsetX: { ...prev.imageOffsetX, [type]: offsetX },
                            imageOffsetY: { ...prev.imageOffsetY, [type]: offsetY },
                        }));
                    }}
                />
            </GeneratorPageLayout>
        </div>
    );
}
