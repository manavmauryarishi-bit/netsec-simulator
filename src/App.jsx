import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SimulationCanvas from './pages/SimulationCanvas';
import BusinessImpact from './pages/BusinessImpact';
import About from './pages/About';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="simulation" element={<SimulationCanvas />} />
          <Route path="business-impact" element={<BusinessImpact />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
