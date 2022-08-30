
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
        <div className='md:flex  md:w-10/12gap-3'>
          {usuario.map((user, index) => (
            <Card key={user.naluno} className="mb-5 shadow-xl border-2">
              <CardBody className="text-left md:h-80 sm:h-80">
                <Typography variant="h6" className="mb-4 text-center">
                  {user.aceite_contrato == 0 ? (<Chip value="Aceite pendente" />) : <Chip color="green" value="Aceite realizado" />}
                </Typography>
                <ul className='mb-15 text-center font-bold'>
                  <li className='mb-5'>{user.matricula.nome}</li>
                </ul>

               
                
                <div className='mt-8 mb-10 text-justify pr-10 pl-10'>
                  <div className='font-medium'>A arte da educação deve ser cultivada em todos os aspectos, para se tornar uma ciência construída a partir do conhecimento profundo da natureza humana.</div>
                  <div className='mt-2 text-right text-[16px]'>Johann Heinrich Pestalozzi</div>
                </div>
                <ul className='mt-12 text-center'>
                  {user.matricula.aceite_matricula > 0 &&  <li className='mb-5 text-sm'>Aceite de matrícula realizado pelo usuário {user.matricula.user_aceite_matricula}</li>}
                  {user.matricula.parcelamento_cota > 0 && <li className='mb-5'>Parcelamento optado da cota-parte: {user.matricula.parcelamento_cota}x.</li>}
                  {user.matricula.regime > 0 && <li className='mb-5'>Regime optado: {user.matricula.regime==1? 'Integral':'Parcial'}</li>}
                </ul>
              </CardBody>
              <CardFooter divider className="items-center text-center py-3">

                {user.aceite_contrato == 0 ?
                  <Button onClick={e => handleClick(e, index)} color='green'>Renovar matrícula</Button>
                  : <Button disabled color='green'>Renovação Realizada</Button>}

              </CardFooter>
            </Card>
          ))}
        </div>
        : <div className='p-4 text-justify text-lg'>Não existem alunos elegíveis para rematrícula relacionados a este usuário. Entre em contato com suporte@cambauba.org.br</div>}
    </div>
  )
}