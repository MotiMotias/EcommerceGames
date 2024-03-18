import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import CartContextProvider from './Store/CartContextProvider';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/Products/ProductDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <Header/>
          <main>
            <Routes>
              <Route path="/" element={<Products />}/>
              <Route path="/details/:id" element={<ProductDetails/> }/>
            </Routes>
          </main>
        </CartContextProvider>
      </BrowserRouter>
      
      
    </>
  );
}

export default App;
