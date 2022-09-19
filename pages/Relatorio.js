/* eslint-disable react/jsx-key */
import Head from 'next/head'
import Image from 'next/image'
import { Prisma, PrismaClient } from '@prisma/client'
import React, { useState } from 'react';
import CardForm from './CardForm';
import RematriculaForm from './RematriculaForm'
import RowRelatorio from './RowRelatorio'
import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
/* Material Tailwind Imports */



export default function Home({ rematriculas }) {
  const [rematricula, setRematricula] = useState({});

  /*
  const router = useRouter()

  const {
    query: { slug },
  } = router
  */


  function getAceites() {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  let numberOfRematricula = 0;
  let numberOfAceites = 0;

  rematriculas.map((user_remat, index)=> ( 
    user_remat.aceite_matricula==1&&(numberOfRematricula = numberOfRematricula + 1)
  ));

  return (
    <div
      className='bg-indigo-900 flex justify-center items-center w-full'>
      <Head>
        <title>Relatório de Rematrículas - Escola Modelar Cambaúba</title>
        <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
      </Head>

      <div className="w-full">
        <div className="flex justify-center px-2 my-12 font-sans">
          <div className="bg-white p-2 rounded-lg border-2 shadow-md">
            <div className='flex pt-6 text-2xl text-center justify-center mb-6 items-center'>
              <img className='w-10 h-10 mr-5' alt='' src="https://cdn.nvi.wpensar.com.br/cambauba/logo_carteirinha/ce6c983fbba5132c7f619f32a51707d6a9ae2395.png" />
              <h3 className="font-semibold tracking-wide text-14">Renovação 2023</h3>
            </div>
            <div className='text-lg font-bold my-5'>Renovações realizadas: {numberOfRematricula}</div>
            
            {rematriculas.map((user_remat, index) => (
              
              <ul className='mb-20'>
                <RowRelatorio user_remat={user_remat} qtdAssociados={Object.keys(user_remat.relatorio).length} />
              </ul>
            ))}

          </div>
          

        </div>
      </div>
    </div>

  )

}
export async function getServerSideProps(ctx) {
  const prisma = new PrismaClient()

  const rematriculas = await prisma.rematricula.findMany({
    include: {
      relatorio: true, // Return all fields
    },
  })
  

  return {
    props: { rematriculas },
  };

}