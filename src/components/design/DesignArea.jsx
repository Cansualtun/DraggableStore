import { useRef } from "react";
import PropTypes from "prop-types";
import { useToast } from "@/hooks/use-toast";
import { ComponentRenderer } from "./ComponentRenderer";

export const DesignArea = ({
  design,
  selectedElement,
  onElementSelect,
  onDrop,
  onDragOver,
  onDragLeave,
}) => {
  const designAreaRef = useRef(null);
  const { toast } = useToast();

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
          onSelect={onElementSelect}
          checkBoundaries={(newX, newY, elementRect) =>
            checkBoundaries(
              newX,
              newY,
              elementRect,
              designAreaRef.current.getBoundingClientRect()
            )
          }
        />
      ))}
    </div>
  );
};

DesignArea.propTypes = {
  design: PropTypes.arrayOf(
    PropTypes.shape({
      instanceId: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["input", "upload", "checkbox", "image"])
        .isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      style: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string,
        backgroundColor: PropTypes.string,
        borderStyle: PropTypes.string,
        borderColor: PropTypes.string,
      }),
      properties: PropTypes.shape({
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        imageUrl: PropTypes.string,
      }),
    })
  ).isRequired,
  selectedElement: PropTypes.shape({
    instanceId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["input", "upload", "checkbox", "image"]).isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  }),
  onElementSelect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
};

DesignArea.defaultProps = {
  selectedElement: null,
};

export default DesignArea;
