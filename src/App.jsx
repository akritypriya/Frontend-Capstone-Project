import './App.css'
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login';
import Home from './components/Home';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

export default App;

