import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="task/:id" />
    </Routes>
  );
};
