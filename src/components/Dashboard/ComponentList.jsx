import { FaUpload, FaKeyboard, FaCheckSquare, FaImage } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { logout } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="w-64 bg-white p-4 shadow-lg flex flex-col min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-2 flex-grow">
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
      <Button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="w-full mt-4"
      >
        <CiLogout />
        Logout
      </Button>
    </div>
  );
};

ComponentList.propTypes = {
  onDragStart: PropTypes.func.isRequired,
};

export default ComponentList;
