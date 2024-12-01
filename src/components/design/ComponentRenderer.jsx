import PropTypes from "prop-types";
import { UploadComponent } from "./components/UploadComponent";
import { InputComponent } from "./components/InputComponent";
import { CheckboxComponent } from "./components/CheckBoxComponent";
import { ImageComponent } from "./components/ImageComponent";

export const ComponentRenderer = ({ element, isSelected, onSelect }) => {
  const renderComponent = () => {
    const commonStyles = {
      width: element.style?.width || "200px",
      height: element.style?.height || "150px",
      minWidth: "100px",
      minHeight: "50px",
      backgroundColor: element.style?.backgroundColor,
      borderStyle: element.style?.borderStyle,
      borderColor: element.style?.borderColor,
    };

    switch (element.type) {
      case "upload":
        return (
          <UploadComponent
            styles={commonStyles}
            properties={element.properties}
          />
        );
      case "input":
        return (
          <InputComponent
            styles={commonStyles}
            properties={element.properties}
          />
        );
      case "checkbox":
        return (
          <CheckboxComponent
            styles={commonStyles}
            properties={element.properties}
          />
        );
      case "image":
        return (
          <ImageComponent
            styles={commonStyles}
            properties={element.properties}
          />
        );
      default:
        return <div>Unsupported Component</div>;
    }
  };

  return (
    <div
      className={`absolute cursor-move select-none ${isSelected ? "" : ""}`}
      style={{
        left: `${element.position.x}px`,
        top: `${element.position.y}px`,
        touchAction: "none",
      }}
      onMouseDown={(e) => onSelect(e, element)}
    >
      {renderComponent(element.type, element.style, element.properties)}
    </div>
  );
};

ComponentRenderer.propTypes = {
  element: PropTypes.shape({
    instanceId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["input", "upload", "checkbox", "image"]).isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    style: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      backgroundColor: PropTypes.string,
      borderStyle: PropTypes.string,
      borderColor: PropTypes.string,
    }),
    properties: PropTypes.shape({
      placeholder: PropTypes.string,
      disabled: PropTypes.bool,
      label: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  checkBoundaries: PropTypes.func.isRequired,
};
