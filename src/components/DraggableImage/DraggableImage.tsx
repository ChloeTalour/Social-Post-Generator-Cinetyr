import { useState, useRef } from "react";

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
  offsetX,
  offsetY,
  scale = 1,
  onChange,
}: DraggableImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [local, setLocal] = useState({ x: offsetX, y: offsetY, scale });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRatio = useRef(1); // height / width
  const naturalSize = useRef({ width: 0, height: 0 });

  /** Clamp pour que l'image ne sorte pas du cadre */
  const clampPosition = (x: number, y: number, scale: number) => {
    const container = containerRef.current;
    if (!container) return { x, y };

    const cw = container.clientWidth;
    const ch = container.clientHeight;

    const iw = cw * scale;
    const ih = iw * imageRatio.current;

    let newX = x;
    let newY = y;

    // Horizontal clamp
    if (iw <= cw) newX = (cw - iw) / 2;
    else newX = Math.max(Math.min(x, 0), cw - iw);

    // Vertical clamp
    if (ih <= ch) newY = (ch - ih) / 2;
    else newY = Math.max(Math.min(y, 0), ch - ih);

    return { x: newX, y: newY };
  };

  /** Drag souris */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    const { x, y } = clampPosition(local.x + deltaX, local.y + deltaY, local.scale);

    setLocal({ ...local, x, y });
    onChange(x, y, local.scale);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  /** Zoom centré sur la souris, limité à taille réelle */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY < 0 ? 0.1 : -0.1;

    // calcul du minScale pour ne pas descendre sous la taille réelle
    const cw = container.clientWidth;
    const scaleMin = Math.min(
      naturalSize.current.width / cw,
      naturalSize.current.height / (cw * imageRatio.current)
    );

    // zoom avant illimité, zoom arrière limité
    const newScale = Math.max(local.scale + delta, scaleMin);

    // déplacement pour garder le point sous le curseur fixe
    const dx = (mouseX - local.x) * (newScale / local.scale - 1);
    const dy = (mouseY - local.y) * (newScale / local.scale - 1);

    const { x, y } = clampPosition(local.x - dx, local.y - dy, newScale);

    setLocal({ x, y, scale: newScale });
    onChange(x, y, newScale);
  };


  /** Double click reset */
  const handleDoubleClick = () => {
    const { x, y } = clampPosition(0, 0, 1);
    setLocal({ x, y, scale: 1 });
    onChange(x, y, 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
    >
      <img
        src={src}
        alt={alt}
        onLoad={(e) => {
          const img = e.currentTarget;
          imageRatio.current = img.naturalHeight / img.naturalWidth;
          naturalSize.current = { width: img.naturalWidth, height: img.naturalHeight };
        }}
        className="select-none pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${local.x}px, ${local.y}px) scale(${local.scale})`,
          transformOrigin: "top left",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
        draggable={false}
      />
    </div>
  );
}
