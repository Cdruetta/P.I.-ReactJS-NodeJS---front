import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const LoginForm = () => {
    const { login } = useContext(AuthContext);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Email es inválido").required("Email es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
    });

    const onSubmitLogin = async (values) => {
        login(values);
    };

    return (
        <Card title="Iniciar sesión" style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitLogin}
            >
                {({ handleChange, values }) => (
                    <Form>
                        <label>Email</label>
                        <InputText 
                            name="email" 
                            value={values.email} 
                            onChange={handleChange} 
                            style={{ width: '100%', marginBottom: '1rem' }} 
                        />
                        <span className="text-danger">
                            <ErrorMessage name="email" />
                        </span>

                        <label>Contraseña</label>
                        <Password 
                            name="password" 
                            value={values.password} 
                            onChange={handleChange} 
                            feedback={false} 
                            toggleMask 
                            style={{ width: '100%', marginBottom: '1rem' }} 
                        />
                        <span className="text-danger">
                            <ErrorMessage name="password" />
                        </span>

                        <Button label="Iniciar sesión" type="submit" className="mt-2" style={{ width: '100%' }} />
                    </Form>
                )}
            </Formik>
        </Card>
    );
};

export default LoginForm;
