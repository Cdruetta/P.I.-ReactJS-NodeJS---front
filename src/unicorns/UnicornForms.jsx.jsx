import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useUnicornForm } from "./useUnicornForm";

const UnicornForm = () => {   
    const { formData, onCreate, onUpdate, editingId } = useUnicornForm();  

    const initialValues = {
        name: formData.name || "",
        color: formData.color || "",
        age: formData.age || "",
        power: formData.power || "",
    };

    const validationSchema = Yup.object({  
        name: Yup.string().required("El nombre es requerido"),
        color: Yup.string().required("El color es requerido"),
        age: Yup.number()
        .typeError("La edad debe ser un número")
        .required("La edad es requerida")
        .positive("La edad debe ser mayor que 0")
        .integer("La edad debe ser un número entero"),
        power: Yup.string().required("El poder es requerido"),
    });

    const handleSubmit = (values) => {  
        const finalValues = {  
        ...values,
        age: Number(values.age),
    };

    if (editingId) { 
        onUpdate(finalValues);  
        } else {
        onCreate(finalValues);  
    }
    };

    return (
        <div className="p-4">
        <h2>{editingId ? "Editar Usuarioo" : "Crear Usuario"}</h2>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, errors, touched, handleBlur, setFieldValue, isSubmitting, isValid }) => (
            <Form className="p-fluid p-formgrid p-grid">

                {/* Nombre */}
                <div className="p-field p-col-12 p-md-4">
                <Field name="name">
                    {({ field }) => (
                    <InputText
                        {...field}
                        placeholder="Nombre"
                        className={touched.name && errors.name ? "p-invalid" : ""}
                    />
                    )}
                </Field>
                <small className="p-error">
                    <ErrorMessage name="name" />
                </small>
                </div>

                {/* Color */}
                <div className="p-field p-col-12 p-md-4">
                <Field name="color">
                    {({ field }) => (
                    <InputText
                        {...field}
                        placeholder="Color"
                        className={touched.color && errors.color ? "p-invalid" : ""}
                    />
                    )}
                </Field>
                <small className="p-error">
                    <ErrorMessage name="color" />
                </small>
                </div>

                {/* Edad */}
                <div className="p-field p-col-12 p-md-4">
                <Field name="age">
                    {({ field }) => (
                    <InputNumber
                        value={field.value}
                        onValueChange={(e) => setFieldValue("age", e.value)}
                        onBlur={handleBlur}
                        placeholder="Edad"
                        useGrouping={false}
                        min={1}
                        className={touched.age && errors.age ? "p-invalid" : ""}
                    />
                    )}
                </Field>
                <small className="p-error">
                    <ErrorMessage name="age" />
                </small>
                </div>

                {/* Poder */}
                <div className="p-field p-col-12 p-md-4">
                <Field name="power">
                    {({ field }) => (
                    <InputText
                        {...field}
                        placeholder="Poder"
                        className={touched.power && errors.power ? "p-invalid" : ""}
                    />
                    )}
                </Field>
                <small className="p-error">
                    <ErrorMessage name="power" />
                </small>
                </div>

                {/* Botón */}
                <div className="p-field p-col-12 p-md-4">
                <Button
                    type="submit"
                    label={editingId ? "Actualizar" : "Crear"}
                    icon={editingId ? "pi pi-check" : "pi pi-plus"}
                    disabled={isSubmitting || !isValid}
                />
                </div>

            </Form>
            )}
        </Formik>
        </div>
    );
};

export default UnicornForm;
