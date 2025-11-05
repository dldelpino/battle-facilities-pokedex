import TableRow from './TableRow'

const Table = ({rows}) => {
  return (
    <>
        <table id='table-header'>
            <tbody>
                <tr>
                    <td width="151px" key={0} rowSpan={2} colSpan={2}>Pokémon</td>
                    <td width="150px" key={1} rowSpan={2} colSpan={2}>Item</td>
                    <td width="478px" key={2} rowSpan={2} colSpan={4}>Moves</td>
                    <td width="78px"  key={3} rowSpan={2} colSpan={4}>Nature</td>
                    <td width="298px" key={4} colSpan={6}>EVs</td>
                    <td width="184px" key={5} rowSpan={2}>Trainers</td>
                </tr>
                <tr>
                    <td width="49px" style={{fontSize: '10px'}}>HP</td>
                    <td width="50px" style={{fontSize: '10px'}}>Atk</td>
                    <td width="50px" style={{fontSize: '10px'}}>Def</td>
                    <td width="50px" style={{fontSize: '10px'}}>SpA</td>
                    <td width="50px" style={{fontSize: '10px'}}>SpD</td>
                    <td width="49px" style={{fontSize: '10px'}}>Spe</td>
                </tr>
            </tbody>
        </table>
        <table id='table-data'>
            <tbody>
                {rows.map((row, id) => (
                    typeof row == "string" ? (
                        <tr key={id}>
                            <td id="row-message">
                                {row}
                            </td>
                        </tr>
                    ) : <TableRow row={row} id={id} /> // id es el índice de cada set dentro del array
                ))}
            </tbody>
        </table>
        {/* <table>
            <col width="40"/><col width="100"/><col width="40"/><col width="120"/><col width="120"/><col width="120"/><col width="120"/><col width="120"/><col width="80"/><col width="50"/><col width="50"/><col width="50"/><col width="50"/><col width="50"/><col width="50"/><col width="180"/>
            <tdead>
                <tr>
                {columns.map(key => {
                    if (key == "Pokémon") {
                        return <td key={key} rowSpan={2} colSpan={2}>{key}</td>
                    }
                    if (key == "Item") {
                        return <td key={key} rowSpan={2} colSpan={2}>{key}</td>
                    }
                    if (key == "Moves") {
                        return <td key={key} rowSpan={2} colSpan={4}>{key}</td>
                    }
                    if (key == "EVs") {
                        return <td key={key} colSpan={6}>{key}</td>
                    }
                    return <td key={key} rowSpan={2}>{key}</td> // React necesita una key única para cada td; si no, devuelve un aviso en la consola
                })}
                </tr>
                <tr>
                    <td style={{fontSize: '10px'}}>HP</td>
                    <td style={{fontSize: '10px'}}>Atk</td>
                    <td style={{fontSize: '10px'}}>Def</td>
                    <td style={{fontSize: '10px'}}>SpA</td>
                    <td style={{fontSize: '10px'}}>SpD</td>
                    <td style={{fontSize: '10px'}}>Spe</td>
                </tr>
            </tdead>
            <tbody>
                {rows.map((row, id) => (
                    <TableRow row={row} id={id} /> // id es el índice de cada set dentro del array
                ))}
            </tbody>
        </table>
        <div style={{margin: "50px"}}></div> */}
    </>
  )
}

export default Table