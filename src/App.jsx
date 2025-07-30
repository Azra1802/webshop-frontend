import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/shop/HomePage";
import ProductDetails from "./pages/shop/ProductDetails";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct.jsx";
import OrderDetails from "./pages/admin/OrderDetails.jsx";
import EditProduct from "./pages/admin/EditProduct.jsx";
import ProductList from "./pages/admin/ProductList";
import OrderList from "./pages/admin/OrderList";
import Settings  from "./pages/admin/Settings.jsx"

import { CartProvider } from "./context/CartContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col w-full">
      {!isAdminRoute && <Header />}

      <main className="flex-grow w-full p-0 m-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="products" element={<ProductList />} />
            <Route path="settings" element={<Settings/>} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
