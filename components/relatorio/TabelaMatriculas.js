export default function TabelaMatriculas({ alunos, children }) {
    return (
        <div className="table">
            <thead>
                <tr>
                    <th className="text-left p-2 bg-blue-700 text-white">Coluna 1</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Coluna 2</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Coluna 3</th>
                    <th className="text-left p-2 bg-blue-700 text-white">Coluna 4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2">Linha 1</td>
                    <td className="p-2">Linha 1</td>
                    <td className="p-2">Linha 1</td>
                    <td className="p-2">Linha 1</td>
                </tr>
                <tr>
                    <td className="p-2">Linha 2</td>
                    <td className="p-2">Linha 2</td>
                    <td className="p-2">Linha 2</td>
                    <td className="p-2">Linha 2</td>
                </tr>
                <tr>
                    <td className="p-2">Linha 3</td>
                    <td className="p-2">Linha 3</td>
                    <td className="p-2">Linha 3</td>
                    <td className="p-2">Linha 3</td>
                </tr>
            </tbody>
        </div>
    )
}