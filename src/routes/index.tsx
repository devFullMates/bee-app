import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

const RoutesPath = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
};

export default RoutesPath;
