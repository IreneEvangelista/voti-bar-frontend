import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SalaChoice from './components/SalaChoice';
import SalaForm from './components/SalaForm';
import Sala from './components/Sala';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalaChoice />} />
        <Route path="/crea-sala" element={<SalaForm crea={true} />} />
        <Route path="/entra-sala" element={<SalaForm crea={false} />} />
        <Route path="/sala/:codice" element={<Sala />} />
      </Routes>
    </Router>
  );
}

export default App;
