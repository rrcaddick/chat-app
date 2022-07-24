import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const {
    user,
    isSuccess: { logout: logoutSuccess },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/");
    }
  }, [logoutSuccess, navigate]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
