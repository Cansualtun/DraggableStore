import {
  FaUpload,
  FaKeyboard,
  FaCheckSquare,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { logout } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addFullTemplate,
  currentTemplateIndex,
  deleteTemplate,
} from "@/store/templateSlice";
import { useToast } from "@/hooks/use-toast";

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
    id: "image",
    name: "Image",
    icon: <FaImage size={24} />,
    type: "image",
  },
];

const ComponentList = ({ onDragStart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadTemplates = () => {
      const savedTemplates =
        JSON.parse(localStorage.getItem("templateList")) || [];
      setTemplates(savedTemplates);
    };
    loadTemplates();
  }, []);

  const handleTemplate = (items, index) => {
    try {
      dispatch(addFullTemplate(items));
      dispatch(currentTemplateIndex(index));
      toast({
        title: "Success",
        description: "Template loaded successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to load template",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTemplate = (index) => {
    try {
      const updatedTemplates = templates.filter((_, idx) => idx !== index);
      localStorage.setItem("templateList", JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);
      dispatch(deleteTemplate());
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
      </div>
      {templates.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Saved Templates
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {templates.map((template, index) => (
              <Card key={index} className="p-2">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => handleTemplate(template, index)}
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

ComponentList.propTypes = {
  onDragStart: PropTypes.func.isRequired,
};

export default ComponentList;
