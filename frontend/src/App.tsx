import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import CoffeeView from './components/coffee/coffeeView';
import InventoryView from './components/inventory/inventoryView';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="*" element={<h1>:)</h1>}></Route>
                <Route path="coffee" element={<CoffeeView />} />
                <Route path="inventory" element={<InventoryView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
