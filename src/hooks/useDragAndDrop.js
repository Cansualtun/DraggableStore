// src/hooks/useDragAndDrop.js
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateTemplate } from "@/store/templateSlice";
import { nanoid } from "nanoid";

export const useDragAndDrop = () => {
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();

  const handleDragStart = (e, component) => {
    const componentData = {
      id: nanoid(),
      type: component.type,
      name: component.name,
      position: { x: 0, y: 0 },
      style: {
        width: component.type === "input" ? "200px" : "200px",
        height: component.type === "input" ? "40px" : "150px",
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderColor: "#000000",
      },
      properties: {},
    };
    e.dataTransfer.setData("application/json", JSON.stringify(componentData));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("application/json");
      const component = JSON.parse(data);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newElement = {
        ...component,
        position: { x, y },
        instanceId: `${component.id}-${Date.now()}`,
      };

      setDesignElements((prev) => [...prev, newElement]);
      dispatch(updateTemplate(newElement));
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  const handleElementMouseDown = useCallback((e, element) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDraggedElement(element);
    setSelectedElement(element);

    const rect = e.currentTarget.getBoundingClientRect();
    setStartPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleUpdateElement = useCallback(
    (updatedElement) => {
      setDesignElements((prev) =>
        prev.map((el) =>
          el.instanceId === updatedElement.instanceId ? updatedElement : el
        )
      );
      setSelectedElement(updatedElement);
      dispatch(updateTemplate(updatedElement));
    },
    [dispatch]
  );

  return {
    designElements,
    selectedElement,
    isDragging,
    draggedElement,
    startPosition,
    setIsDragging,
    setDraggedElement,
    handleDragStart,
    handleDrop,
    handleUpdateElement,
    handleElementMouseDown,
    setSelectedElement,
    setDesignElements,
  };
};
