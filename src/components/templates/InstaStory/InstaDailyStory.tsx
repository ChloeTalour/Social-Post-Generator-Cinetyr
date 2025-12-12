import type { DailyMovieData } from "../../../pages/DailyMovieGenerator/DailyMovieGenerator";
import DraggableImage from "../../DraggableImage/DraggableImage";
import HeaderInstaStory from "./HeaderInstaStory";

interface InstaStoryProps {
    data: DailyMovieData;
    onImageMove: (x: number, y: number) => void;
}

export default function InstaDailyStory({ data, onImageMove }: InstaStoryProps) {
    const imageSrc = data.imageBase64 || data.imageUrl;
    return (
        <div
            className="relative w-[1080px] h-[1920px] text-white flex flex-col items-center overflow-hidden"
            style={{ backgroundColor: data.color }}
        >
            {data.imageBase64}
            <div className="absolute top-[-330px] left-[-260px] w-[1390px] h-[833px] bg-white rotate-[-7.6deg] z-0" />
            <div className="z-10 w-full">
                <HeaderInstaStory
                    color={data.color}
                    date={data.date}
                    title="Que voir aujourd’hui au cinéma ?"
                />
                <div className="relative">
                    <div className="mt-[80px] h-[597px] w-[960px] overflow-hidden mx-auto bg-black">
                        {imageSrc ? (
                            <DraggableImage
                                src={imageSrc}
                                alt={data.title}
                                offsetX={data.imageOffsetX.facebookPost}
                                offsetY={data.imageOffsetY.facebookPost}
                                onChange={onImageMove}
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-600 flex items-center justify-center text-slate-300">
                                Image du film
                            </div>
                        )}
                    </div>
                    <div className="absolute top-5 right-[80px] flex flex-col gap-2 items-end">
                        {data.badges.length > 0 && data.badges.map((badge) => (
                            <div
                                className="rounded-full text-white font-league-spartan font-bold text-[30px] pt-2 px-9"
                                style={{ backgroundColor: badge.color }}
                            >
                                {badge.label}
                            </div>
                        ))
                        }
                    </div>
                </div>

                <div className="flex flex-col px-10">
                    <div className="font-league-spartan pt-[60px] text-[55px] mb-[55px] font-bold w-full text-center uppercase truncate">
                        {data.title}
                    </div>
                </div>

                {data.showTime && (
                    <div className="flex flex-col">
                        <div className="font-skranji mb-[170px] text-[100px] w-full text-center uppercase font-skranji text-yellow-500">
                            {data.showTime}
                        </div>
                    </div>
                )}
                {data.openGateTime && (
                    <div className="flex flex-col px-10">
                        <div className="font-glacial-indifference italic pt-[40px] mb-1 text-[36px] leading-[52px] w-full text-center">
                            Ouverture des portes à {data.openGateTime}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
