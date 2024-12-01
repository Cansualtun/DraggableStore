import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateTemplate } from "@/store/templateSlice";
import { nanoid } from "nanoid";
import { deleteElement } from "@/store/templateSlice";

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

  const handleDeleteElement = useCallback(
    (elementId) => {
      // Redux'tan sil
      dispatch(deleteElement(elementId));

      // Local state'den sil
      setDesignElements((prev) =>
        prev.filter((el) => el.instanceId !== elementId)
      );

      // Seçili element siliniyorsa seçimi kaldır
      if (selectedElement?.instanceId === elementId) {
        setSelectedElement(null);
      }

      // LocalStorage'ı güncelle
      const currentTemplates =
        JSON.parse(localStorage.getItem("templateList")) || [];
      const updatedTemplates = currentTemplates.map((template) =>
        template.filter((item) => item.instanceId !== elementId)
      );
      localStorage.setItem("templateList", JSON.stringify(updatedTemplates));
    },
    [dispatch, selectedElement]
  );
  return {
    designElements,
    selectedElement,
    isDragging,
    draggedElement,
    startPosition,
    handleDeleteElement,
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
