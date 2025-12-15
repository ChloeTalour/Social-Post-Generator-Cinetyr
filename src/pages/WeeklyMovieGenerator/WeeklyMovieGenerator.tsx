import PreviewContainer from "../../components/PreviewContainer/PreviewContainer";
import FormPanel, { type FormData } from "../../components/Form/FormPanel";
import { useState, useRef } from "react";
import GeneratorPageLayout from "../../layouts/GeneratorPageLayout";
import GeneratorFormLayout from "../../layouts/GeneratorFormLayout";

export default function WeeklyMovieGenerator() {
  const [formData, setFormData] = useState<FormData>({
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
    eventDetail: ""
  });

  const instaRef = useRef<HTMLDivElement | null>(null);
  const fbRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nodes = [
    {
      ref: instaRef.current,
      filename: `${formData.filename}-instagram-post.png`,
    },
    {
      ref: fbRef.current,
      filename: `${formData.filename}-facebook-post.png`,
    },
    {
      ref: storyRef.current,
      filename: `${formData.filename}-instagram-story.png`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex overflow-hidden">
      <GeneratorFormLayout>
        <FormPanel data={formData} onChange={handleChange} />
      </GeneratorFormLayout>

      <GeneratorPageLayout nodes={nodes} numberOfPdf={3}>
        <PreviewContainer
          data={formData}
          instaRef={instaRef}
          fbRef={fbRef}
          storyRef={storyRef}
          onImageMove={(type, offsetX, offsetY) => {
            setFormData((prev) => ({
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
