import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChallengePage from './pages/ChallengePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/challenge/:id" element={<ChallengePage />} />
    </Routes>
  );
}
