import { UploadComponent } from "./components/UploadComponent";
import { InputComponent } from "./components/InputComponent";
import { ButtonComponent } from "./components/ButtonComponent";
import { CheckboxComponent } from "./components/CheckBoxComponent";

export const ComponentRenderer = ({ element, onSelect, isDragging }) => {
  const renderComponent = () => {
    const commonStyles = {
      width: element.style?.width || "200px",
      height: element.style?.height || "150px",
      minWidth: "100px",
      minHeight: "50px",
      backgroundColor: element.style?.backgroundColor,
      borderStyle: element.style?.borderStyle,
      borderColor: element.style?.borderColor,
      color: element.style?.color,
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
      case "button":
        return (
          <ButtonComponent
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
      id={element.instanceId}
      className={"absolute cursor-move select-none"}
      style={{
        left: `${element.position.x}px`,
        top: `${element.position.y}px`,
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={(e) => onSelect(e, element)}
    >
      {renderComponent()}
    </div>
  );
};
