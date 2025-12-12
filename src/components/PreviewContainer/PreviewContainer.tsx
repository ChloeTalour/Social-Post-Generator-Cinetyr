import React from "react";
import InstaPost from "../templates/InstaPost";
import FacebookPost from "../templates/FacebookPost";

import type { FormData } from "../Form/FormPanel";



import InstaStory from "../templates/InstaStory/InstaStory";
import InstaDailyStory from "../templates/InstaStory/InstaDailyStory";
import InstaDailyResumeStory from "../templates/InstaStory/InstaDailyResumeStory";

interface PreviewContainerProps {
  data: FormData;
  instaRef?: React.RefObject<HTMLDivElement | null>;
  fbRef?: React.RefObject<HTMLDivElement | null>;
  storyRef?: React.RefObject<HTMLDivElement | null>;
  dailyStoryRef?: React.RefObject<HTMLDivElement | null>;
  dailyStoryResumeRef?: React.RefObject<HTMLDivElement | null>;
  onImageMove: (
    type: "facebookPost" | "instaPost" | "instaStory",
    x: number,
    y: number
  ) => void;
}

export default function PreviewContainer({
  data,
  instaRef,
  fbRef,
  storyRef,
  dailyStoryRef,
  dailyStoryResumeRef,
  onImageMove,
}: PreviewContainerProps) {
  return (
    <div className="flex flex-col gap-4">
      {fbRef && (
        <>
          <div className="text-xl mt-2">Facebook Post:</div>
          <div ref={fbRef}>
            <FacebookPost
              data={data}
              onImageMove={(x, y) => onImageMove("facebookPost", x, y)}
            />
          </div>
        </>
      )}
      {instaRef && (
        <>
          <div className="text-xl mt-2">Instagram Post:</div>
          <div ref={instaRef}>
            <InstaPost
              data={data}
              onImageMove={(x, y) => onImageMove("instaPost", x, y)}
            />
          </div>
        </>
      )}
      {storyRef && (
        <>
          <div className="text-xl mt-2">Instagram story:</div>
          <div ref={storyRef}>
            <InstaStory
              data={data}
              onImageMove={(x, y) => onImageMove("instaStory", x, y)}
            />
          </div>
        </>
      )}

      {dailyStoryRef && (
        <>
          <div className="text-xl mt-2">Story jour:</div>
          <div ref={dailyStoryRef}>
            <InstaDailyStory
              data={data}
              onImageMove={(x, y) => onImageMove("instaStory", x, y)}
            />
          </div>
        </>
      )}
      {(dailyStoryResumeRef) && (
        <>
          <div className="text-xl mt-2">Résumé:</div>
          <div ref={dailyStoryResumeRef}>
            <InstaDailyResumeStory
              data={data}
            />
          </div>
        </>
      )}

    </div>
  );
}
