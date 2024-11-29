import {
  FaUpload,
  FaKeyboard,
  FaCheckSquare,
  FaFont,
  FaImage,
} from "react-icons/fa";
import PropTypes from "prop-types";

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
    id: "text",
    name: "Text",
    icon: <FaFont size={24} />,
    type: "text",
  },
  {
    id: "image",
    name: "Image",
    icon: <FaImage size={24} />,
    type: "image",
  },
];

const ComponentList = ({ onDragStart }) => {
  return (
    <div className="w-64 bg-white p-4 shadow-lg">
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
  );
};

ComponentList.propTypes = {
  onDragStart: PropTypes.func.isRequired,
};

export default ComponentList;
