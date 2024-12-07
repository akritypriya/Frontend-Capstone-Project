import './App.css'
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);

export default App;

