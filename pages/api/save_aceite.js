// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body
  console.log(body);
  // Optional logging to see the responses
  // in the command line where next.js app is running.

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.aceite_contrato) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ error: 'Aceite contrato inválido' })
  }

  const prisma = new PrismaClient()

  let dataJsonRelatorio = {};

  if(body.aceite_contrato) { 
    dataJsonRelatorio = {...dataJsonRelatorio, aceite_contrato: Number(body.aceite_contrato)}
    dataJsonRelatorio = {...dataJsonRelatorio, date_aceite_contrato: body.date}
    dataJsonRelatorio = {...dataJsonRelatorio, ip_aceite_contrato: body.user_ip}
  }

  const updateRelatorio = await prisma.relatorio.update({
    where: {
      id: body.matricula.id,
    },
    data: dataJsonRelatorio,
    include: {
      matricula: true, // Return all fields
    },
  })


  let dataJson = {};

  if(parseInt(body.parcelamento_cota) > 0) {
    dataJson = {...dataJson, parcelamento_cota: parseInt(body.parcelamento_cota)}
    dataJson = {...dataJson, user_parcelamento: body.matricula.username}
    dataJson = {...dataJson, date_parcelamento: body.date}
    dataJson = {...dataJson, ip_parcelamento: body.user_ip}
  }

  if(parseInt(body.regime) > 0) {
    dataJson = {...dataJson, regime: parseInt(body.regime)}
    dataJson = {...dataJson, user_regime: body.matricula.username}
    dataJson = {...dataJson, date_regime: body.date}
    dataJson = {...dataJson, ip_regime: body.user_ip}

  }
  
  if(parseInt(body.aceite_matricula) > 0) {
    dataJson = {...dataJson, aceite_matricula: parseInt(body.aceite_matricula)}
    dataJson = {...dataJson, user_aceite_matricula: body.matricula.username}
    dataJson = {...dataJson, date_aceite_matricula: body.date}
    dataJson = {...dataJson, ip_aceite_matricula: body.user_ip}

  }


  const updateRematricula = await prisma.rematricula.update({
    where: {
      naluno: body.matricula.matricula.naluno,
    },
    data: dataJson,
  })

  //return res.status(200).json({ respfinan: `${Respfinan}` })
  return res.status(200).json({ relatorio: updateRelatorio,  })

  }

