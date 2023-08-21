import styled from "styled-components";
import LoginBackground from "./../assets/loginBackground.png";
import DefaultCard from "../components/Common/DefaultCard";
import { CardBody, CardTitle } from "reactstrap";
import { Formik, Form, Field } from "formik";
import ButtonWithLoading from "../components/Common/ButtonWithLoading";
import { signInUser } from "../utils/auth/emailAndPasswordLogin";
import { useAuth } from "../hooks/useAuth";

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
  width: 500px;
`;

const PaginaLogin = () => {
  const { loadingLogin, setloadingLogin } = useAuth();

  return (
    <Background>
      <CardContainer>
        <DefaultCard>
          <CardBody>
            <CardTitle tag="h5" className="mb-4 mt-2 text-center">
              Fetin - Sistema de Controle de Crédito
            </CardTitle>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                setloadingLogin(true);
                signInUser(values.email, values.password);
              }}
            >
              {() => (
                <Form>
                  <div className="form-group my-2">
                    <label htmlFor="email">Email</label>
                    <Field
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>

                  <div className="form-group my-2">
                    <label htmlFor="password">Senha</label>
                    <Field
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Digite sua senha"
                      required
                    />
                  </div>

                  <div className="form-group mt-4 w-100 d-flex justify-content-center">
                    <ButtonWithLoading
                      type="submit"
                      isLoading={loadingLogin}
                      className="w-25"
                    >
                      Entrar
                    </ButtonWithLoading>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </DefaultCard>
      </CardContainer>
    </Background>
  );
};

export default PaginaLogin;
