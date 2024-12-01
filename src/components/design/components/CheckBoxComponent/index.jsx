import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const CheckboxComponent = ({ styles, properties }) => {
  return (
    <div style={styles} className="shrink-0 flex items-center space-x-2 p-4">
      <Checkbox disabled={properties?.disabled} className="shrink-0" />
      <Label>{properties?.label || "Checkbox Label"}</Label>
    </div>
  );
};
