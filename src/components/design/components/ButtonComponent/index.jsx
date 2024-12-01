import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export const ButtonComponent = ({ styles, properties }) => {
  return (
    <Button
      style={{
        ...styles,
        backgroundColor: styles.backgroundColor || "#000000",
        borderStyle: styles.borderStyle || "solid",
        borderWidth: "1px",
        color: styles.color || "#000000",
      }}
      className="shrink-0"
      disabled={properties?.disabled}
    >
      {properties?.label || "Button"}
    </Button>
  );
};

ButtonComponent.propTypes = {
  styles: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderStyle: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  properties: PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string,
  }).isRequired,
};
