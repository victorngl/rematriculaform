/* eslint-disable react/jsx-key */
import Head from 'next/head'
import React, { useState } from 'react';
import CardForm from './CardForm';
import RematriculaForm from './RematriculaForm'
import { Prisma, PrismaClient } from '@prisma/client'

/* Material Tailwind Imports */

export default function Home({ usuario }) {
  const [rematricula, setRematricula] = useState({});

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }



  return (
    <>
      <Head>
        <title>Rematricula - Escola Modelar Cambaúba</title>
        <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
      </Head>

      <div style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }} className='flex justify-center items-center w-full'>
    
        <div className="w-11/12">
          <div className="flex justify-center px-2 my-12 font-sans">
            <div className="bg-white p-2 rounded-lg border-2 shadow-md">
              <div className='flex pt-6 text-2xl text-center justify-center mb-6 items-center'>
                <img className='w-10 h-10 mr-5' alt='' src="https://cdn.nvi.wpensar.com.br/cambauba/logo_carteirinha/ce6c983fbba5132c7f619f32a51707d6a9ae2395.png" />
                <h3 className="font-semibold tracking-wide text-14">Renovação 2024</h3>
              </div>

              {isEmptyObject(rematricula) ?
                <CardForm usuario={usuario} setRematricula={setRematricula} />
                :
                <RematriculaForm rematricula={rematricula} setRematricula={setRematricula} />}
            </div>

          </div>
        </div>
      </div>
    </>
  )

}
export async function getServerSideProps(ctx) {
  const prisma = new PrismaClient()

  const usuario = await prisma.relatorio.findMany({

    where: {
      username: ctx.params.slug,
    },
    include: {
      matricula: true, // Return all fields
    },
  })

  return {
    props: { usuario },
  };

}