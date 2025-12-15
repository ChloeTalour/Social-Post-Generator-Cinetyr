import { useState, useRef } from "react";

interface useDraggableProps {
    onChange: (x: number, y: number, scale: number) => void;
    offsetX: number,
    offsetY: number
}

export function useDraggable({ onChange, offsetX, offsetY }: useDraggableProps) {
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: offsetX, y: offsetY });
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [scale, setScale] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const lastPosition = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        lastPosition.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current || !imageRef.current) return;

        const deltaX = e.clientX - lastPosition.current.x;
        const deltaY = e.clientY - lastPosition.current.y;

        const containerWidth = containerRef.current.clientWidth
        const containerHeight = containerRef.current.clientHeight

        const initialWidth = imageRef.current.clientWidth
        const initialHeight = imageRef.current.clientHeight

        const imageWidth = initialWidth * scale;
        const imageHeight = initialHeight * scale;
        const diffHeight = (imageHeight - initialHeight) / 2;

        const minX = Math.min(0, (containerWidth - imageWidth) / 2);
        const maxX = Math.abs(minX);

        const minY = Math.min(0, (containerHeight - imageHeight + diffHeight));
        const maxY = diffHeight;

        setPosition(prev => ({
            x: clamp(prev.x + deltaX, minX, maxX),
            y: clamp(prev.y + deltaY, minY, maxY),
        }));

        lastPosition.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const onMouseUp = () => {
        setIsDragging(false)
        onChange(position.x, position.y, scale);
    };

    const onWheel = (e: React.WheelEvent) => {
        const zoomStep = 0.1;
        const zoomDirection = e.deltaY < 0 ? 1 : -1;

        const minScale = 1;
        const maxScale = 3;

        setScale(prev => {
            return Math.min(Math.max(prev + zoomDirection * zoomStep, minScale), maxScale)
        });
    };

    const onDoubleClick = () => {
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }


    return { position, onMouseDown, onMouseMove, onMouseUp, scale, onWheel, onDoubleClick, containerRef, imageRef };
}
