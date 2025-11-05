import TableRow from './TableRow'

const Table = ({rows}) => {
  return (
    <>
        <table id='table-header'>
            <tbody>
                <tr>
                    <td width="151px" rowSpan={2} colSpan={2}>Pokémon</td>
                    <td width="150px" rowSpan={2} colSpan={2}>Item</td>
                    <td width="478px" rowSpan={2} colSpan={4}>Moves</td>
                    <td width="78px"  rowSpan={2} colSpan={4}>Nature</td>
                    <td width="298px" colSpan={6}>EVs</td>
                    <td width="184px" rowSpan={2}>Trainers</td>
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
                    ) : <TableRow row={row} key={id}/>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Table