import './App.css';
import { Provider } from 'react-redux';
import store from './slide/store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './component/header';
import Footer from './component/footer';
import OrderSuccess from './component/orderSuccess';
import Product from './component/product';
import About from './component/about';
import Home from './component/home';
import Productdetails from './component/prodetail';
import Login from './component/login';
import Cart from './component/cart';
import Register from './component/register';
import Historybuy from './component/historybuy';
import AdminLayout from "./admin/AdminLayout";
import Logina from './admin/login';
import Homea from './admin/Home';
import Add from './admin/add';
import Addpro from './admin/addpro';
import Update from './admin/update';
import Historya from './admin/historybuy';
import UserLayout from './component/UserLayout';
function App() {
  const isAuthenticated = localStorage.getItem("adminToken");

  // Component ProtectedRoute
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/admin/login" replace />;
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes với UserLayout */}
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productdetail/:id" element={<Productdetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order/:detailPay" element={<OrderSuccess />} />
            <Route path="/history" element={<Historybuy />} />
          </Route>

          {/* Admin Routes với AdminLayout */}
          <Route path="/admin/login" element={<Logina />} />
          <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} />}>
            <Route path="home" element={<Homea />} />
            <Route path="add" element={<Add />} />
            <Route path="addpro" element={<Addpro />} />
            <Route path="update/:id" element={<Update />} />
            <Route path="history" element={<Historya />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

// Tạo một component con để xử lý header và location
function AppWithHeader() {
  const location = window.location.pathname; // Truy cập pathname trực tiếp
  const isPublicPage = ["/", "/about", "/product", "/productdetail/", "/cart", "/login", "/register"].includes(location);

  return (
    <>
      {isPublicPage && <Header />}
      
    </>
  );
}

export default App;
