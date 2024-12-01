import { Button } from "@/components/ui/button";

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
