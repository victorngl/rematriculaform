// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.naluno) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ error: 'Número do aluno inválido' })
  }

  const prisma = new PrismaClient()

  const aceites = await prisma.relatorio.findMany({
    where: {
      AND: {
        naluno: parseInt(body.naluno),
      },
      OR: [
        {
          aceite_matricula: 1,
        },
        {
          aceite_contrato: 1,
        },
        {
          parcelamento_cotaparte: {
            gt: 0,
          },
        },
        {
          regime: {
            gt: 0,
          },
        },
      ],
    },
    include: {
      matricula: true, // Return all fields
    },
  })

  //return res.status(200).json({ respfinan: `${Respfinan}` })
  return res.status(200).json({ aceites: aceites })

}
