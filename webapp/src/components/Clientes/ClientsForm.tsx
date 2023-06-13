import { Field, Form, Formik } from "formik";
import { Button } from "reactstrap";

const ClientsForm = () => {
  return (
    <Formik
      initialValues={{ name: "", age: 0, email: "", whatsAppNumber: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <div className="d-flex mb-3">
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor=" name" className="form-label">
                Nome completo
              </label>
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="age" className="form-label">
                Idade
              </label>
              <Field
                type="number"
                className="form-control"
                id="age"
                name="age"
              />
            </div>
          </div>

          <div className="d-flex">
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="email" className="form-label">
                Endereço de email
              </label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="whatsAppNumber" className="form-label">
                Número de WhatsApp
              </label>
              <Field
                type="text"
                className="form-control"
                id="whatsAppNumber"
                name="whatsAppNumber"
              />
              <div id="emailHelp" className="form-text">
                *Número usado somente para contato referente aos prazos das
                parcelas. Não compartilhamos ou enviamos spam para os números
                cadastrados.
              </div>
            </div>
          </div>
          <div className="px-3">
            <Button type="submit" style={{ backgroundColor: "#27374D" }}>
              Criar cliente
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ClientsForm;
