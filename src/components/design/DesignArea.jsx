import { useRef, useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ComponentRenderer } from "./ComponentRenderer";

export const DesignArea = ({
  design,
  selectedElement,
  onElementSelect,
  onDrop,
  onDragOver,
  onDragLeave,
  onUpdateElement,
}) => {
  const designAreaRef = useRef(null);
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const checkBoundaries = (newX, newY, elementRect, designRect) => {
    const maxX = designRect.width - elementRect.width;
    const maxY = designRect.height - elementRect.height;

    if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) {
      toast({
        title: "Warning",
        description: "Component cannot be moved outside the design area",
        variant: "destructive",
      });
      return {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      };
    }
    return { x: newX, y: newY };
  };

  const handleMouseDown = useCallback(
    (e, element) => {
      if (e.button !== 0) return;
      e.preventDefault();
      setIsDragging(true);
      onElementSelect(e, element);

      const rect = designAreaRef.current.getBoundingClientRect();
      setStartPosition({
        x: e.clientX - rect.left - element.position.x,
        y: e.clientY - rect.top - element.position.y,
      });
    },
    [onElementSelect]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !selectedElement) return;

      const designRect = designAreaRef.current.getBoundingClientRect();
      const elementRect = document
        .getElementById(selectedElement.instanceId)
        .getBoundingClientRect();

      const newX = e.clientX - designRect.left - startPosition.x;
      const newY = e.clientY - designRect.top - startPosition.y;

      const validPosition = checkBoundaries(
        newX,
        newY,
        elementRect,
        designRect
      );

      onUpdateElement({
        ...selectedElement,
        position: validPosition,
      });
    },
    [isDragging, selectedElement, startPosition, onUpdateElement]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={designAreaRef}
      className="bg-white h-full rounded-lg shadow-lg relative overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {design.map((element) => (
        <ComponentRenderer
          key={element.instanceId}
          element={element}
          isSelected={selectedElement?.instanceId === element.instanceId}
          onSelect={handleMouseDown}
          isDragging={
            isDragging && selectedElement?.instanceId === element.instanceId
          }
        />
      ))}
    </div>
  );
};

export default DesignArea;
