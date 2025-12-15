import { useDraggable } from "../../hooks/useDraggable";

interface DraggableImageProps {
  src: string;
  alt?: string;
  offsetX: number;
  offsetY: number;
  scale?: number;
  onChange: (x: number, y: number, scale: number) => void;
}

export default function DraggableImage({
  src,
  alt = "",
  offsetX = 0,
  offsetY = 0,
  onChange,
}: DraggableImageProps) {

  const { position, onMouseDown, onMouseMove, onMouseUp, scale, onWheel, onDoubleClick, containerRef, imageRef } = useDraggable({ onChange, offsetX, offsetY });

  return <div
    className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseUp}
    onDoubleClick={onDoubleClick}
    onWheel={onWheel}
    ref={containerRef}
  >
    <img
      src={src}
      alt={alt}
      ref={imageRef}
      onMouseDown={onMouseDown}
      className="absolute bg-indigo-900 text-white cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
      style={{
        transform: `scale(${scale})`,
        width: "100%",
        height: "auto",
        objectFit: "contain",
        left: position.x,
        top: position.y
      }}
      draggable={false}
    />
  </div>

}
