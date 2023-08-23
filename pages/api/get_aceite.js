// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body


  if (!body.cpf && !body.user_wpensar) {

    return res.status(400).json({ error: 'Credenciais inválidas' })
  }

  const prisma = new PrismaClient()

  const login = await prisma.responsaveis.findUnique({
    where: {
      cpf: body.cpf,
      user_wpensar: body.user_wpensar,
    },
    include: {
      aluno: true, // Return all fields
    },
  })

  //return res.status(200).json({ respfinan: `${Respfinan}` })
  return res.status(200).json({ data: login })

}

