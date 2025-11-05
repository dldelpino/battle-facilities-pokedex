import React, {useState} from 'react'
import moveTypes from "../data/moveTypes.json";

const typeColors = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Unknown: "#68A090",
  None: "rgb(50, 50, 50)"
}

const TableRow = ({row, id}) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <tr key={id}>
      <td> {/* anchura de 52px (32px imagen + 10px padding-left + 10px padding-right)*/} 
        <img className="static" src={"pokemon_icons/png/" + row["#"] + ".png"}/>
        <img className="active" src={"pokemon_icons/gif/" + row["#"] + ".gif"}/>
      </td>

      <td width="100px" style={{textAlign: 'left'}}>
        {row["Pokémon"]}
      </td>

      <td> {/* anchura de 52px (32px imagen + 10px padding-left + 10px padding-right)*/} 
        <img src={"item_icons/" + row["Item"].toLowerCase().replace(/\s/g, '') + ".png"} />
      </td>

      <td width="100px" style={{textAlign: 'left'}}>
        {row["Item"]}
      </td>

      {row["Moves"].map((move, id) => {
        const type = moveTypes[move]
        const color = typeColors[type]
        return (
          <td width="120px" key={id}>
            <div style={{borderRadius: '10px', backgroundColor: color, color: 'white', paddingTop: '5px', paddingBottom: '5px', marginLeft: '3px', marginRight: '3px'}}>
              {move}
            </div>
          </td>
        )
      })}

      <td width="80px">
        {row["Nature"]}
      </td>

      {row["EVs"].map((value, id) => {
        return (
          <td width="50px" key={id}>
            {value}
          </td>
        )
      })}

      <td width="180px" style={{fontSize: '10px', textAlign: 'left', verticalAlign: 'top', paddingLeft: '5px'}}>
        <button onClick={() => setIsVisible(!isVisible)} style={{fontSize: '13px', marginTop: '8.5px', marginBottom: '8.5px',  backgroundColor: 'inherit', border: 'none', fontStyle: 'italic'}}>
          <img style={{
            width: '10px',
            padding: '0px',
            transform: isVisible ? 'rotate(0)' : 'rotate(-90deg)',
            transition: 'transform 0.5s ease'
            }} src={"arrow.png"}/>
          {isVisible ? ' Hide' : ' Show'}
        </button>
        <div style={{
          height: isVisible ? 'auto' : '0px',
          opacity: isVisible ? 1 : 0,
          backgroundColor: 'inherit'
        }}>
          {isVisible && (row["Trainers"].map((trainer, id) => {
            return (
              <React.Fragment key={id}>
                {trainer}
                <br/>
              </React.Fragment>
            )
          }))}
        </div>
      </td>
    </tr>
  )
}

export default TableRow