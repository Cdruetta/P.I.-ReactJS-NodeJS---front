import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const RegisterForm = () => {
    const { register } = useContext(AuthContext);

    useEffect(() => {
        console.log("Componente RegisterForm montado");
    }, []);

    const initialValues = {
        nombre: "",
        email: "",
        password: "",
        edad: null
    };

    const validationSchema = Yup.object({
        nombre: Yup.string().required("El nombre es requerido"),
        email: Yup.string().email("El correo es inválido").required("El correo es requerido"),
        password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),
        edad: Yup.number().min(1, "La edad debe ser mayor a 0").required("La edad es requerida")
    });

    const onSubmit = async (values) => {
        console.log("Formulario enviado con los valores:", values);
        await register(values);
    };

    return (
        <Card title="Registrarse" style={{ maxWidth: 500, margin: "2rem auto" }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, values, setFieldValue }) => (
                    <Form className="p-fluid">
                        <div className="p-field p-mb-3">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText
                                id="nombre"
                                name="nombre"
                                value={values.nombre}
                                onChange={(e) => {
                                    console.log("Nombre:", e.target.value);
                                    handleChange(e);
                                }}
                            />
                            <small className="p-error">
                                <ErrorMessage name="nombre" />
                            </small>
                        </div>

                        <div className="p-field p-mb-3">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={(e) => {
                                    console.log("Email:", e.target.value);
                                    handleChange(e);
                                }}
                            />
                            <small className="p-error">
                                <ErrorMessage name="email" />
                            </small>
                        </div>

                        <div className="p-field p-mb-3">
                            <label htmlFor="password">Contraseña</label>
                            <Password
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={(e) => {
                                    console.log("Password:", e.target.value);
                                    handleChange(e);
                                }}
                                feedback={false}
                                toggleMask
                            />
                            <small className="p-error">
                                <ErrorMessage name="password" />
                            </small>
                        </div>

                        <div className="p-field p-mb-3">
                            <label htmlFor="edad">Edad</label>
                            <InputNumber
                                id="edad"
                                name="edad"
                                value={values.edad}
                                onValueChange={(e) => {
                                    console.log("Edad:", e.value);
                                    setFieldValue("edad", e.value);
                                }}
                                min={1}
                                max={100}
                                showButtons
                            />
                            <small className="p-error">
                                <ErrorMessage name="edad" />
                            </small>
                        </div>

                        <Button type="submit" label="Registrarse" className="p-mt-2" />
                    </Form>
                )}
            </Formik>
        </Card>
    );
};

export default RegisterForm;

