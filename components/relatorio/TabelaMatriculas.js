export default function TabelaMatriculas({ alunos, children }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="text-left p-2 bg-blue-700 text-white">Nome do Aluno</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Série Pretendida</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Cota-Parte</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Regime</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Financeiro</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Aceites</th>
                </tr>
            </thead>
            <tbody>
                {alunos.map((aluno, index) => (
                    <tr key={index}>
                        <td className="p-2">{aluno.nome}</td>
                        <td className="p-2">{aluno.pretendida}</td>
                        <td className="p-2">{aluno.parcelamento_cota}</td>
                        <td className="p-2">{aluno.regime}</td>
                        <td className="p-2">{aluno.pagante}</td>
                        <td className="p-2">
                            {aluno.relatorio.map((relatorio, index) => (
                                <a key={index}>|| {relatorio.nome} {relatorio.aceite_contrato} ||</a>
                            ))}
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}