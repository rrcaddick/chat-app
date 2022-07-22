import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
