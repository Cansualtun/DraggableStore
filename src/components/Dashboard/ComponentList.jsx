import { FaUpload, FaKeyboard, FaCheckSquare, FaImage } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
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

const ComponentList = ({ onDragStart, recentComponents }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = JSON.parse(localStorage.getItem("templateList"));

  console.log(list, "of");

  const handleTemplate = (items, index) => {
    dispatch(addFullTemplate(items));
    dispatch(currentTemplateIndex(index));
  };
  return (
    <div className="w-64 bg-white p-4 shadow-lg flex flex-col min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Components</h2>

      {recentComponents?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Recently Used
          </h3>
          <div className="space-y-2">
            {recentComponents.map((component) => (
              <div
                key={`recent-${component.id}`}
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
      )}

      <div className="space-y-2 flex-grow">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          All Components
        </h3>
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
      <div>
        <p>Recently</p>
        {list?.map((item, index) => (
          <div key={index}>
            <Button
              onClick={() => {
                handleTemplate(item, index);
              }}
            >
              <p>Template - {index}</p>
            </Button>
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
  recentComponents: PropTypes.array.isRequired,
};

export default ComponentList;
