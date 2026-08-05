import db from "@/db/firebase"
import { addDoc, collection } from "firebase/firestore"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import * as Yup from 'yup'

export default function FormComponet({
  setEnviado,
}: {
  setEnviado: Dispatch<SetStateAction<boolean>>
}) {

  const registerSchema = Yup.object().shape({
    nombre: Yup.string().min(2, "Escribe un nombre más largo").required("Este campo es requerido"),
    apellidos: Yup.string().min(2, "Escribe un apellido más largo").required("Este campo es requerido"),
    correo: Yup.string().email("Correo inválido").required("Este campo es requerido"),
    telefono: Yup.string().matches(/^\d{10}$/, "Debe contener 10 dígitos").required("Este campo es requerido"),
    pais: Yup.string().required("Este campo es requerido"),
    empresa: Yup.string().required("Este campo es requerido"),
    cargo: Yup.string().required("Este campo es requerido"),
  })

  return (
    <Formik
      initialValues={{
        nombre: '',
        apellidos: '',
        correo: '',
        telefono: '',
        empresa: '',
        cargo: '',
        pais: '',
        email_contact: false,
        phone_contact: false,
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await addDoc(collection(db, 'HP-ACF-13-08-2026'), {
          fecha: Date.now(),
          ...values,
        })

        try {
          await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: values.correo,
              subject: 'Registro exitoso. Te esperamos.',
              text: 'HP',
            }),
          })
        } catch (error) {
          console.log(error)
        }

        resetForm()
        setSubmitting(false)
        setEnviado(true)
      }}
    >
      {({ errors, isSubmitting }) => (
        <Form
          className="
            flex flex-col
            pt-6
            px-4
            md:px-0
            md:w-2/3
            min-h-screen
            h-auto
            font-formaMicro
          "
        >

          {/* Campos */}
          <div className="flex flex-col gap-4 flex-grow">

            {[
              { name: 'nombre', placeholder: 'Nombre', type: 'text' },
              { name: 'apellidos', placeholder: 'Apellidos', type: 'text' },
              { name: 'correo', placeholder: 'Correo', type: 'email' },
              { name: 'telefono', placeholder: 'Teléfono', type: 'tel', inputMode: 'numeric' },
              { name: 'empresa', placeholder: 'Organización', type: 'text' },
              { name: 'cargo', placeholder: 'Cargo', type: 'text' },
              { name: 'pais', placeholder: 'País', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <Field
                  name={field.name}
                  type={field.type}
                  inputMode={(field as any).inputMode}
                  placeholder={field.placeholder}
                  className="border-y-2 bg-white text-2xl md:text-3xl py-2 px-3"
                />
                <p className="px-3 text-red-600 text-sm">
                  {(errors as any)[field.name]}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-[linear-gradient(110deg,_#ffffff_75%)] rounded py-5 md:px-10 my-0 flex md:flex-row flex-col font-formaMicro md:h-1/4">
            <div className="text-[.6rem] lg:text-sm w-4/5 flex flex-col md:justify-center mx-auto">
              <p>HP respeta su privacidad. Visite la {' '}
                <a href="https://www.hp.com/mx-es/privacy/privacy.html" className="border-b border-black">
                  Declaración de privacidad de HP
                </a> para conocer cómo HP consigue y hace uso de sus datos personales.
              </p>

              <label>
                <Field type="checkbox" name="email_contact" className="mr-2" />
                HP me puede contactar para enviarme ofertas personalizadas, información de soporte y noticias de eventos por correo electrónico.
              </label>
              <label>
                <Field type="checkbox" name="phone_contact" className="mr-2" />
                HP me puede contactar para enviarme ofertas personalizadas, información de soporte y noticias de eventos por teléfono.
              </label>
              {/* <br /> */}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`ml-auto text-xl rounded p-5 h-3/5 md:w-1/6 w-1/2 mx-auto ${isSubmitting
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-black text-white"
                }`}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
