import DraggableImage from "../../components/DraggableImage/DraggableImage";
import type { FormData } from "../../components/Form/FormPanel";
import HeaderInstaStory from "./HeaderInstaStory";

interface InstaStoryProps {
  data: FormData;
  onImageMove: (x: number, y: number) => void;
}

export default function InstaStory({ data, onImageMove }: InstaStoryProps) {
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
          title="Que voir au cinéma cette semaine ?"
        />

        <div className="relative">
          <div className="mt-[80px] h-[597px] w-[960px] overflow-hidden mx-auto bg-black">
            {imageSrc ? (
              <DraggableImage
                src={imageSrc}
                alt={data.title}
                offsetX={data.imageOffsetX.instaStory}
                offsetY={data.imageOffsetY.instaStory}
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

        <div className="flex flex-col px-10">
          <div className="font-league-spartan pt-[40px] mb-1 text-[48px] leading-[52px] font-bold w-full text-center uppercase truncate">
            {data.title}
          </div>
          <div className={`font-glacial-indifference text-[40px] text-center ${data.eventDetail ? 'line-clamp-8' : 'line-clamp-'}`}>
            {data.synopsis}
          </div>
        </div>
        {data.eventDetail && (
          <div
            className="font-glacial-indifference text-[30px] bg-white text-center font-bold leading-[44px] py-3 px-20 mt-4 whitespace-pre-line"
            style={{ color: data.color }}
          >
            <p className="max-w-[960px]">{data.eventDetail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
