import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import ColorPicker from "../ColorPicker";

const PropertyPanel = ({ selectedElement, onUpdateElement, onDelete }) => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white p-4 shadow-lg">
        <p className="text-gray-500">Select an element to edit properties</p>
      </div>
    );
  }

  const handleStyleChange = (property, value) => {
    onUpdateElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        [property]: value,
      },
    });
  };

  const handlePropertyChange = (property, value) => {
    onUpdateElement({
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        [property]: value,
      },
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        handlePropertyChange("imageUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCommonProperties = () => (
    <div className="space-y-4">
      <div>
        <Label>Width</Label>
        <Input
          type="number"
          value={parseInt(selectedElement.style?.width) || 200}
          onChange={(e) => handleStyleChange("width", `${e.target.value}px`)}
          min={100}
        />
      </div>
      <div>
        <Label>Height</Label>
        <Input
          type="number"
          value={parseInt(selectedElement.style?.height) || 150}
          onChange={(e) => handleStyleChange("height", `${e.target.value}px`)}
          min={50}
        />
      </div>
    </div>
  );

  const renderInputProperties = () => (
    <div className="space-y-4">
      {renderCommonProperties()}
      <div>
        <Label>Placeholder</Label>
        <Input
          value={selectedElement.properties?.placeholder || ""}
          onChange={(e) => handlePropertyChange("placeholder", e.target.value)}
        />
      </div>
      <div>
        <Label>Background Color</Label>
        <ColorPicker
          value={selectedElement.style?.backgroundColor || "#ffffff"}
          onChange={(color) => handleStyleChange("backgroundColor", color)}
        />
      </div>
      <div>
        <Label>Border Style</Label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedElement.style?.borderStyle || "solid"}
          onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>
      <div>
        <Label>Border Color</Label>
        <ColorPicker
          value={selectedElement.style?.borderColor || "#000000"}
          onChange={(color) => handleStyleChange("borderColor", color)}
        />
      </div>
    </div>
  );

  const renderButtonProperties = () => (
    <div className="space-y-4">
      {renderCommonProperties()}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedElement.properties?.disabled || false}
          onCheckedChange={(checked) =>
            handlePropertyChange("disabled", checked)
          }
        />
        <Label>Disabled</Label>
      </div>
      <div>
        <Label>Label</Label>
        <Input
          value={selectedElement.properties?.label || ""}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
        />
      </div>
      <div>
        <Label>Background Color</Label>
        <ColorPicker
          value={selectedElement.style?.backgroundColor || "#000000"}
          onChange={(color) => handleStyleChange("backgroundColor", color)}
        />
      </div>
      <div>
        <Label>Text Color</Label>
        <ColorPicker
          value={selectedElement.style?.color || "#000000"}
          onChange={(color) => handleStyleChange("color", color)}
        />
      </div>
      <div>
        <Label>Border Style</Label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedElement.style?.borderStyle || "solid"}
          onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>
      <div>
        <Label>Border Color</Label>
        <ColorPicker
          value={selectedElement.style?.borderColor || "#000000"}
          onChange={(color) => handleStyleChange("borderColor", color)}
        />
      </div>
    </div>
  );
  const renderUploadProperties = () => (
    <div className="space-y-4">
      {renderCommonProperties()}
      <div>
        <Label>Upload Image</Label>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          Choose Image
        </Button>
        <div>
          <Label>Background Color</Label>
          <ColorPicker
            value={selectedElement.style?.backgroundColor || "#ffffff"}
            onChange={(color) => handleStyleChange("backgroundColor", color)}
          />
        </div>
      </div>
      {uploadedImage && (
        <div>
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      )}
      <div>
        <Label>Border Style</Label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedElement.style?.borderStyle || "dashed"}
          onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>
    </div>
  );

  const renderCheckboxProperties = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedElement.properties?.disabled || false}
          onCheckedChange={(checked) =>
            handlePropertyChange("disabled", checked)
          }
        />
        <Label>Disabled</Label>
      </div>
      <div>
        <Label>Label</Label>
        <Input
          value={selectedElement.properties?.label || ""}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
        />
      </div>
    </div>
  );

  const renderProperties = () => {
    switch (selectedElement.type) {
      case "input":
        return renderInputProperties();
      case "upload":
        return renderUploadProperties();
      case "checkbox":
        return renderCheckboxProperties();
      case "button":
        return renderButtonProperties();
      default:
        return renderCommonProperties();
    }
  };

  return (
    <div className="w-64 bg-white p-4 shadow-lg h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        {renderProperties()}
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(selectedElement.instanceId)}
      >
        Delete Item
      </Button>
    </div>
  );
};

export default PropertyPanel;
