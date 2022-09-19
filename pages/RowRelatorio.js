/* eslint-disable react/jsx-key */
import Head from 'next/head'
import Image from 'next/image'
import { Prisma, PrismaClient } from '@prisma/client'
import React, { useState } from 'react';
import CardForm from './CardForm';
import RematriculaForm from './RematriculaForm'
import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
/* Material Tailwind Imports */



export default function RowRelatorio({ user_remat, qtdAssociados }) {

  let qtdAceites = 0

  user_remat.relatorio.map((user_relat, index)=> ( 
    user_relat.aceite_contrato==1&&(qtdAceites = qtdAceites + 1)
  ));

  return ( <div>
    <ul>
      <li><a className='font-bold'>Aluno:</a> {user_remat.nome}</li>
      <li><a className='font-bold'>Associados:</a> {qtdAssociados}</li>
      {qtdAceites == qtdAssociados && <li><a className='font-bold'>Renovação completa</a></li>}
    </ul>
  </div>
    

  )}