import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { DesignArea } from "@/components/design/DesignArea";
import ComponentList from "@/components/design/ComponentList";
import PropertyPanel from "@/components/design/PropertyPanel";
import {
  clearCurrentTemplateIndex,
  addFullTemplate,
  currentTemplateIndex as setCurrentTemplateIndex,
} from "@/store/templateSlice";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const {
    designElements,
    selectedElement,
    handleDragStart,
    handleDrop,
    handleUpdateElement,
    handleElementMouseDown,
    handleDeleteElement,
    setDesignElements,
  } = useDragAndDrop();

  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const currentTemplateIndex = useSelector((state) => state.template?.index);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const templates = JSON.parse(localStorage.getItem("templateList")) || [];
    setSavedTemplates(templates);
  }, []);

  const handleLoadTemplate = (template, index) => {
    try {
      setDesignElements(template);
      dispatch(addFullTemplate(template));
      dispatch(setCurrentTemplateIndex(index));
      setIsNewTemplate(false);

      toast({
        title: "Success",
        description: "Template loaded successfully",
      });
    } catch (error) {
      console.error("Template load error:", error);
      toast({
        title: "Error",
        description: "Failed to load template",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    try {
      const newTemplate = [...designElements];
      let updatedTemplates;

      if (currentTemplateIndex !== null && !isNewTemplate) {
        updatedTemplates = [...savedTemplates];
        updatedTemplates[currentTemplateIndex] = newTemplate;
      } else {
        updatedTemplates = [...savedTemplates, newTemplate];
      }
      localStorage.setItem("templateList", JSON.stringify(updatedTemplates));
      setSavedTemplates(updatedTemplates);
      dispatch(addFullTemplate(newTemplate));

      toast({
        title: "Success",
        description: isNewTemplate
          ? "New template saved successfully"
          : "Template updated successfully",
      });
      setIsNewTemplate(false);
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive",
      });
    }
  };

  const clearDesign = () => {
    setDesignElements([]);
    dispatch(clearCurrentTemplateIndex());
    setIsNewTemplate(true);
    toast({
      title: "Success",
      description: "Design cleared successfully",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between p-4 bg-white border-b">
        <div className="flex flex-row gap-2">
          <Button onClick={handleSave}>Save</Button>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isNewTemplate}
              onCheckedChange={setIsNewTemplate}
              id="isNewTemplate"
            />
            <label htmlFor="isNewTemplate">Save as New Template</label>
          </div>
        </div>
        <Button onClick={clearDesign} variant="destructive">
          Clear Design
        </Button>
      </div>

      <div className="flex flex-1 bg-gray-100">
        <ComponentList
          onDragStart={handleDragStart}
          savedTemplates={savedTemplates}
          setSavedTemplates={setSavedTemplates}
          onLoadTemplate={handleLoadTemplate}
        />
        <div className="flex-1 p-8">
          <DesignArea
            design={designElements}
            selectedElement={selectedElement}
            onElementSelect={handleElementMouseDown}
            onDrop={handleDrop}
            onDragLeave={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
        <PropertyPanel
          selectedElement={selectedElement}
          onUpdateElement={handleUpdateElement}
          onDelete={handleDeleteElement}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
