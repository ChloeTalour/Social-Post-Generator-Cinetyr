import DraggableImage from "../../DraggableImage/DraggableImage";
import type { FormData } from "../../Form/FormPanel";

interface FacebookPostProps {
  data: FormData;
  onImageMove: (x: number, y: number) => void;
}

export default function FacebookPost({ data, onImageMove }: FacebookPostProps) {
  const imageSrc = data.imageBase64 || data.imageUrl;
  return (
    <div
      className="relative w-[1080px] h-[1080px] text-white flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      <div className="absolute top-[-310px] left-[-260px] w-[1390px] h-[533px] bg-white rotate-[-7.6deg] z-0" />

      <div className="z-10 w-full">

        <div className="z-10 w-full px-12 pt-[32px] flex flex-col">
          <div
            className="font-anton text-[70px] item-start leading-[110px]"
            style={{ color: data.color }}
          >
            Que voir cette semaine ?
          </div>
          <div
            className="font-glacial-indifference font-bold text-[40px] leading-none max-w-[560px] h-[80px]"
            style={{ color: data.color }}
          >
            {data.date}
          </div>
        </div>

        <div className="relative">
          <div className="mt-[60px] h-[357px] w-[939px] overflow-hidden mx-auto">
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
          <div className="absolute top-5 right-[90px] flex flex-col gap-2 items-end">

            {data.badges.length > 0 && data.badges.map((badge) => (
              <div
                key={badge.id}
                className="rounded-full text-white font-league-spartan font-bold text-[26px] pt-2 px-4"
                style={{ backgroundColor: badge.color }}
              >
                {badge.label}
              </div>
            ))
            }
          </div>
        </div>

        <div className="flex flex-col px-10">
          <div className="font-league-spartan pt-[20px] mb-1 text-[48px] leading-[52px] font-bold w-full text-center uppercase truncate">
            {data.title}
          </div>
          <div className={`font-glacial-indifference text-[30px] text-center ${data.eventDetail ? 'line-clamp-5' : 'line-clamp-7'}`}>
            {data.synopsis}
          </div>
        </div>
        {data.eventDetail && (
          <div
            className="font-glacial-indifference text-[24px] bg-white text-center font-bold leading-[30px] py-3 px-20 mt-2 whitespace-pre-line"
            style={{ color: data.color }}
          >
            {data.eventDetail}
          </div>
        )}
      </div>
    </div >
  );
}
