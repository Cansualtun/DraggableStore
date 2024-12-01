import { Input } from "@/components/ui/input";

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
