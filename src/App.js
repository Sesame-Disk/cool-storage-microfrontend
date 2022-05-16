import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dash from "./components/layout/Dash";
import Dashboard from "./pages/Dashboard/Dashboard";
import Shared from "./pages/Dashboard/Shared";
import NotMatch from "./pages/NotMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="about" element={<p>About - NiHao</p>} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dash />}>
        <Route index element={<Dashboard />} />
        <Route path="my_libraries" element={<p>My Libraries - NiHao</p>} />
        <Route path="shared" element={<Shared />} />
      </Route>
      <Route path="404" element={<Main />}>
        <Route index element={<NotMatch />} />
      </Route>
      <Route path="*" element={<Navigate to="404" />} />
    </Routes>
  );
}

export default App;
