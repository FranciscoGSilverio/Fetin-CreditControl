import styled from "styled-components";
import { FiUser } from "react-icons/fi";

const Nav = styled.nav`
  color: #dde6ed;
  width: 100vw;
  height: 70px;
  padding: 8px 5%;
  background-color: #27374d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const NavTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  flex-grow: 1;
`;

const NavPlaceholder = styled.div`
  height: 70px;
`;

const NavLink = styled.a`
  color: #9db2bf;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 5px;

  border-bottom: 0px solid #526d82;

  transition: 0.5s;

  &:hover {
    /* text-decoration: underline; */
    border-bottom: 1px solid #526d82;
    color: #526d82;
    cursor: pointer;
  }
`;

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavTitle>Sistema de controle de crédito</NavTitle>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mx-5">
            <NavLink>Visão geral</NavLink>
            <NavLink>Clientes</NavLink>
            <NavLink>Compras</NavLink>
          </div>
          <FiUser size={25} style={{ cursor: "pointer" }} />
        </div>
      </Nav>
      <NavPlaceholder />
    </>
  );
};

export default Navbar;
