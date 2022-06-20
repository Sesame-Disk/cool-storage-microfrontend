import { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dash from "./components/layout/Dash";
import Dashboard from "./pages/Dashboard/Dashboard";
import Shared from "./pages/Dashboard/Shared";
import Settings from "./pages/Dashboard/Settings";
import NotMatch from "./pages/NotMatch";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.verifyToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="about" element={<p>About - NiHao</p>} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route
        element={<ProtectedRoute isAllowed={!authContext.isAuthenticated} />}
      >
        <Route path="dashboard" element={<Dash />}>
          <Route index element={<Dashboard />} />
          <Route path="my_libraries" element={<p>My Libraries - NiHao</p>} />
          <Route path="shared" element={<Shared />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="404" element={<Main />}>
        <Route index element={<NotMatch />} />
      </Route>
      <Route path="*" element={<Navigate to="404" />} />
    </Routes>
  );
}

export default App;
