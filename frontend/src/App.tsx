import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import InventoryView from './components/inventory/inventoryView';
import BrewsView from './components/brews/brewsView';
import "./styles.scss";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="*" element={<h1>:)</h1>}></Route>
                <Route path="inventory" element={<InventoryView/>}/>
                <Route path="brews" element={<BrewsView></BrewsView>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
