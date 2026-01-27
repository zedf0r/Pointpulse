import { BrowserRouter } from "react-router-dom";
import "@/assets/scss/global.scss";
import { AppRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
