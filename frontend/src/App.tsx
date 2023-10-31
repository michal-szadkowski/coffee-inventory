import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import CoffeeView from './components/coffee/coffeeView';

function App() {
  return (
    <BrowserRouter>
			<Navbar />
			<Routes>
              <Route path="*" element={<div>Page not found</div>}></Route>
              <Route path="coffee" element={<CoffeeView />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
