import { Card, CardContent } from "@/components/ui/card";
import PropTypes from "prop-types";

export const ImageComponent = ({ styles }) => {
  return (
    <Card style={styles} className="shrink-0">
      <CardContent className="h-full p-4 flex items-center justify-center">
        <div className="text-gray-500">Image Placeholder</div>
      </CardContent>
    </Card>
  );
};

ImageComponent.propTypes = {
  styles: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderStyle: PropTypes.string,
    borderColor: PropTypes.string,
  }).isRequired,
  properties: PropTypes.shape({}).isRequired,
};
