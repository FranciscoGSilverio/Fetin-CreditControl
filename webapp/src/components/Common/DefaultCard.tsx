import * as React from "react";
import styled from "styled-components";

const ShadowedCard = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 25px;
  border-radius: 10px;
`;

type DefaultCardProps = {
  children: React.ReactNode;
};

const DefaultCard = ({ children }: DefaultCardProps) => {
  return <ShadowedCard>{children}</ShadowedCard>;
};

export default DefaultCard;
