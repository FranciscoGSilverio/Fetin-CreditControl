import { useState } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { TbDoorExit } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import { HiOutlineLogout } from "react-icons/hi";
import { signOutUser } from "../utils/auth/emailAndPasswordLogin";

const Nav = styled.nav`
  color: #fff;
  width: 100vw;
  height: 90px;
  padding: 8px 5%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  border-bottom: 0.6px solid #577186;
`;

const NavTitle = styled.a`
  font-size: 1.8rem;
  font-weight: bold;
  flex-grow: 1;
  color: #577186;
  text-decoration: none;
  cursor: pointer;
  font-family: "Croissant One", sans-serif;

  &:hover {
    color: #577186;
  }
`;

const NavPlaceholder = styled.div`
  height: 70px;
`;

const NavLink = styled.a<{ $isHighlighted?: boolean }>`
  color: ${(props) => (props.$isHighlighted ? "#9db2bf" : "#577186")};
  border-bottom: ${(props) => props.$isHighlighted && "0.5px solid #9db2bf"};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 15px;
  cursor: pointer;

  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: #9db2bf;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    color: #9db2bf;

    &::after {
      transform: scaleX(1);
      height: 0.1px;
    }
  }
`;

const LogoutDropdownBtn = styled(DropdownItem)`
  &:active {
    background-color: #fff;
  }
`;

const Navbar = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { authUser } = useAuth();

  const isHighlighted = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <Nav>
        <NavTitle onClick={() => navigate("/")}>
          Sistema de controle de crédito
        </NavTitle>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mx-5">
            <NavLink
              $isHighlighted={isHighlighted("/")}
              onClick={() => navigate("/")}
            >
              Visão geral
            </NavLink>
            <NavLink
              $isHighlighted={isHighlighted("/clientes")}
              onClick={() => navigate("/clientes")}
            >
              Clientes
            </NavLink>
            <NavLink
              $isHighlighted={isHighlighted("/compras")}
              onClick={() => navigate("/compras")}
            >
              Compras
            </NavLink>
          </div>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen((prevState: boolean) => !prevState)}
          >
            <DropdownToggle style={{ background: "none", border: "none" }}>
              <FiUser
                size={25}
                style={{ cursor: "pointer", color: "#577186" }}
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem disabled style={{ color: "#000" }}>
                {authUser?.email || ""}
              </DropdownItem>
              <DropdownItem divider />
              <LogoutDropdownBtn
                style={{ color: "#577186" }}
                className="w-100 d-flex justify-content-between"
                onClick={() => signOutUser()}
              >
                <span>Sair</span>
                <TbDoorExit size={25} />
              </LogoutDropdownBtn>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Nav>
      <NavPlaceholder />
    </>
  );
};

export default Navbar;
