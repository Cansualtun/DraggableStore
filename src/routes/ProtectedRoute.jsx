import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
