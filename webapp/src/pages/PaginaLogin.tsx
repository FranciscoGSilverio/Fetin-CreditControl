import styled from "styled-components";
import LoginBackground from "./../assets/loginBackground.png";
import DefaultCard from "../components/Common/DefaultCard";
import { CardBody, CardTitle } from "reactstrap";

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  background: url(${LoginBackground}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  width: 450px;
  height: 250px;
`;

const PaginaLogin = () => {
  return (
    <Background>
      <CardContainer>
        <DefaultCard>
          <CardBody>
            <CardTitle tag="h5" className="pb-3">
              Login
            </CardTitle>
          </CardBody>
        </DefaultCard>
      </CardContainer>
    </Background>
  );
};

export default PaginaLogin;
