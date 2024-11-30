import { UploadComponent } from "@/components/design/components/UploadComponent";
import { InputComponent } from "@/components/design/components/InputComponent";
import { CheckboxComponent } from "@/components/design/components/CheckBoxComponent";
import { ImageComponent } from "@/components/design/components/ImageComponent";
export const renderComponent = (type, style = {}, properties = {}) => {
  const commonStyles = {
    width: style.width || "200px",
    height: style.height || "150px",
    minWidth: "100px",
    minHeight: "50px",
    backgroundColor: style.backgroundColor,
    borderStyle: style.borderStyle,
    borderColor: style.borderColor,
  };

  const components = {
    upload: () => (
      <UploadComponent styles={commonStyles} properties={properties} />
    ),
    input: () => (
      <InputComponent styles={commonStyles} properties={properties} />
    ),
    checkbox: () => (
      <CheckboxComponent styles={commonStyles} properties={properties} />
    ),
    image: () => (
      <ImageComponent styles={commonStyles} properties={properties} />
    ),
  };

  return components[type]?.() || <div>Unsupported Component</div>;
};
