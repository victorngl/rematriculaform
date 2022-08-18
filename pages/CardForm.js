
import React from 'react';

/* Material Tailwind Imports */
import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  Typography,
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
        <div className='md:flex w-full gap-3'>
          {usuario.map((user, index) => (
            <Card key={user.naluno} className="mb-5 shadow-xl border-2">
              <CardBody className="text-left md:h-80 sm:h-80">
                <Typography variant="h6" className="mb-4 text-center">
                  {user.aceite_contrato == 0 ? (<Chip value='Aceite pendente' />) : <Chip color='green' value='Aceite realizado' />}
                </Typography>
                <ul className='mb-5'>
                  <li className='mb-5'>{user.matricula.nome}</li>
                  <li>Responsável Financeiro: {user.matricula.nomerespfinan}</li>
                </ul>

                <ul className=''>
                  {user.matricula.aceite_matricula > 0 &&  <li className='mb-5'>Aceite de Matricula realizado pelo usuário {user.matricula.user_aceite_matricula}</li>}
                  {user.matricula.parcelamento_cota > 0 && <li className='mb-5'>Parcelamento optado da cota-parte: {user.matricula.parcelamento_cota}x.</li>}
                  {user.matricula.regime > 0 && <li className='mb-5'>Regime optado: {user.matricula.regime}</li>}
                </ul>
              </CardBody>
              <CardFooter divider className="items-center text-center py-3">

                {user.aceite_contrato == 0 ?
                  <Button onClick={e => handleClick(e, index)} color='green'>Rematrícula</Button>
                  : <Button disabled color='green'>Rematrícula Realizada</Button>}

              </CardFooter>
            </Card>
          ))}
        </div>
        : <div className='p-4 text-justify text-lg'>Não existem alunos elegíveis para rematrícula relacionados a este usuário. Entre em contato com suporte@cambauba.org.br</div>}
    </div>
  )
}