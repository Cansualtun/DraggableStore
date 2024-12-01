import { FaUpload, FaKeyboard, FaCheckSquare, FaTrash } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { logout } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BsMenuButton } from "react-icons/bs";

const componentList = [
  {
    id: "image-upload",
    name: "Image Upload",
    icon: <FaUpload size={24} />,
    type: "upload",
  },
  {
    id: "input",
    name: "Input Field",
    icon: <FaKeyboard size={24} />,
    type: "input",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    icon: <FaCheckSquare size={24} />,
    type: "checkbox",
  },
  {
    id: "button",
    name: "Button",
    icon: <BsMenuButton size={24} />,
    type: "button",
  },
];

const ComponentList = ({
  onDragStart,
  savedTemplates,
  setSavedTemplates,
  onLoadTemplate,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDeleteTemplate = (index) => {
    try {
      const updatedTemplates = savedTemplates.filter((_, idx) => idx !== index);
      localStorage.setItem("templateList", JSON.stringify(updatedTemplates));
      setSavedTemplates(updatedTemplates);

      toast({
        title: "Success",
        description: "Template deleted successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch {
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-64 bg-white p-4 shadow-lg flex flex-col h-full">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
        <div className="space-y-2">
          {componentList.map((component) => (
            <div
              key={component.id}
              draggable={true}
              onDragStart={(e) => onDragStart(e, component)}
              className="flex items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
            >
              {component.icon}
              <span className="ml-2">{component.name}</span>
            </div>
          ))}
        </div>

        {savedTemplates?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Saved Templates
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {savedTemplates.map((template, index) => (
                <Card key={index} className="p-2">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => onLoadTemplate(template, index)}
                      className="flex-1 text-left"
                    >
                      Template {index + 1}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTemplate(index)}
                      className="ml-2"
                    >
                      <FaTrash size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleLogout}
        className="w-full mt-4 flex items-center justify-center gap-2"
        variant="outline"
      >
        <CiLogout />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default ComponentList;
