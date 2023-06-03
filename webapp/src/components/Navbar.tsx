import React from "react";
import styled from "styled-components";

import { FiUser } from "react-icons/fi";

const Nav = styled.nav`
  color: #dde6ed;
  width: 100vw;
  height: 60px;
  padding: 8px 20px;
  background-color: #27374d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const NavTitle = styled.span`
  font-size: 1.75rem;
  font-weight: bold;
  flex-grow: 1;
`;

const NavPlaceholder = styled.div`
  height: 60px;
`;

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavTitle>Sistema de controle de crédito</NavTitle>
        <div className="d-flex">
          <FiUser size={25} style={{ cursor: "pointer" }} />
        </div>
      </Nav>
      <NavPlaceholder />
    </>
  );
};

export default Navbar;
