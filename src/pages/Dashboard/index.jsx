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
    setDesignElements,
  } = useDragAndDrop();

  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const templates = useSelector((state) => state.template?.templates);
  const currentTemplateIndex = useSelector((state) => state.template.index);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    setDesignElements(templates);
  }, [templates, setDesignElements]);

  const handleSave = () => {
    try {
      if (currentTemplateIndex !== null && !isNewTemplate) {
        const list = JSON.parse(localStorage.getItem("templateList")) || [];
        const filteredList = list.filter(
          (_, index) => index !== currentTemplateIndex
        );
        const parsedData = [...filteredList, designElements];
        localStorage.setItem("templateList", JSON.stringify(parsedData));
        dispatch(addFullTemplate(designElements));
        toast({
          title: "Başarılı",
          description: "Template güncellendi",
        });
      } else {
        const currentTemplate =
          JSON.parse(localStorage.getItem("templateList")) ?? [];
        const parsedData = [...currentTemplate, designElements];
        localStorage.setItem("templateList", JSON.stringify(parsedData));
        dispatch(addFullTemplate(designElements));
        toast({
          title: "Başarılı",
          description: "Yeni template kaydedildi",
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Hata",
        description: "Template kaydedilirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const clearDesign = () => {
    dispatch(clearCurrentTemplateIndex());
    setDesignElements([]);
    toast({
      title: "Başarılı",
      description: "Tasarım temizlendi",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex gap-4 p-4 bg-white border-b">
        <Button onClick={handleSave}>Kaydet</Button>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isNewTemplate}
            onCheckedChange={setIsNewTemplate}
            id="isNewTemplate"
          />
          <label htmlFor="isNewTemplate">Yeni Bir Template Olarak Kaydet</label>
        </div>
        <Button onClick={clearDesign}>Clear Design</Button>
      </div>

      <div className="flex flex-1 bg-gray-100">
        <ComponentList onDragStart={handleDragStart} />
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
        />
      </div>
    </div>
  );
};

export default DashboardPage;
