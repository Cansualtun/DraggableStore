import { FaUpload } from "react-icons/fa";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import ComponentList from "./ComponentList";
import PropertyPanel from "./PropertyPanel";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addDesignElement } from "@/store/dashboardSlice";
import {
  updateTemplate,
  clearCurrentTemplateIndex,
} from "@/store/templateSlice";

const renderComponent = (type, style = {}, properties = {}) => {
  const commonStyles = {
    width: style.width || "200px",
    height: style.height || "150px",
    minWidth: "100px",
    minHeight: "50px",
    backgroundColor: style.backgroundColor,
    borderStyle: style.borderStyle,
    borderColor: style.borderColor,
  };

  switch (type) {
    case "upload":
      return (
        <Card style={commonStyles} className="shrink-0">
          <CardContent className="h-full p-4 flex flex-col items-center justify-center">
            {properties.imageUrl ? (
              <img
                src={properties.imageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div
                className={`border-2 ${
                  style.borderStyle || "border-dashed"
                } border-gray-300 rounded-lg p-4 w-full h-full flex flex-col items-center justify-center`}
              >
                <FaUpload className="w-6 h-6 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Upload Image</p>
              </div>
            )}
          </CardContent>
        </Card>
      );
    case "input":
      return (
        <Input
          type="text"
          placeholder={properties.placeholder || "Enter text..."}
          style={commonStyles}
          className="shrink-0"
        />
      );
    case "checkbox":
      return (
        <div
          style={commonStyles}
          className="shrink-0 flex items-center space-x-2 p-4"
        >
          <Checkbox disabled={properties.disabled} className="shrink-0" />
          <Label>{properties.label || "Checkbox Label"}</Label>
        </div>
      );
    case "image":
      return (
        <Card style={commonStyles} className="shrink-0">
          <CardContent className="h-full p-4 flex items-center justify-center">
            <div className="text-gray-500">Image Placeholder</div>
          </CardContent>
        </Card>
      );
    default:
      return <div>Unsupported Component</div>;
  }
};

const DashboardComponent = () => {
  const {
    designElements,
    selectedElement,
    setSelectedElement,
    handleDragStart,
    handleDrop,
    handleUpdateElement,
    setDesignElements,
  } = useDragAndDrop();

  const { toast } = useToast();
  const designAreaRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [design, setDesign] = useState([]);
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const test = useSelector((state) => state.template?.templates);
  const currentTemplate = useSelector((state) => state.template?.index);
  console.log(test, "dobis");
  const dispatch = useDispatch();
  console.log(draggedElement, "halidox");
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };
  console.log(isNewTemplate, "ehe");
  const handleElementMouseDown = (e, element) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDraggedElement(element);
    setSelectedElement(element);

    const rect = e.currentTarget.getBoundingClientRect();
    setStartPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  useEffect(() => {
    setDesign(designElements);
  }, [designElements]);

  useEffect(() => {
    setDesign(test);
    setDesignElements(test);
  }, [test]);

  const handleMouseMove = (e) => {
    if (!isDragging || !draggedElement || !designAreaRef.current) return;

    const designRect = designAreaRef.current.getBoundingClientRect();
    const elementRect = document
      .getElementById(draggedElement.instanceId)
      .getBoundingClientRect();

    let newX = e.clientX - designRect.left - startPosition.x;
    let newY = e.clientY - designRect.top - startPosition.y;
    const maxX = designRect.width - elementRect.width;
    const maxY = designRect.height - elementRect.height;

    if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) {
      toast({
        title: "Warning",
        description: "Component cannot be moved outside the design area",
        variant: "destructive",
      });
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
    }
    dispatch(
      updateTemplate({
        ...draggedElement,
        position: { x: newX, y: newY },
      })
    );
    handleUpdateElement({
      ...draggedElement,
      position: { x: newX, y: newY },
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedElement(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, draggedElement]);

  const handleSave = () => {
    if (currentTemplate !== null && !isNewTemplate) {
      const list = JSON.parse(localStorage.getItem("templateList"));
      const filteredList = list.filter((_, index) => {
        return index !== currentTemplate;
      });
      console.log(list, "list");
      console.log(test, "test");
      console.log(filteredList, "filteredList");
      const parsedData = [...filteredList, test];
      localStorage.setItem("templateList", JSON.stringify(parsedData));
    } else {
      dispatch(addDesignElement());
      const currentTemplate =
        JSON.parse(localStorage.getItem("templateList")) ?? [];
      const parsedData = [...currentTemplate, test];
      localStorage.setItem("templateList", JSON.stringify(parsedData));
    }
  };

  const clearDesign = () => {
    dispatch(clearCurrentTemplateIndex());
    setDesignElements([]);
  };
  return (
    <>
      <Button onClick={handleSave}>Kaydet</Button>
      <Checkbox
        checked={isNewTemplate}
        onCheckedChange={(e) => setIsNewTemplate(e)}
        id="isNewTemplate"
      />
      <label htmlFor="isNew">Yeni Bir Template Olarak Kaydet</label>
      <Button onClick={clearDesign}>Clear Design</Button>
      <div className="flex h-screen bg-gray-100" id="anan">
        <ComponentList onDragStart={handleDragStart} />

        <div className="flex-1 p-8">
          <div
            ref={designAreaRef}
            className="bg-white h-full rounded-lg shadow-lg relative overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {design.map((element) => (
              <div
                id={element.instanceId}
                key={element.instanceId}
                className={`absolute cursor-move select-none ${
                  selectedElement?.instanceId === element.instanceId
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onMouseDown={(e) => handleElementMouseDown(e, element)}
                style={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  touchAction: "none",
                }}
              >
                {renderComponent(
                  element.type,
                  element.style,
                  element.properties
                )}
              </div>
            ))}
          </div>
        </div>
        <PropertyPanel
          selectedElement={selectedElement}
          onUpdateElement={handleUpdateElement}
        />
      </div>
    </>
  );
};

export default DashboardComponent;
