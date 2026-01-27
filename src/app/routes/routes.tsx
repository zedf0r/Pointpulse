import { HomePage } from "@/pages/HomePage";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="task/:id" />
    </Routes>
  );
};
