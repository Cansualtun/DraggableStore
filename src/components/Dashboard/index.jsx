import { FaUpload } from "react-icons/fa";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import ComponentList from "./ComponentList";
import PropertyPanel from "./PropertyPanel";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const renderComponent = (type, style = {}) => {
  const { width = "200px", height = "150px" } = style;

  switch (type) {
    case "upload":
      return (
        <Card style={{ width, height }} className="shrink-0">
          <CardContent className="h-full p-4 flex flex-col items-center justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full h-full flex flex-col items-center justify-center">
              <FaUpload className="w-6 h-6 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Upload Image</p>
            </div>
          </CardContent>
        </Card>
      );
    case "input":
      return (
        <Input
          type="text"
          placeholder="Enter text..."
          style={{ width, height }}
          className="shrink-0"
        />
      );
    case "image":
      return (
        <Card style={{ width, height }} className="shrink-0">
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
  } = useDragAndDrop();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ComponentList onDragStart={handleDragStart} />

      <div className="flex-1 p-8">
        <div
          className="bg-white h-full rounded-lg shadow-lg relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {designElements.map((element) => (
            <div
              key={element.instanceId}
              className={`absolute ${
                selectedElement?.instanceId === element.instanceId
                  ? "ring-transparent"
                  : ""
              }`}
              onClick={() => setSelectedElement(element)}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
              }}
            >
              {renderComponent(element.type, element.style)}
            </div>
          ))}
        </div>
      </div>

      <PropertyPanel
        selectedElement={selectedElement}
        onUpdateElement={handleUpdateElement}
      />
    </div>
  );
};

export default DashboardComponent;
