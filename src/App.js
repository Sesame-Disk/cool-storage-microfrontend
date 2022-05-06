import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import NotMatch from "./pages/NotMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="about" element={<p>About - NiHao</p>} />
      </Route>
      <Route path="404" element={<Main />}>
        <Route index element={<NotMatch />} />
      </Route>
      <Route path="*" element={<Navigate to="404" />} />
    </Routes>
  );
}

export default App;
