import { useDispatch, useSelector } from "react-redux";
import { addTemplate, clearCurrentTemplateIndex } from "@/store/templateSlice";

export const useTemplateManagement = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.template.templates);
  const currentTemplateIndex = useSelector((state) => state.template.index);

  const saveTemplate = (isNewTemplate) => {
    if (currentTemplateIndex !== null && !isNewTemplate) {
      const templateList = JSON.parse(
        localStorage.getItem("templateList") || "[]"
      );
      const updatedList = [
        ...templateList.filter((_, index) => index !== currentTemplateIndex),
        templates,
      ];
      localStorage.setItem("templateList", JSON.stringify(updatedList));
    } else {
      const currentTemplates = JSON.parse(
        localStorage.getItem("templateList") || "[]"
      );
      const updatedTemplates = [...currentTemplates, templates];
      localStorage.setItem("templateList", JSON.stringify(updatedTemplates));
      dispatch(addTemplate());
    }
  };

  const clearDesign = () => {
    dispatch(clearCurrentTemplateIndex());
  };

  return {
    saveTemplate,
    clearDesign,
    templates,
    currentTemplateIndex,
  };
};
