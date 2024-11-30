import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTemplate } from "@/store/templateSlice";

export const useDragAndDrop = () => {
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();

  const handleDragStart = (e, component) => {
    const componentData = {
      id: component.id,
      type: component.type,
      name: component.name,
      style: {
        width: component.type === "input" ? "200px" : "200px",
        height: component.type === "input" ? "40px" : "150px",
      },
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(componentData));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "white";

    try {
      const data = e.dataTransfer.getData("text/plain");
      const component = JSON.parse(data);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newElement = {
        ...component,
        position: { x, y },
        instanceId: `${component.id}-${Date.now()}`,
      };
      dispatch(addTemplate(newElement));
      setDesignElements((prev) => [...prev, newElement]);
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  const handleUpdateElement = (updatedElement) => {
    setDesignElements((elements) =>
      elements.map((el) =>
        el.instanceId === updatedElement.instanceId ? updatedElement : el
      )
    );
    setSelectedElement(updatedElement);
  };

  return {
    designElements,
    selectedElement,
    setSelectedElement,
    handleDragStart,
    handleDrop,
    handleUpdateElement,
    setDesignElements,
  };
};
