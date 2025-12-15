import type { FormData } from "../../components/Form/FormPanel";

interface InstaStoryProps {
    data: FormData;
}

export default function InstaDailyStory({ data }: InstaStoryProps) {
    return (
        <div
            className="relative w-[1080px] h-[1920px] text-white flex flex-col items-center overflow-hidden"
            style={{ backgroundColor: data.color }}
        >
            {data.imageBase64}
            <div className="absolute top-[-330px] left-[-260px] w-[1390px] h-[833px] bg-white rotate-[-7.6deg] z-0" />
            <div className="z-10 w-full h-full flex flex-col">
                <div className="z-10 w-full px-12 pt-[158px] flex flex-col">
                    <div
                        className="font-anton text-[108px] item-start leading-[110px]"
                        style={{ color: data.color }}
                    >
                        Que voir aujourd’hui au cinéma ?
                    </div>
                    {data.showTime && (
                        <div
                            className="font-glacial-indifference font-bold text-[40px] leading-none max-w-[560px] h-[80px] mt-[24px]"
                            style={{ color: data.color }}
                        >
                            Séance de {data.showTime}
                        </div>
                    )}
                </div>

                <div className="flex flex-col pt-40 items-center justify-center mb-10">
                    <div className="font-league-spartan px-15  text-[50px] font-bold w-full text-center uppercase ">
                        {data.title}
                    </div>
                    <div className="font-glacial-indifference px-15  text-[30px] pb-[30px] font-bold w-full text-center truncate">
                        Réalisé par {data.director}
                    </div>
                    <div className={`font-glacial-indifference text-[40px] text-center px-15  leading-[55px] whitespace-pre-line ${data.eventDetail ? 'line-clamp-15' : ''}`}>
                        {data.synopsis}
                    </div>
                    {data.eventDetail && (
                        <div
                            className="font-glacial-indifference text-[30px] bg-white text-center font-bold leading-[44px] py-3 px-20 mt-10 mb-10 whitespace-pre-line w-full"
                            style={{ color: data.color }}
                        >
                            <p className="max-w-[960px]">{data.eventDetail}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-around gap-6 flex-wrap mt-[40px] px-15 ">

                        {data.badges.length > 0 && data.badges.map((badge) => (
                            <div
                                key={badge.id}
                                className="rounded-full text-white font-league-spartan font-bold text-[30px] pt-2 px-9"
                                style={{ backgroundColor: badge.color }}
                            >
                                {badge.label}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
