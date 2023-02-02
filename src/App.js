import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/layout+routes/MainLayout";
import routes from "./ui/layout+routes/Routes"
import Error from "./ui/components/Error";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
          <Route path="*" element={<Error />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
