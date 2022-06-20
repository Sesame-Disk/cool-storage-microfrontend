import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Logout = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    authContext.logout();
    navigate("/");
  };
  return (
    <button className={props.className} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
