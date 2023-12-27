import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import CoffeeView from './components/coffee/coffeeView';
import InventoryView from './components/inventory/inventoryView';
import BrewsView from './components/brews/brewsView';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="*" element={<h1>:)</h1>}></Route>
                <Route path="coffee" element={<CoffeeView />} />
                <Route path="inventory" element={<InventoryView />} />
                <Route path="brews" element={<BrewsView></BrewsView>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
