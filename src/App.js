import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./ui/layout+routes/MainLayout"; 
import routes from "./ui/layout+routes/Routes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
