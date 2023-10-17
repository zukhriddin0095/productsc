import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import CategoryPage from "./pages/category/CategoryPage";
import ProductPage from "./pages/product/ProductPage";
import FrontLayout from "./components/Layout/FrontLayout";
import { AuthContext } from "./context/AuthContex";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<FrontLayout />}>
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Route>
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
