import { FaUpload, FaKeyboard, FaCheckSquare, FaImage } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { logout } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFullTemplate, currentTemplateIndex } from "@/store/templateSlice";

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
  const savedTemplates = JSON.parse(localStorage.getItem("templateList")) || [];

  const handleTemplateSelect = (template, index) => {
    dispatch(addFullTemplate(template));
    dispatch(currentTemplateIndex(index));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white p-4 shadow-lg flex flex-col h-full">
      {/* Components Section */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
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
      {savedTemplates.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Saved Templates
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savedTemplates.map((template, index) => (
              <Card
                key={index}
                className="p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleTemplateSelect(template, index)}
              >
                <div className="flex items-center justify-between">
                  <span>Template {index + 1}</span>
                  <span className="text-xs text-gray-500">
                    {template.length} items
                  </span>
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
