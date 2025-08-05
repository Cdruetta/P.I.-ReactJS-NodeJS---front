import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Register = () => {
    const { register } = useContext(AuthContext);

    const registerSchema = Yup.object({
        nombre: Yup.string().required("El nombre es requerido"),
        email: Yup.string().email("El correo es inválido").required("El correo es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
    });

    return (
        <Card title="Registro de usuario" style={{ maxWidth: 450, margin: "2rem auto" }}>
        <Formik
            initialValues={{
            nombre: "",
            email: "",
            password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values) => register(values)}
        >
            {({ errors, touched }) => (
            <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="field" style={{ marginBottom: '1rem' }}>
                <label htmlFor="nombre">Nombre</label>
                <Field name="nombre" as={InputText} style={{ width: '100%' }} />
                <ErrorMessage name="nombre" component="small" className="p-error" />
                </div>

                <div className="field" style={{ marginBottom: '1rem' }}>
                <label htmlFor="email">Email</label>
                <Field name="email" as={InputText} style={{ width: '100%' }} />
                <ErrorMessage name="email" component="small" className="p-error" />
                </div>

                <div className="field" style={{ marginBottom: '1rem' }}>
                <label htmlFor="password">Contraseña</label>
                <Field name="password" as={Password} toggleMask feedback={false} style={{ width: '100%' }} />
                <ErrorMessage name="password" component="small" className="p-error" />
                </div>

                <Button type="submit" label="Registrarse" className="mt-3" style={{ width: '100%' }} />
            </Form>
            )}
        </Formik>
        </Card>
    );
};

export default Register;
