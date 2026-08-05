'use client'

import FormComponet from "@/components/Form"
import Image from "next/image"
import { useState } from "react"

function Home() {
  const [enviado, setEnviado] = useState<boolean>(false)

  return (
    <>
      {!enviado ? (
        <main className="min-h-screen flex flex-col md:flex-row">

          {/* Imagen izquierda */}
<section className="w-full md:w-1/3 overflow-hidden flex items-center">
  <img
    src="/BG.png"
    alt="HP background"
    className="w-full h-auto block"
  />
</section>

          {/* Formulario */}
          <FormComponet setEnviado={setEnviado} />

        </main>
      ) : (
        <main
          className="min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-20 py-10 font-formaMicro"
          style={{
            backgroundImage: `
              linear-gradient(
                110deg,
                #ffffff 0%,
                #ffffff 72%,
                #1e49cf 72%,
                #1e49cf 80%,
                #ffffff 80%,
                #ffffff 88%,
                #1e49cf 88%,
                #1e49cf 96%,
                #ffffff 96%,
                #ffffff 100%
              )
            `,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Logo */}
          <div className="mb-8 md:mb-10">
            <Image
              src="/Logo.png"
              alt="ACF Logo"
              width={160}
              height={80}
              className="w-24 sm:w-32 md:w-40 h-auto"
              priority
            />
          </div>

          {/* Texto */}
          <div className="w-full max-w-4xl">
            <h1 className="font-formaDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-black leading-tight mb-4">
              HP |Tech Day HP
            </h1>

            <h2 className="font-formaDisplay text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black leading-tight">
              ¡Tu registro <br className="hidden sm:block" />
              está completo!
            </h2>
          </div>
        </main>
      )}
    </>
  )
}

export default Home