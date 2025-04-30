import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Cadastro from './cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
