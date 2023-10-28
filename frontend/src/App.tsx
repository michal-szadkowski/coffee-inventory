import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="*" element={<div>Page not found</div>}></Route>
			</Routes>
		</BrowserRouter>
  );
}

export default App;
