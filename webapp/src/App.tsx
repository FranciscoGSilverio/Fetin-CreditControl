import { Route, Routes } from "react-router-dom";

import PaginaClientes from "./pages/PaginaClientes";
import PaginaDashboard from "./pages/PaginaDashboard";
import PaginaCompras from "./pages/PaginaCompras";
import Redirect from "./components/Auth/Redirect";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

import { Container } from "react-bootstrap";
import { useAuth } from "./hooks/useAuth";
import PaginaLogin from "./pages/PaginaLogin";

function App() {
  const { authUser } = useAuth();

  const isAuthenticated = authUser ? true : false;

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Container style={{ paddingTop: "30px" }}>
            <Routes>
              <Route path="/" element={<PaginaDashboard />} />
              <Route path="/clientes" element={<PaginaClientes />} />
              <Route path="/compras" element={<PaginaCompras />} />
            </Routes>
          </Container>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      )}
    </>
  );
}

export default App;
