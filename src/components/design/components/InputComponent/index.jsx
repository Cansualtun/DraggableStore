import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

export const InputComponent = ({ styles, properties }) => {
  return (
    <Input
      type="text"
      placeholder={properties?.placeholder || "Enter text..."}
      style={styles}
      className="shrink-0"
    />
  );
};

InputComponent.propTypes = {
  styles: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderStyle: PropTypes.string,
    borderColor: PropTypes.string,
  }).isRequired,
  properties: PropTypes.shape({
    placeholder: PropTypes.string,
  }).isRequired,
};
