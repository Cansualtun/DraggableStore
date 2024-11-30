import { FaUpload } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import PropTypes from "prop-types";

export const UploadComponent = ({ styles, properties }) => {
  return (
    <Card style={styles} className="shrink-0">
      <CardContent className="h-full p-4 flex flex-col items-center justify-center">
        {properties?.imageUrl ? (
          <img
            src={properties.imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div
            className={`border-2 ${
              styles.borderStyle || "border-dashed"
            } border-gray-300 rounded-lg p-4 w-full h-full flex flex-col items-center justify-center`}
          >
            <FaUpload className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-500 mt-2">Upload Image</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

UploadComponent.propTypes = {
  styles: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderStyle: PropTypes.string,
    borderColor: PropTypes.string,
  }).isRequired,
  properties: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
