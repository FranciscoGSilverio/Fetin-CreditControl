import { Route, Routes } from "react-router-dom";

import PaginaClientes from "./pages/PaginaClientes";
import PaginaDashboard from "./pages/PaginaDashboard";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: "10px" }}>
        <Routes>
          <Route path="/" element={<PaginaDashboard />} />
          <Route path="/clientes" element={<PaginaClientes />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
