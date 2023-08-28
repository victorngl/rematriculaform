import { Prisma, PrismaClient } from '@prisma/client'
import Head from 'next/head'
import TabelaMatriculas from '../../components/relatorio/TabelaMatriculas'

export default function Matriculas({ aluno }) {



    return (
        <>
            <Head>
                <title>Rematricula - Escola Modelar Cambaúba</title>
                <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
            </Head>
            <div className='m-10 justify-center flex bg-black'>
               
                <TabelaMatriculas></TabelaMatriculas>
            </div>

        </>
    )

}

export async function getServerSideProps(ctx) {
    const prisma = new PrismaClient()

    const alunos = await prisma.rematricula.findMany({

        where: {
            aceite_matricula: 1
        },
        include: {
            relatorio: true, // Return all fields
        },
    })

    return {
        props: { alunos },
    };

}