import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const ColorPicker = ({ value, onChange }) => {
  const [color, setColor] = useState(value || "#ffffff");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-8 p-0 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs">{color}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <HexColorPicker color={color} onChange={handleColorChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
