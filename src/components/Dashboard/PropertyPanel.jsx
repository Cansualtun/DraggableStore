import PropTypes from "prop-types";

const PropertyPanel = ({ selectedElement, onUpdateElement }) => {
  if (!selectedElement) {
    return (
      <div className="w-64 bg-white p-4 shadow-lg">
        <p className="text-gray-500">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  const handleStyleChange = (property, value) => {
    onUpdateElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        [property]: value,
      },
    });
  };

  return (
    <div className="w-64 bg-white p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>

      {/* Position */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Position</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm">Left (px)</label>
            <input
              type="number"
              value={selectedElement.position.x}
              onChange={(e) =>
                onUpdateElement({
                  ...selectedElement,
                  position: {
                    ...selectedElement.position,
                    x: parseInt(e.target.value),
                  },
                })
              }
              className="w-full p-1 border rounded"
            />
          </div>
          <div>
            <label className="text-sm">Top (px)</label>
            <input
              type="number"
              value={selectedElement.position.y}
              onChange={(e) =>
                onUpdateElement({
                  ...selectedElement,
                  position: {
                    ...selectedElement.position,
                    y: parseInt(e.target.value),
                  },
                })
              }
              className="w-full p-1 border rounded"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Dimensions</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm">Width (px)</label>
            <input
              type="number"
              value={parseInt(selectedElement.style?.width) || 200}
              onChange={(e) =>
                handleStyleChange("width", `${e.target.value}px`)
              }
              className="w-full p-1 border rounded"
            />
          </div>
          <div>
            <label className="text-sm">Height (px)</label>
            <input
              type="number"
              value={parseInt(selectedElement.style?.height) || 40}
              onChange={(e) =>
                handleStyleChange("height", `${e.target.value}px`)
              }
              className="w-full p-1 border rounded"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Style</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm">Background Color</label>
            <input
              type="color"
              value={selectedElement.style?.backgroundColor || "#ffffff"}
              onChange={(e) =>
                handleStyleChange("backgroundColor", e.target.value)
              }
              className="w-full p-1 border rounded"
            />
          </div>
          <div>
            <label className="text-sm">Border Color</label>
            <input
              type="color"
              value={selectedElement.style?.borderColor || "#000000"}
              onChange={(e) => handleStyleChange("borderColor", e.target.value)}
              className="w-full p-1 border rounded"
            />
          </div>
          <div>
            <label className="text-sm">Border Width (px)</label>
            <input
              type="number"
              value={parseInt(selectedElement.style?.borderWidth) || 1}
              onChange={(e) =>
                handleStyleChange("borderWidth", `${e.target.value}px`)
              }
              className="w-full p-1 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyPanel.propTypes = {
  selectedElement: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    style: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      backgroundColor: PropTypes.string,
      borderColor: PropTypes.string,
      borderWidth: PropTypes.string,
    }),
  }),
  onUpdateElement: PropTypes.func.isRequired,
};

PropertyPanel.defaultProps = {
  selectedElement: null,
};

export default PropertyPanel;
