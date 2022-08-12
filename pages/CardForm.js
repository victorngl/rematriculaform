
import React, { Fragment, useEffect, useState } from 'react';

/* Material Tailwind Imports */
import {
  Tabs,
  Chip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Switch,
  Button,
} from "@material-tailwind/react";


export default function CardForm({ usuario, setRematricula }) {

  function IsRespFinan(usuario) {
    if (usuario.matricula.cpfrespfinan == usuario.cpf) {
      return true
    }

    return false
  }

  const handleClick = (event, index) => {
    event.preventDefault();
    setRematricula(usuario[index]);
  }

  
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      {!isEmptyObject(usuario) ?
        <div className='lg:flex md:flex text-center'>
          {usuario.map((user, index) => (
            <Card key={user.naluno} className="mb-5 ml-4"  >
              <CardBody className="text-center">
                <Typography variant="h6" className="mb-4">
                  {user.aceite_contrato === 0 ? (<Chip value='Aceite pendente' />) : <Chip color='green' value='Aceite realizado' />}
                </Typography>
                Magna proident excepteur nisi nostrud non commodo dolore ut incididunt ea consequat dolor irure velit. Deserunt esse in irure laborum adipisicing ut dolore proident laborum aliquip ipsum sunt sint quis. Quis exercitation non ex consectetur ad. Ad nulla voluptate id pariatur magna qui incididunt.
              </CardBody>
              <CardFooter divider className="items-center py-3">

                {user.aceite_contrato == 0 ?
                  <Button onClick={e => handleClick(e, index)} color='green'>Rematrícula</Button>
                  : <Button disabled color='green'>Rematrícula Realizada</Button>}

              </CardFooter>
            </Card>
          ))}
        </div>
        : "Não existem alunos elegíveis para rematrícula"}
    </div>
  )
}