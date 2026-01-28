import { BrowserRouter } from "react-router-dom";
import "@/assets/scss/global.scss";
import { AppRoutes } from "./routes/routes";
import { Providers } from "./provider/Providers";

function App() {
  return (
    <BrowserRouter basename="/">
      <Providers>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
