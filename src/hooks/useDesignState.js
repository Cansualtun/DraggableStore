// src/hooks/useDesignState.js
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateTemplate } from "@/store/templateSlice";
import { nanoid } from "nanoid";

export const useDesignState = () => {
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();

  const handleDragStart = useCallback((componentType) => {
    return {
      type: componentType,
      instanceId: nanoid(),
      position: { x: 0, y: 0 },
      style: {
        width: "200px",
        height: "150px",
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderColor: "#000000",
      },
      properties: {},
    };
  }, []);

  const handleDrop = useCallback(
    (e, droppedElement) => {
      e.preventDefault();
      const designRect = e.currentTarget.getBoundingClientRect();
      const newElement = {
        ...droppedElement,
        position: {
          x: e.clientX - designRect.left,
          y: e.clientY - designRect.top,
        },
      };

      setDesignElements((prev) => [...prev, newElement]);
      dispatch(updateTemplate(newElement));
    },
    [dispatch]
  );

  const handleUpdateElement = useCallback(
    (updatedElement) => {
      setDesignElements((prev) =>
        prev.map((el) =>
          el.instanceId === updatedElement.instanceId ? updatedElement : el
        )
      );
      dispatch(updateTemplate(updatedElement));
    },
    [dispatch]
  );

  const removeElement = useCallback(
    (elementId) => {
      setDesignElements((prev) =>
        prev.filter((el) => el.instanceId !== elementId)
      );
      if (selectedElement?.instanceId === elementId) {
        setSelectedElement(null);
      }
    },
    [selectedElement]
  );

  const updateElementStyle = useCallback((elementId, style) => {
    setDesignElements((prev) =>
      prev.map((el) => {
        if (el.instanceId === elementId) {
          return {
            ...el,
            style: { ...el.style, ...style },
          };
        }
        return el;
      })
    );
  }, []);

  const updateElementProperties = useCallback((elementId, properties) => {
    setDesignElements((prev) =>
      prev.map((el) => {
        if (el.instanceId === elementId) {
          return {
            ...el,
            properties: { ...el.properties, ...properties },
          };
        }
        return el;
      })
    );
  }, []);

  return {
    designElements,
    selectedElement,
    handleDragStart,
    handleDrop,
    handleUpdateElement,
    setSelectedElement,
    setDesignElements,
    removeElement,
    updateElementStyle,
    updateElementProperties,
  };
};
