import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const ProductForm = ({ formData, onCreate, onSaveEdit, isEditing }) => {
  const initialValues = {
    name: formData?.name || "",
    price: formData?.price || "",
    category: formData?.category || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre del producto es obligatorio"),
    price: Yup.number()
      .typeError("El precio debe ser un número válido")
      .positive("El precio debe ser mayor que 0")
      .required("El precio es obligatorio"),
    category: Yup.string().required("La categoría es obligatoria"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (isEditing) {
      onSaveEdit(values);
    } else {
      onCreate(values);
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen p-4">
      <div className="w-full md:w-8 lg:w-6">
        <Card title={isEditing ? "Editar Producto" : "Nuevo Producto"} className="shadow-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize 
          >
            {({ errors, touched, isSubmitting, isValid }) => (
              <Form className="p-fluid">
                <div className="field mb-4">
                  <Field name="name">
                    {({ field }) => (
                      <InputText
                        {...field}
                        placeholder="Nombre del producto"
                        className={touched.name && errors.name ? "p-invalid" : ""}
                      />
                    )}
                  </Field>
                  <small className="p-error">
                    <ErrorMessage name="name" />
                  </small>
                </div>

                <div className="field mb-4">
                  <Field name="price">
                    {({ field }) => (
                      <InputText
                        {...field}
                        placeholder="Precio"
                        className={touched.price && errors.price ? "p-invalid" : ""}
                        keyfilter="money"
                      />
                    )}
                  </Field>
                  <small className="p-error">
                    <ErrorMessage name="price" />
                  </small>
                </div>

                <div className="field mb-4">
                  <Field name="category">
                    {({ field }) => (
                      <InputText
                        {...field}
                        placeholder="Categoría"
                        className={touched.category && errors.category ? "p-invalid" : ""}
                      />
                    )}
                  </Field>
                  <small className="p-error">
                    <ErrorMessage name="category" />
                  </small>
                </div>

                <Button
                  label={isEditing ? "Guardar Cambios" : "Agregar Producto"}
                  icon={isEditing ? "pi pi-check" : "pi pi-plus"}
                  type="submit"
                  className="w-full p-button-secondary"
                  disabled={isSubmitting || !isValid}
                />
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default ProductForm;
