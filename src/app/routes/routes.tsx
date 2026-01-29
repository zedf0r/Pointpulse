import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage"));
const TaskPage = lazy(() => import("@/pages/TaskPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="task/:id" element={<TaskPage />} />
    </Routes>
  );
};
