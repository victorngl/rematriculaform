/* eslint-disable react/jsx-key */
import Head from 'next/head'
import { Prisma, PrismaClient } from '@prisma/client'
import React, { useState } from 'react';
import CardForm from './CardForm';
import RematriculaForm from './RematriculaForm'
/* Material Tailwind Imports */



export default function Home({ usuario }) {
  const [rematricula, setRematricula] = useState({});
 
  /*
  const router = useRouter()

  const {
    query: { slug },
  } = router
  */

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  

  return (
    <div style={{
      backgroundImage: 'url(https://cambauba.org.br/wp-content/uploads/2021/10/slide-2.jpg)'
    }}
      className='bg-cover flex justify-center items-center w-full'>
      <Head>
        <title>Rematricula - Escola Modelar Cambaúba</title>
        <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
      </Head>

      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
            <h3 className="pt-4 text-2xl text-center mb-5">Rematrícula 2023</h3>
            {isEmptyObject(rematricula)?
            <CardForm usuario={usuario} setRematricula={setRematricula} />
            :
            <RematriculaForm rematricula={rematricula} setRematricula={setRematricula} />}
          </div>
        </div>
      </div>
    </div>

  )

}
export async function getServerSideProps(ctx) {
  // Get all foods in the "food" db
  /*
  const res = await fetch('/api/get_info', {
    body: JSON.stringify({
      user: ctx.params.slug
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const result = await res.json();
  const usuario = result;
  */

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