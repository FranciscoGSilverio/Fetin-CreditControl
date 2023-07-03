import { FiShoppingCart } from "react-icons/fi";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const PurchaseButton = styled.button`
  background-color: #27374d;
  color: aliceblue;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;

  position: fixed;
  bottom: 20px;
  right: 5%;

  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

const NewPurchaseButton = () => {
  let navigate = useNavigate();

  return (
    <PurchaseButton onClick={() => navigate("/compras")}>
      <FiShoppingCart size={22} />
    </PurchaseButton>
  );
};

export default NewPurchaseButton;
