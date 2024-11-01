import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './component/header';
import Footer  from './component/footer';
import Carousel from './component/carousel';
import Product from './component/product';
import About from './component/about';
import Home from './component/home';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="product" element={<Product/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
